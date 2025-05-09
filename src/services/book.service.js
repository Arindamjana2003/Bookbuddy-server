
import { Books } from "../model/book.model.js";
import { Users } from "../model/user.model.js";
import { fileDestroy, fileUploader } from "../utils/fileUpload.js";
import { v2 as cloudinary } from "cloudinary";

class BookService {
  async create(body, file ,  user) {
    console.log(body , user , "body , user , file");
    
    const { id } = user;
    let pdfData = {};
    if (file.pdf) {
      pdfData = await fileUploader(file.path);
      if (pdfData.error) {
        throw new Error("PDF not uploaded, cloudinary error");
      }
    }
    const data = await Books.create({
      name : body.name,
      author: body.author,
      description: body.description,
      user: id,
      pdf: {
        url: pdfData.url || null,
        public_id: pdfData.public_id || null,
      },
    });
    return data;
  }

  async update(body, params, user, file) {
    const { bookId } = params;
    let book = await Books.findById(bookId);
    if (!book) {
      throw new Error("That is not a valid Book");
    }

    let pdfData = {};
    if (file) {
      // Optionally: destroy old file from cloudinary
      if (book?.pdf?.public_id) {
        await cloudinary.uploader.destroy(book.pdf.public_id, { resource_type: "raw" });
      }
      pdfData = await fileUploader(file.path);
      if (pdfData.error) {
        throw new Error("PDF not uploaded, cloudinary error");
      }
    }

    book = await Books.findByIdAndUpdate(
      { _id: bookId },
      {
        $set: {
          title: body.title,
          author: body.author,
          description: body.description,
          pdf: file
            ? {
                url: pdfData.url,
                public_id: pdfData.public_id,
              }
            : book.pdf,
        },
      },
      { new: true }
    );
    return book;
  }

  async delete(params) {
    const { bookId } = params;
    let imageData = {};
    const book = await Books.findById(bookId);
    if (!book) {
      throw new Error("That is not a valid Book");
    }
    if (book?.image?.public_id) {
      imageData = await fileDestroy(book?.image?.public_id);
    }
    const { error } = imageData;
    if (error) {
      console.error(error);
      throw new Error("File not deleted, cloudinary error");
    }
    if (book?.pdf?.public_id) {
      await cloudinary.uploader.destroy(book.pdf.public_id, { resource_type: "raw" });
    }
    await Books.findByIdAndDelete(bookId);
    return book;
  }

  async fetch() {
    const data = await Books.find();
    if (!data.length) {
      throw new Error("Books is empty");
    }
    return data;
  }

  async ratting(body, params, user) {
    const { bookId } = params;
    const { rating } = body;
    const { id } = user;
    const book = await Books.findById(bookId);
    if (!book) {
      throw new Error("That is not a valid Book");      
    }
    const ratting = await Books.findByIdAndUpdate(bookId, {
      $push: {
        ratings: {
          user: id,
          rating: rating,
        },
      },
    } , { new: true });
    const totalRatings = await Books.findById(bookId);
    const totalRating = totalRatings.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / totalRatings.ratings.length;
    await Books.findByIdAndUpdate(bookId, {
      $set: {
        totalRatings: totalRating,
        averageRating: averageRating,
      },
    });
    return ratting;
  }

  async like(params, user) {
    const { bookId } = params;
    const { id } = user;
    const like = await Books.findByIdAndUpdate(bookId, {
      $push: {
        likes: id,
      },
    });
    return like;
  }

}

export default new BookService();

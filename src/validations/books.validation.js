import { z } from "zod";

class BookValidations {
  create = z.object({
    body: z.object({
      name: z.string().trim().min(3, "Title is required"),
      author: z.string().trim().min(3, "Author is required"),
      description: z.string().trim().optional(),
      publishedDate: z.string().trim().optional(),
     
    }).strict(),
    file: z.object({
      fieldname: z.string(),
      originalname: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      destination: z.string(),
      filename: z.string(),
      path : z.string(),
      size: z.number().min(1, "File size must be greater than 0"),
  }),
  });

  update = z.object({
    body: z.object({
      title: z.string().trim().min(3, "Title is required").optional(),
      author: z.string().trim().min(3, "Author is required").optional(),
      description: z.string().trim().optional(),
      // The PDF will be uploaded as a file, not in the body, so no need to validate here
    }).strict(),
    params: z.object({
      bookId: z.string().trim(),
    }),
  });

  delete = z.object({
    params: z.object({
      bookId: z.string().trim(),
    }),
  });


  ratting = z.object({
    body: z.object({
      rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot be more than 5"),
    }),
    params: z.object({
      bookId: z.string().trim(),
    }),
  });

  like = z.object({
    params: z.object({
      bookId: z.string().trim(),
    }),
  });

}

export default new BookValidations(); 
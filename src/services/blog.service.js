import { Blogs } from "../model/blogs.model.js";
import { fileDestroy, fileUploader } from "../utils/fileUpload.js";

class BlogServices {
    async create(body, user) {
        const { _id } = user;
        console.log(body);

        let imageData = {};
        if (body.image) {
            imageData = await fileUploader(body?.image);
        }
        const { url, error, public_id } = imageData;
        if (error) {
            console.error(error);
            throw new Error("File not uploaded , cloudinary error");
        }
        const data = await Blogs.create({
            title: body.title,
            description: body.description,
            user: _id,
            image: {
                url: url || null,
                public_id: public_id || null,
            },
        });
        return data;
    }

    async update(body, params, user) {
        const { _id } = user;
        const { blogId } = params;
        let imageData = {};
        let blog = await Blogs.findById(blogId);
        if (!blog) {
            throw new Error("that is not a Valid Blog");
        }
        if (blog?.image?.public_id) {
            imageData = await fileDestroy(blog?.image?.public_id);
        }
        const { success } = imageData;
        if (success) {
            throw new Error("File not deleted , cloudinary error");
        }

        if (body.image) {
            imageData = await fileUploader(body?.image);
        }
        const { url, error, public_id } = imageData;
        if (error) {
            console.error(error);
            throw new Error("File not uploaded , cloudinary error");
        }

        if (body.image) {
            blog = await Blogs.findByIdAndUpdate(
                { _id: blogId },
                {
                    $set: {
                        title: body.title,
                        description: body.description,
                        image: {
                            url: url || null,
                            public_id: public_id || null,
                        },
                    },
                },
                { new: true }
            );
        } else {
            blog = await Blogs.findByIdAndUpdate(
                { _id: blogId },
                { $set: { title: body.title, description: body.description } },
                { new: true }
            );
        }

        return blog;
    }

    async delete(params) {
        const { blogId } = params;
        let imageData = {};
        const blog = await Blogs.findById(blogId);
        if (!blog) {
            throw new Error("that is not a Valid Blog");
        }
        if (blog?.image?.public_id) {
            imageData = await fileDestroy(blog?.image?.public_id);
        }
        const { data, error, success } = imageData;
        if (error) {
            console.error(error);
            throw new Error("File not deleted , cloudinary error");
        }
        await Blogs.findByIdAndDelete(blogId);
        return blog;
    }

    async fetch() {
        const data = await Blogs.find().populate(
            "user",
            "name email profile_pic"
        );
        if (!data.length) {
            throw new Error("Blogs is Empty");
        }
        return data;
    }

    async fetchDetails(params) {
        console.log(params);

        const data = await Blogs.findById(params).populate(
            "user",
            "name email profile_pic"
        );
        console.log(data);

        if (!data) {
            throw new Error("Blog not found");
        }

        return data;
    }
}

export default new BlogServices();

import { Schema, model } from "mongoose";

const blogSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: [true, "Title must be required!"],
            trim: true,
            minLength: [3, "Title must be 3 characters or more"],
            maxLength: [60, "Title must be under 60 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxLength: [500, "Description must be under 500 characters"],
        },
        image: {
            url: {
                type: String,
                // default: 'https://res.cloudinary.com/dab0ekhmy/image/upload/v1728130610/thik-ai/gvjpvq3xljmnw2vwdkag.avif',
                default: null,
            },
            public_id: {
                type: String,
                default: null,
            },
        },
    },
    { timestamps: true }
);

export const Blogs = model("blog", blogSchema);

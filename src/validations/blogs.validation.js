import { z } from "zod";

class BlogValidations {
    create = z.object({
        body: z
            .object({
                title: z.string().trim().min(3, "Title is required"),
                description: z.string().trim().optional(),
            })
            .strict(),
    });

    update = z.object({
        body: z
            .object({
                title: z.string().trim().min(3, "Title is required"),
                description: z.string().trim().optional(),
                image: z.string().trim().optional(),
            })
            .strict(),
        params: z.object({
            blogId: z.string().trim(),
        }),
    });

    delete = z.object({
        params: z.object({
            blogId: z.string().trim(),
        }),
    });
}

export default new BlogValidations();

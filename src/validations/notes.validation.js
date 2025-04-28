import { z } from "zod";

class NoteValidations {
    create = z.object({
        body: z
            .object({
                // user: z.string().trim(),
                title: z.string().trim().min(3).max(100, "Title is required"),
                message: z.string().trim().optional(),
                date: z.string().optional(),
            })
            .strict(),
    });

    update = z.object({
        body: z
            .object({
                user: z.string().trim(),
                title: z.string().trim().min(3).max(100, "Title is required"),
                message: z.string().trim().optional(),
                date: z.string().optional(),
            })
            .strict(),
        params: z.object({
            noteId: z.string().trim(),
        }),
    });

    delete = z.object({
        params: z.object({
            noteId: z.string().trim(),
        }),
    });

    fetch = z.object({
        params: z.object({
            noteId: z.string().trim(),
        }),
    });
}

export default new NoteValidations();

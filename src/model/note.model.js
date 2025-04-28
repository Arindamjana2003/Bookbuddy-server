import { model, Schema } from "mongoose";

const noteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: [true, "Title must be required !"],
            trim: true,
            minLength: [3, "title must be 3 char or more "],
            maxLangth: [60, "title must be under 60 char"],
        },
        message: {
            type: String,
            requried: [true, "Title must be required"],
            maxLength: [1000, "title must be under 500 char"],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        mood: {
            type: String,
            enum: [
                "happy",
                "sad",
                "angry",
                "productive",
                "content",
                "focused",
                "reflective",
                "peaceful",
            ],
            default: "content",
        },
        tags: {
            type: [
                {
                    type: String,
                    enum: [
                        "work",
                        "personal",
                        "health",
                        "family",
                        "friends",
                        "exercise",
                        "food",
                        "travel",
                    ],
                },
            ],
            default: ["personal"],
        },
    },
    { timestamps: true }
);

export const Notes = model("note", noteSchema);

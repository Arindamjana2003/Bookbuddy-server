import { Notes } from "../model/note.model.js";

class NoteServices {
    async createNotes(body, user) {
        const { id } = user;
        const data = await Notes.create({
            user: id,
            title: body.title,
            message: body.message,
            date: body.date,
            tags: body.tag,
            mood: body.mood,
        });
        return data;
    }

    async update(body, params, user) {
        const { id } = user;
        const { noteId } = params;
        let note = await Notes.findById(noteId);
        if (!note) {
            throw new Error("That is not a valid note");
        }
        note = await Notes.findByIdAndUpdate(
            { _id: noteId },
            { $set: { title: body.title, message: body.message } },
            { new: true }
        );
        return note;
    }

    async delete(params) {
        const { noteId } = params;
        const note = await Notes.findById(noteId);
        if (!note) {
            throw new Error("That is not a valid category");
        }

        await Notes.findByIdAndDelete(noteId);
        return note;
    }

    async fetch() {
        const data = await Notes.find();
        if (!data.length) {
            throw new Error("Notes is Empty");
        }
        return data;
    }

    async fetchById(params) {
        const { noteId } = params;
        const data = await Notes.findById(noteId);
        if (!data) {
            throw new Error("That is not a valid note");
        }
        return data;
    }
}

export default new NoteServices();

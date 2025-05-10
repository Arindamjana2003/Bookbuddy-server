import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        Unique: true,
        maxLength: [60, "name should be in 60 latter"],
        minLength: [2, "name must be 3 latter or more"],
        required: [true, "name is reqired!"],
        enum: [
            "Literature",
            "Science",
            "Technology",
            "Mathematics",
            "History",
            "Art & Design",
            "Biographies",
            "Fantasy",
            "Horror",
            "Mystery",
            "Romance",
            "Self Help",
            "Comics & Graphic Novels",
            "Children's Books",
            "Educational",
            "Philosophy",
            "Religion",
            "Travel",
            "Health & Fitness",
            "Cooking",
            "Poetry",
            "Business & Finance",
            "Law",
            "Politics",
            "Environment",
        ],
        trim: true,
    },

    // name: {
    //     type: String,
    //     Unique:true,
    //     maxLength: [60, 'name should be in 60 latter'],
    //     minLength : [ 3 , "name must be 3 latter or more"] ,
    //     required: [true, 'name is reqired!'],
    //     trim: true
    // },
    // description: {
    //     type: String,
    //     trim: true,
    //     maxLength: [500, "title must be under 500 char"]
    // },
    // user: {
    //     type: Schema.Types.ObjectId ,
    //     ref: 'user',
    //     required: true
    // }
});
export const Categories = model("category", categorySchema);

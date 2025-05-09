import { model, Schema } from "mongoose";


const ratting = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type: Number ,
        required : true,
        default: 0
    }
}, { timestamps: true })


const bookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Book Name must be required !'],
        maxLength: [60, "Book Name must be under 60 char"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "title must be under 500 char"]
    },
    author: {
        type: String,
        required: [true, 'Auther Name must be required !'],
        maxLength: [100, "Auther Name must be under 100 char"],
        trim: true,
    },
    publishedDate: {
        type: Date,
        // required: [true, 'Publice Date must be required !'],
        default: null
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    averageRating: {
        type: Number,
        required : false,
        default: 0
    },
    ratings: [
        {  type: ratting , required : false }
    ],
    totalRatings: {
        type: Number,
        required: false,
        default: 0
    },
    pdf: {
        url: {
            type: String,
            required: false
        },
        public_id: {    
            type: String,
            required: false
        }
    }



}, { timestamps: true })


export const Books = model("book", bookSchema)
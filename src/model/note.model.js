import { Schema } from "mongoose";



const noteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type : String ,
        required : [ true , "Title must be required !"] ,
        trim : true ,
        minLength : [3 , "title must be 3 char or more "] , 
        maxLangth : [60 , "title must be under 60 char"]
    },
    message: {
        type : String,
        requried : [ true, "Title must be required"],
        maxLength: [100, "title must be under 500 char"]
    },
    date: {
        type : Date,
        default : Date.now
    },



},  { timestamps : true } )


export const Notes = model("note", noteSchema)
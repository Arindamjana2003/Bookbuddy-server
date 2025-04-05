import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: true
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'blog',
    required: true
  },
  reviewType: {
    type: String,
    enum: ['book', 'blog'],
    required: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxLength: [500, 'Message must be under 500 characters'],
    trim: true
  }
}, { timestamps: true });

export const Review = model("review", reviewSchema);

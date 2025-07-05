import mongoose, { model,  Schema, Types } from "mongoose";
import { IBook, IBookStaticMethod } from "../interfaces/book.interface";
import { Model } from "mongoose";

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    enum: ["FICTION", "NON_FICTION" , "SCIENCE" , "HISTORY" , "BIOGRAPHY" , "FANTASY"]
  },
    isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: { type: String },
  copies: {
    type: Number,
    min: [0, "Copies must not be less than one"],
    required: true,
  },
  available: {
    type: Boolean,
    default: true
  },

},{timestamps: true, versionKey: false})

// static method applied here
bookSchema.statics.updateQuantity = async function (bookId: Types.ObjectId, quantity: number) {
  const book = await this.findById(bookId);
  
   if (!book) throw new Error("Book not found");

  if(book.copies < quantity) throw new Error("Not enough copies")
  
    book.copies = book.copies - quantity;

    if(book.copies === 0){
      book.available = false
    }
    
    await book.save()
}

export const Book = model<IBook, Model<IBook> & IBookStaticMethod>("Book", bookSchema);
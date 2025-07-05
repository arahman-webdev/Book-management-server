import { Types } from "mongoose";

export interface IBook {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description?: string,
    copies: number,
    available?: boolean
}


export interface IBookStaticMethod {
  updateQuantity(bookId:Types.ObjectId, quantity: number): Promise<void>;
}






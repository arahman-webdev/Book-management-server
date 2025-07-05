import express, { Request, Response } from "express"
import { Book } from "../models/book.model"

export const router = express()


router.post('/api/book', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save()
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: savedBook
        })
    } catch (error: any) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error
        })
    }


})

router.get('/api/books', async (req, res) => {

    const getBook = await Book.find({})

    res.status(200).json({
        success: true,
        data: getBook
    })
})


router.get('/api/books/:bookId', async (req: Request, res: Response) => {
    try {
        const book = req.params.bookId;

        const getSingleBook = await Book.findById(book)


        res.send(getSingleBook)

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully"
        })
    } catch (error) {
        console.log(error)
    }
})

router.put('/api/books/:bookId', async (req, res) => {

    try {
        const filter = req.params.bookId;
        const updateData = req.body;

        const updatedBook = await Book.findByIdAndUpdate(filter,updateData, {
            new: true,
            runValidators: true,
        }
        )

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }

})


// remove a book
router.delete('/api/books/:bookId', async (req: Request, res: Response) => {

    try {
        const bookId = req.params.bookId;

        const deleteBook = await Book.findByIdAndDelete(bookId)

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deleteBook
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            message: "Failed to delete a book",
        })

    }

})


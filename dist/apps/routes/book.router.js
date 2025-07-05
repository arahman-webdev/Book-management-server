"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.router = (0, express_1.default)();
exports.router.post('/api/book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = new book_model_1.Book(req.body);
        const savedBook = yield newBook.save();
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: savedBook
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
}));
exports.router.get('/api/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getBook = yield book_model_1.Book.find({});
    res.status(200).json({
        success: true,
        data: getBook
    });
}));
exports.router.get('/api/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.params.bookId;
        const getSingleBook = yield book_model_1.Book.findById(book);
        res.send(getSingleBook);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully"
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.router.put('/api/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.params.bookId;
        const updateData = req.body;
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(filter, updateData, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
}));
// remove a book
exports.router.delete('/api/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deleteBook = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deleteBook
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "Failed to delete a book",
        });
    }
}));

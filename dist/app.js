"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_router_1 = require("./apps/routes/book.router");
const borrow_router_1 = require("./apps/routes/borrow.router");
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors({ origin: ['http://localhost:5173', 'https://abookshelfs.netlify.app'] }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("Hi book borrower");
});
app.use('/', book_router_1.router);
app.use('/', borrow_router_1.borrowRouter);
exports.default = app;

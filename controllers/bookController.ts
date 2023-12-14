import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/bookModel'; // Assuming IBook is defined in this file

// Add a new book
export const add_a_book = async (req: Request, res: Response) => {
    try {
        const new_book = new Book(req.body);
        const savedBook = await new_book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Get all books
export const get_all_books = async (req: Request, res: Response) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Delete a book by ID
export const delete_a_book = async (req: Request, res: Response) => {
    try {
        await Book.deleteOne({ _id: req.params.id });
        res.status(200).send({ message: 'Book successfully deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Find a book by ID
export const find_a_book = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update a book by ID
export const update_a_book = async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (book) {
            res.json(book);
        } else {
            res.status(404).send({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

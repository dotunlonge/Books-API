import express, { Express, Request, Response, Router } from 'express';
import * as bookController from '../controllers/bookController'; // Adjust this import based on your actual file structure

export default (app: Express) => {
    const router: Router = express.Router();

    // Routes for '/books'
    router.route('/books')
        .get(bookController.get_all_books) // Get all books
        .post(bookController.add_a_book);  // Add a new book

    // Routes for '/books/:id'
    router.route('/books/:id')
        .get(bookController.find_a_book)    // Find a book by ID
        .put(bookController.update_a_book)  // Update a book by ID
        .delete(bookController.delete_a_book); // Delete a book by ID

    // Use the router in the app
    app.use(router);

    // Default 404 handler
    app.use((req: Request, res: Response) => {
        res.status(404).send({ error: 'Not Found' });
    });
};

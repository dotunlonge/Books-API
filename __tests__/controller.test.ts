import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server';
import Book from '../models/bookModel';

// After all tests are done, disconnect from mongoose
afterAll(async () => {
  await mongoose.disconnect();
});

// Test suite for POST /books endpoint
describe('POST /books', () => {

  // Test case for creating a new book
  it('should create a new book and return it', async () => {
    // Define a new book object
    const newBook = {
      name: 'Test Book',
      author: 'Author'
    };
    // Make a POST request with the new book
    const response = await request(app).post('/books').send(newBook);
    // Expect the response status to be 201 (created)
    expect(response.status).toBe(201);
    // Expect the response body to match the new book object
    expect(response.body).toMatchObject(newBook);
  }, 20000); // Extended timeout for async operations

  // Test case for handling invalid data
  it('should return 500 for invalid data', async () => {
    // Make a POST request with invalid data (missing author)
    const response = await request(app).post('/books').send({ name: 'Invalid Book' });
    // Expect the response status to be 500 (server error)
    expect(response.status).toBe(500);
  }, 20000); // Extended timeout for async operations

});

// Test suite for GET /books endpoint
describe('GET /books', () => {

  // Before running the tests, populate the database with some books
  beforeAll(async () => {
    await Book.create([{ name: 'Book 1', author: 'Author 1' }, { name: 'Book 2', author: 'Author 2' }]);
  });

  // Test case for retrieving all books
  it('should retrieve all books', async () => {
    // Make a GET request to fetch all books
    const response = await request(app).get('/books');
    // Expect the response status to be 200 (OK)
    expect(response.status).toBe(200);
    // Expect the response body to be an array
    expect(Array.isArray(response.body)).toBeTruthy();
    // Expect at least two books in the response
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  }, 20000); // Extended timeout for async operations

});

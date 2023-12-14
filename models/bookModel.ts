import mongoose, { Document, Schema } from 'mongoose';

// Interface to represent a book document in MongoDB
export interface IBook extends Document {
    name: string;
    author: string;
}

// Mongoose schema for books
const BooksSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

// Export the model
export default mongoose.model<IBook>('Book', BooksSchema);

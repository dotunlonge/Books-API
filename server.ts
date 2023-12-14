import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectionStates } from 'mongoose';
import BookModel from './models/bookModel'; // Update based on your actual file structure
import bookRoutes from './routes/bookRoutes'; // Update based on your actual file structure

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

// Use native promises with Mongoose
mongoose.Promise = global.Promise;

const username = encodeURIComponent('oludotunlonge');
const password = encodeURIComponent('oVMkevF6DB3palTX');
const clusterUrl = 'cluster0.1rhcq3z.mongodb.net';
const dbName = 'books'; // replace with your database name
// Database connection
const dbUrl: string = process.env.DB_URL || `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;


// Middleware to check database connection
const checkDatabaseConnection = (req: Request, res: Response, next: NextFunction) => {
  // Mongoose connection states: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const isConnected = mongoose.connection.readyState === 1;
  if (!isConnected) {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Successfully connected to the database');
        next();
      })
      .catch(err => {
        console.error('Database connection error', err);
      });
      //  return res.status(503).send('Database is not connected');
  }else {
    next();
  }
};

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the checkDatabaseConnection middleware in your routes
app.use(checkDatabaseConnection);

// Routes
bookRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

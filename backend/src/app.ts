import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import NotesRoutes from './Routes/Notes';
import morgan from 'morgan';
import createHttpError, { HttpError, isHttpError } from 'http-errors'; 
import cors from 'cors';

const app = express();


// Use CORS middleware
app.use(cors());
// Using the morgan package for logging HTTP logs
app.use(morgan('dev'));

// Accept data in JSON format
app.use(express.json());

// Adding prefixes and forwarding to routes
app.use('/api/notes', NotesRoutes);

// Error-handling middleware for unknown routes
app.use((req, res, next) => {
  const error: HttpError = createHttpError(404, 'Endpoint not found...!');
  next(error);
});

// Error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  let errorMessage = 'An error occurred..!';
  let statusCode = 404; // fallback status code

  if (isHttpError(error)) {
    // If it's an HTTP error created by http-errors package, extract status and message
    statusCode = error.status;
    errorMessage = error.message;
  }

  // Handle the error and send an error response
  res.status(statusCode).json({ error: errorMessage });
});

export default app;


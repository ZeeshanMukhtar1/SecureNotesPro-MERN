import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
const app = express();
import NoteModel from './Models/Note';

// Route to get all notes
app.get('/', async (req, res, next) => {
  try {
    // Retrieve notes from the database
    const notes = await NoteModel.find().exec();
    res.send(notes);
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
     // now i will use next(error) everywhere in my code
  }
});

// Error-handling middleware for unknown routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const error = new Error('Route not found');
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  // Handle the error and send an error response
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

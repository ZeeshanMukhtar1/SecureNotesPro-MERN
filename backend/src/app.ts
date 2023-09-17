import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import NotesRoutes from './Routes/Notes';
 import morgan from 'morgan';

const app = express();

// using morgon pkg for logging the http logs
app.use(morgan("dev"));


// accept data in json format
app.use(express.json());

// adding prefixes and forwording to route
app.use("/api/notes", NotesRoutes);

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

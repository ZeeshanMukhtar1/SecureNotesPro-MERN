import { RequestHandler } from "express";
import NoteModel from '../Models/Note';
import createHttpError from "http-errors";
import mongoose from "mongoose";
  export const GetNotes : RequestHandler = async (req, res, next) => {
  try {
    // Retrieve notes from the database
    const notes = await NoteModel.find().exec();
    res.send(notes);
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
     // now i will use next(error) everywhere in my code
  }
}


export const GetNote: RequestHandler = async (req, res, next) => {
  try {
    // Declare the noteid variable 
    const noteid = req.params.noteId;

    if (!mongoose.isValidObjectId(noteid)) {
      throw createHttpError(400, 'Invalid Note Id, please write a correct object id..!');
    }
    const noteId = req.params.noteId; 

    // Retrieve the note by ID from the database
    const note = await NoteModel.findById(noteId).exec();
    

    if (!note) {
      // If the note is not found, return a 404 status
       throw createHttpError(404, "Note didnt exists in current database..!")
    }

    // Send the retrieved note as a response
    res.json(note);
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};



interface createNodeBody {
     title? : string,
     text? : string,
}

export const CreateNote: RequestHandler<unknown , unknown , createNodeBody , unknown> = async (req, res, next) => {
    //  type : unknown is opposite of type : any , 
    //  type : any is Un-safe here
  try {
    const { title, text } = req.body;

    if (!title) {
      throw createHttpError(400, 'Note must have a title..!'); 
    }

    // Create a new note
    const newNote = new NoteModel({
      title: title,
      text: text,
    });

    // Save the new note to the database
    const savedNote = await newNote.save();

    res.status(201).json(savedNote); // Respond with the created note
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};


// Route to delete a note by ID
// Request handler for deleting a note by ID
export const DeleteNote: RequestHandler = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;

    // Check if the provided note ID is a valid ObjectId
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid Note Id, please provide a correct object id.');
    }

    // Find and delete the note by ID
    const deletedNote = await NoteModel.findByIdAndRemove(noteId).exec();

    if (!deletedNote) {
      // If the note is not found, return a 404 status
      throw createHttpError(404, 'Note not found');
    }

    // Respond with a success message or the deleted note
    res.json({ message: 'Note deleted successfully', deletedNote });
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};



interface updatenoteParams{
     noteId : string,
}
// Define the request body interface
interface UpdateNoteBody {
  title: string;
  text: string;
}

// Request handler for updating a note
export const UpdateNote: RequestHandler<updatenoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
  try {
    // Extract parameters from the request
    const noteId = req.params.noteId;
    const { title, text } = req.body;

    // Check if the provided note ID is a valid ObjectId
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid Note Id, please provide a correct object id.');
    }

    // Check if either title or text is provided for update
    if (!title && !text) {
      throw createHttpError(400, 'You must provide at least one field (title or text) for update.');
    }

    // Find the note by ID
    const note = await NoteModel.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found.');
    }

    // Update the note properties if provided
    if (title) {
      note.title = title;
    }
    if (text) {
      note.text = text;
    }

    // Save the updated note
    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};
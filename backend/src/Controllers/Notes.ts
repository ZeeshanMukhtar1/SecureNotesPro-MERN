import { RequestHandler } from "express";
import NoteModel from '../Models/Note';
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
    const noteId = req.params.noteId; 

    // Retrieve the note by ID from the database
    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      // If the note is not found, return a 404 status
      return res.status(404).json({ error: 'Note not found' });
    }

    // Send the retrieved note as a response
    res.json(note);
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};





export const CreateNote: RequestHandler = async (req, res, next) => {
  try {
    const { title, text } = req.body; // Assuming you send title and content in the request body

    // Create a new note
    const newNote = new NoteModel({
      title : title,
      text : text , 
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
export const DeleteNote: RequestHandler = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;

    // Find and delete the note by ID
    const deletedNote = await NoteModel.findByIdAndRemove(noteId).exec();

    if (!deletedNote) {
      // If the note is not found, return a 404 status
      return res.status(404).json({ error: 'Note not found' });
    }

    // Respond with a success message or the deleted note
    res.json({ message: 'Note deleted successfully', deletedNote });
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};

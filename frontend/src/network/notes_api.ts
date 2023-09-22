import { Note } from '../models/note';

// Common function to make HTTP requests and handle errors
async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    // If the response is successful, return it
    return response;
  } else {
    // If the response is not successful, extract the error message from the response body
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

// Function to fetch notes from the server
export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData('/api/notes', { method: 'GET' });
  return response.json();
}

// Interface for creating a new note
export interface NoteInput {
  title: string;
  text?: string;
}

// Function to create a new note
export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

// Function to update an existing note
export async function updateNote(
  noteId: string,
  note: NoteInput,
): Promise<Note> {
  const response = await fetchData('/api/notes/' + noteId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

// Function to delete a note
export async function deleteNote(noteId: string) {
  await fetchData('/api/notes/' + noteId, { method: 'DELETE' });
}

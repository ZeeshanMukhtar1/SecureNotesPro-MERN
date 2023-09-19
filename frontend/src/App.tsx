import React, { useEffect } from 'react';
import './App.css'; // Import the CSS file
import { Note } from './Models/Note';
import { Button } from 'react-bootstrap';

function App() {
  const [notes, setNotes] = React.useState<Note[]>([]);

  useEffect(() => {
    // Define a function to fetch notes from the backend
    const LoadNotes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notes', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch notes.');
        }
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchNotes function when the component mounts
    LoadNotes();
  }, []); // The empty array [] ensures that this effect runs only once on mount

  // Log the fetched notes to the console
  useEffect(() => {
    console.log('Fetched Notes:', notes);
  }, [notes]); // This effect runs whenever the 'notes' state changes

  return (
    <>
      <div className='App'>
        <h1>Notes</h1>
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <h2>{"Note Title: " + note.title}</h2>
              <p>{"Note Text : " + note.text}</p>
              <p>Created At: {note.createdAt}</p>
              <p>Updated At: {note.updatedAt}</p>
            </li>
            
          ))}
        </ul>
           <Button variant="primary">Click me</Button>
      </div>
    </>
  );
}

export default App;

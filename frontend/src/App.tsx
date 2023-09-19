import React, { useEffect } from 'react';
import './App.css'; // Import the CSS file
// import { Note } from './Models/Note';
import Note from './components/Note';
import {Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import { Note as NoteModel } from './models/note';




function App() {
  const [notes, setNotes] = React.useState<NoteModel[]>([]);

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
   <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map(note => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
}

export default App;

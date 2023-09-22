import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from './styles/NotesPage.module.css';
import styleUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import AddNoteDialog from './components/AddEditNoteDialog';
import { BsPlusCircleDotted } from 'react-icons/bs';

function App() {
  // State for storing notes and controlling dialogs
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [NoteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [NotesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  // Function to load notes from the server
  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  // Function to delete a note
  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes((prevNotes) =>
        prevNotes.filter((existingNote) => existingNote._id !== note._id),
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const NotesGrid = (
    <Row xs={1} md={2} xl={3} className="g-4">
      {notes.map((note) => (
        <Col key={note._id}>
          {/* Render each note component */}
          <Note
            note={note}
            className={styles.note}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={deleteNote}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container>
      {/* Button to open the "Add new note" dialog */}
      <Button
        className={`mb-4 mt-4 ${styleUtils.blockCenter} ${styleUtils.flex__Center} `}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <BsPlusCircleDotted />
        Add new note
      </Button>

      {/* Displaying notes in a responsive grid */}
      {NotesLoading ? (
        <p>Loading...</p>
      ) : showNotesLoadingError ? (
        <p>Error loading notes. Please try again.</p>
      ) : (
        NotesGrid
      )}

      {/* Dialog for adding a new note */}
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote: NoteModel) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}

      {/* Dialog for editing an existing note */}
      {NoteToEdit && (
        <AddNoteDialog
          NoteToEdit={NoteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote: NoteModel) => {
            setNotes((prevNotes) =>
              prevNotes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote,
              ),
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;

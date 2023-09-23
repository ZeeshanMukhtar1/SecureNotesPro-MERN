import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from './styles/NotesPage.module.css';
import styleUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import AddNoteDialog from './components/AddEditNoteDialog';
import { BsPlusCircleDotted } from 'react-icons/bs';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { CSSProperties } from 'react';
import NotFoundPage from './Db-err/NotFoound';

// Import Notification components from react-notifications
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function App() {
  // State for storing notes and controlling dialogs
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [NoteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  // Function to load notes from the server
  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setLoading(true); // Start loading
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setLoading(false); // Finish loading
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
      // Show a success notification on successful deletion
      NotificationManager.success('Note deleted successfully');
    } catch (error) {
      console.error(error);
      // Show an error notification on deletion error
      NotificationManager.error('Error deleting note');
    }
  };

  // Custom CSS properties for PacmanLoader
  const override: CSSProperties = {
    // display: 'block',
    // margin: '0 auto',
    // borderColor: 'red',
  };

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

      {/* Display notes or a message if no notes are available */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          marginTop: '-50px',
        }}
      >
        {loading ? (
          <PacmanLoader
            color="#36d7b7"
            loading={loading}
            size={45}
            margin={2}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={1.5}
          />
        ) : showNotesLoadingError ? (
          <p>Error loading notes. Please try again.</p>
        ) : notes.length === 0 ? (
          <NotFoundPage />
        ) : (
          // Display notes in a responsive grid
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
        )}
      </div>

      {/* Dialog for adding a new note */}
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote: NoteModel) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
            // Show a success notification on successful addition
            NotificationManager.success('Note added successfully');
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
            // Show a success notification on successful edit
            NotificationManager.success('Note updated successfully');
          }}
        />
      )}

      {/* Notification container for displaying notifications */}
      <NotificationContainer />
    </Container>
  );
}

export default App;

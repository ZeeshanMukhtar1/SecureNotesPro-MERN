// Import necessary styles and components
import styles from '../styles/Note.module.css';
import stylesUtils from '../styles/utils.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';
import { BsFillTrash2Fill } from 'react-icons/bs';

// Define the props for the Note component
interface NoteProps {
  note: NoteModel;
  className?: string;
  onDeleteNoteClicked: (note: NoteModel) => void;
}

// Note component definition
const Note = ({ note, className, onDeleteNoteClicked }: NoteProps) => {
  // Destructure properties from the note object
  const { title, text, createdAt, updatedAt } = note;

  // Determine whether the note is updated or created and format the date text accordingly
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt);
  }

  return (
    // Render the Note component using Card from react-bootstrap
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        {/* Display the title */}
        <Card.Title className={stylesUtils.flex__Center}>
          {title}
          {/* Render the delete icon (Trash) */}
          <BsFillTrash2Fill
            className="ms-auto"
            onClick={(e) => {
              // Handle the onDeleteNoteClicked event when the delete icon is clicked
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        {/* Display the text of the note */}
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      {/* Display the created/updated date */}
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

// Export the Note component as the default export
export default Note;

import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Note } from '../models/note';
import { NoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';

interface AddEditNoteDialogProps {
  NoteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddEditNoteDialog = ({
  onDismiss,
  onNoteSaved,
  NoteToEdit,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: NoteToEdit?.title || '',
      text: NoteToEdit?.text || '',
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (NoteToEdit) {
        noteResponse = await NotesApi.updateNote(NoteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{NoteToEdit ? 'Edit Note' : 'Add Note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register('title', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              {...register('text')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;

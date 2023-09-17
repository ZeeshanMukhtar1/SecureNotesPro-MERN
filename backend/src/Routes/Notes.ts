import Express  from "express";
import * as NotesController from "../Controllers/Notes";

 const  router =  Express.Router();


router.get('/', NotesController.GetNotes);
router.get('/:noteId', NotesController.GetNote);
router.post('/', NotesController.CreateNote);
router.delete('/:noteId', NotesController.DeleteNote);


 export default router;


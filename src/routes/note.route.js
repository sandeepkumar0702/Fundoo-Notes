import express from 'express';
import * as noteController from '../controllers/note.controller';
// import {newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a note
router.post('/',userAuth,noteController.createNote);

//route to get all note
router.get('/',userAuth,noteController.getNotes);

//route to get notes of sa user
router.get('/:id',userAuth,noteController.getNoteById);

// //route to update a note
router.put('/:id',userAuth,noteController.updateNoteById);


// //route to delete note
router.delete('/:id',userAuth,noteController.deleteNote);


export default router;

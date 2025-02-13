import HttpStatus from 'http-status-codes';
import *as NoteService from '../services/note.service';
const bcrypt = require('bcrypt');

//create note
export const createNote = async (req, res, next) => {
  try {
    const response = await NoteService.createNote(req);
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};

//get alll notes
export const getNotes = async (req, res, next) => {
  try {
    const response = await NoteService.getNotes(req);
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};

//get note by id
export const getNoteById = async (req, res, next) => {
  try {
    const response = await NoteService.getNoteById(req);
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};

  // Update a note by ID
export const updateNoteById = async (req, res, next) => {
    try {
      const response = await NoteService.updateNoteById(req);
      res.status(response.status).json(response.data);
    } catch (error) {
      next(error);
    }
};

//dleete 
export const deleteNote = async (req, res, next) => {
  try {
    const response = await NoteService.deleteNote(req);
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};

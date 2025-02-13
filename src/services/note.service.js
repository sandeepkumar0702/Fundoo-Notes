import Note from '../models/note.model';
const bcrypt = require('bcrypt');

//create note
export const createNote = async (req)=>{
    // Validate if the request body contains title and description
    if (!req.body.title || !req.body.description) {
      return {
        status: 400,
        data: { code: 400, message: 'Title and description are required' },
      };
    }
    const { title, description } = req.body;
    if (!req.user || !req.user.userId) {
      return {
        status: 401,
        data: { message: 'Unauthorized: No user ID found' },
      };
    }
    const body = { title, description, userId: req.user.userId };
    const newNote = await Note.create(body);
    return {
      status: 201,
      data: { message: 'Note created', data: newNote },
    };
}

// get all notes
export const getNotes= async(req)=>{
    try {
      if (!req.user || !req.user.userId) {
        return {
          status: 401,
          data: { message: 'Unauthorized: No user ID found' },
        };
      }

      const notes = await Note.find({ userId: req.user.userId, trash: false });
      return {
        status: 200,
        data: {
          code: 200,
          data: notes,
          message: 'Notes fetched successfully',
        },
      };
    } 
    catch (error) {
      return {
        status: 500,
        data: { message: 'Internal Server Error', error: error.message },
      };
    }
  }

  //get note by id
export const getNoteById= async(req)=>{
    try {
      if (!req.user || !req.user.userId) {
        return {
          status: 401,
          data: { message: 'Unauthorized: No user ID found' },
        };
      }
      const note = await Note.findOne({ _id: req.params.id, userId: req.user.userId });
      if (!note) {
        return {
          status: 404,
          data: { message: 'Note not found' },
        };
      }
      return {
        status: 200,
        data: {
          code: 200,
          data: note,
          message: 'Note fetched successfully',
        },
      };
    } 
    catch (error) {
      return {
        status: 500,
        data: { message: 'Internal Server Error', error: error.message },
      };
    }
}
  
// Update note by ID
export const updateNoteById = async (req)=>{
    try {
      if (!req.user || !req.user.userId) {
        return {
          status: 401,
          data: { message: 'Unauthorized: No user ID found' },
        };
      }

      const updatedNote = await Note.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        req.body,
        { new: true } // Returns the updated document
      );

      if (!updatedNote) {
        return {
          status: 404,
          data: { message: 'Note not found or unauthorized' },
        };
      }

      return {
        status: 200,
        data: {
          code: 200,
          data: updatedNote,
          message: 'Note updated successfully!',
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: { message: 'Internal Server Error', error: error.message },
      };
    }
}


// delete
export const deleteNote = async(req)=>{
    try {
      if (!req.user || !req.user.userId) {
        return {
          status: 401,
          data: { message: 'Unauthorized: No user ID found' },
        };
      }

      const note = await Note.findOne({ _id: req.params.id, userId: req.user.userId });

      if (!note) {
        return {
          status: 404,
          data: { message: 'Note not found' },
        };
      }

      // Toggle trash status (soft delete or restore)
      note.trash = !note.trash;
      await note.save();

      return {
        status: 200,
        data: {
          code: 200,
          data: note,
          message: note.trash ? 'Note moved to trash' : 'Note restored',
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: { message: 'Internal Server Error', error: error.message },
      };
    }
}




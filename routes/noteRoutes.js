const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')

router.route('/')
    .get(notesController.getAllNotes)  //GET
    .post(notesController.createNewNote) //CREATE 
    // .patch(notesController.updateUser) // UPDATE 
    .delete(notesController.deleteNote) // DELETE 

module.exports = router
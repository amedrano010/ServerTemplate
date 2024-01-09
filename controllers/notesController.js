const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { json } = require('express')


// @desc get all notes
// @route GET/notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {

    let notes = await Note.find()

    if (notes.length == 0) {

        return res.status(400).json({ message: 'No Data' })

    }

    res.json(notes)
})

// @desc creat a notes
// @route PATCH/notes
// @access Private

const createNewNote = asyncHandler(async (req, res) => {

    let { user, title, text } = req.body

    //Check if user exist
    let foundUser = await User.findById(user).exec()

    if (!foundUser) {
        return res.status(400).json({ message: 'User not found' })
    }

    let noteObj = { user, title, text }

    let newNote = await Note.create(noteObj)

    if (newNote) {
        return res.json({ message: 'Note added' })
    }

    return res.status(400).json({ message: 'Error. Please try again.' })


})

// @desc update a note
// @route POST/notes
// @access Private



// @desc Delete a note
// @route DELETE/notes
// @access Private

const deleteNote = asyncHandler(async (req, res) => {

    let { id } = req.body

    const note = await Note.findOne({ _id: id }).exec()

    if (note) {
        const result = await Note.deleteOne({ _id: id })
        return res.json({ message: `Note ${id} deleted` })
    }

    return res.status(400).json({ message: 'Could not delete note' })

})

module.exports = {

    getAllNotes,
    createNewNote,
    deleteNote

}
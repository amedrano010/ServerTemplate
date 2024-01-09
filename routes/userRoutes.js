const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)  //GET
    .post(usersController.createNewUser) //CREATE 
    .patch(usersController.updateUser) // UPDATE 
    .delete(usersController.deleteUser) // DELETE 

module.exports = router
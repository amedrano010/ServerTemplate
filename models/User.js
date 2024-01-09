const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    roles: [ //Roles is an array
        {
            type: String,
            default: "Employee"
        }
    ],
    active: {
        type: Boolean,
        default: true
    }

})

const userModel = mongoose.model('User', userSchema) //Create model using user schema

module.exports = userModel
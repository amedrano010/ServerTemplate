const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {

    let filePath = path.join(__dirname, '..', 'views', 'index.html') //html file to display from views folder

    res.sendFile(filePath)

})

module.exports = router
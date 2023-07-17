
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
 const verifyJWT = require('../middleware/verifyJwt')



router.post('/notes',verifyJWT , notesController.createNewNote) 
router.get('/notes' ,verifyJWT,notesController.getAllNotes)
router.patch('/notes' ,verifyJWT ,notesController.updateNote) 
router.delete('/notes'  ,verifyJWT, notesController.deleteNote)
module.exports = router;


    


////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router 

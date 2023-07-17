
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
 const verifyJWT = require('../middleware/verifyJwt')

 router.use(verifyJWT)


router.post('/users' , usersController.createNewUser) 
router.get('/users' ,usersController.getAllUsers)
router.patch('/users' ,usersController.updateUser) 
router.delete('/users' , usersController.deleteUser)
module.exports = router;


    


////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router 

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers ,updateUser,deleteUser} = require('../controllers/authController'); // Adjust path accordingly
const authenticate=require('../middleware/authMiddleWare')
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.put('/user/:id', updateUser);
router.delete('/users/:id', authenticate,deleteUser);


module.exports = router;

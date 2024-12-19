const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

router.post('/profile', createProfile);   
router.get('/profile/:user_id', getProfile);   
router.put('/profile/:user_id', updateProfile);  
router.delete('/profile/:user_id', deleteProfile); 

module.exports = router;

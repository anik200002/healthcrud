const express = require('express');
const router = express.Router();


const {
  createLifeStyleInfo,
  getLifeStyleInfo,
  updateLifeStyleInfo,
  deleteLifeStyleInfo,
} = require('../controllers/lifeStyleInfoController');


router.post('/lifestyle-info', createLifeStyleInfo); 
router.get('/lifestyle-info/:user_id', getLifeStyleInfo); 
router.put('/lifestyle-info/:user_id', updateLifeStyleInfo);
router.delete('/lifestyle-info/:user_id', deleteLifeStyleInfo); 

module.exports = router;

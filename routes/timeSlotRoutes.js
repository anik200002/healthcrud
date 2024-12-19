const express = require('express');
const router = express.Router();

const {createTimeSlot,getTimeSlots,updateTimeSlot,deleteTimeSlot}=require('../controllers/timeSlotController')

router.post('/create', createTimeSlot);
router.get('/:doctor_id', getTimeSlots);
router.put('/:id', updateTimeSlot);
router.delete('/:id', deleteTimeSlot);

module.exports = router;
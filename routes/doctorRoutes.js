const express = require('express');
const router = express.Router();
const { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

router.post('/doctors', createDoctor);

router.get('/doctors', getAllDoctors);

router.get('/doctors/:id', getDoctorById);

router.put('/doctors/:id', updateDoctor);

router.delete('/doctors/:id', deleteDoctor);

module.exports = router;

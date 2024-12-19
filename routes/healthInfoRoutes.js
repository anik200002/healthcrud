const express = require('express');
const router = express.Router();

const { createHealthInfo, getHealthInfo, updateHealthInfo, deleteHealthInfo } = require('../controllers/healthInfoController');

router.post('/health-info', createHealthInfo);
router.get('/health-info/:user_id', getHealthInfo);
router.put('/health-info/:user_id', updateHealthInfo);
router.delete('/health-info/:user_id', deleteHealthInfo);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
  createInsurancePolicy,
  getInsurancePolicy,
  updateInsurancePolicy,
  deleteInsurancePolicy,
} = require('../controllers/insurancePolicyController');

router.post('/insurance-policy', createInsurancePolicy); 
router.get('/insurance-policy/:user_id', getInsurancePolicy); 
router.put('/insurance-policy/:user_id', updateInsurancePolicy); 
router.delete('/insurance-policy/:user_id', deleteInsurancePolicy);

module.exports = router;

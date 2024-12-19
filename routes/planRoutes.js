const express = require('express');
const { createPlan, getPlansByBranch, getPlanById, updatePlan, deletePlan } = require('../controllers/planController'); // Adjust the path as needed
const router = express.Router();

router.post('/plans', createPlan);

router.get('/plans/branch/:branch_id', getPlansByBranch);

router.get('/plans/:plan_id', getPlanById);

router.put('/plans/:plan_id', updatePlan);

router.delete('/plans/:plan_id', deletePlan);

module.exports = router;

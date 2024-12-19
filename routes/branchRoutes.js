const express = require('express');
const router = express.Router();
const {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require('../controllers/branchController');

// Branch Routes
router.post('/branches', createBranch); 
router.get('/branches', getAllBranches); 
router.get('/branches/:id', getBranchById); 
router.put('/branches/:id', updateBranch); 
router.delete('/branches/:id', deleteBranch); 

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createFamilyMember,
  getFamilyMembers,
  updateFamilyMember,
  deleteFamilyMember,
} = require('../controllers/familyController'); 


router.post('/family', createFamilyMember);

router.get('/family/:user_id', getFamilyMembers);

router.put('/family/:id', updateFamilyMember);

router.delete('/family/:id', deleteFamilyMember);

module.exports = router;

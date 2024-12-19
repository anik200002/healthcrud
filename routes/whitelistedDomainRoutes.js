const express = require('express');
const router = express.Router();
const {
  createWhitelistedDomain,
  getAllWhitelistedDomains,
  getWhitelistedDomainById,
  updateWhitelistedDomain,
  deleteWhitelistedDomain,
} = require('../controllers/whiteListedDomainController');


router.post('/whitelisted-domains', createWhitelistedDomain); 
router.get('/whitelisted-domains', getAllWhitelistedDomains); 
router.get('/whitelisted-domains/:id', getWhitelistedDomainById); 
router.put('/whitelisted-domains/:id', updateWhitelistedDomain); 
router.delete('/whitelisted-domains/:id', deleteWhitelistedDomain); 

module.exports = router;

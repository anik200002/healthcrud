const express = require('express');
const {
  createAddress,
  getAddressesByUser,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require('../controllers/adressController'); 

const router = express.Router();

router.post('/address', createAddress);

router.get('/addresses/:user_id', getAddressesByUser);

router.get('/address/:id', getAddressById);

router.put('/address/:id', updateAddress);

router.delete('/address/:id', deleteAddress);

module.exports = router;

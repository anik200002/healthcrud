const Address = require('../models/adress');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const express = require('express');
// const mongoose=require('mongoose')
const createAddress = async (req, res) => {
    try {
      const { user_id, flat, area, landmark, pincode, city, state, country, address_type, emergency_contact, relationship, emergency_number } = req.body;
      const newAddress = new Address({
        user_id,
        flat,
        area,
        landmark,
        pincode,
        city,
        state,
        country,
        address_type,
        emergency_contact,
        relationship,
        emergency_number,
      });
  
      await newAddress.save();
      res.status(201).json({ message: 'Address created successfully', newAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get all addresses for a user
  const getAddressesByUser = async (req, res) => {
    try {
      const { user_id } = req.params;
      const addresses = await Address.find({ user_id });
  
      if (addresses.length === 0) {
        return res.status(404).json({ message: 'No addresses found for this user' });
      }
  
      res.status(200).json(addresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get a single address by ID
  const getAddressById = async (req, res) => {
    try {
      const { id } = req.params;
      const address = await Address.findById(id);
  
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
  
      res.status(200).json(address);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Update an address by ID
  const updateAddress = async (req, res) => {
    try {
      const { id } = req.params;
      const { flat, area, landmark, pincode, city, state, country, address_type, emergency_contact, relationship, emergency_number } = req.body;
      const updatedAddress = await Address.findByIdAndUpdate(id, {
        flat, area, landmark, pincode, city, state, country, address_type, emergency_contact, relationship, emergency_number
      }, { new: true });
  
      if (!updatedAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }
  
      res.status(200).json({ message: 'Address updated successfully', updatedAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Delete an address by ID
  const deleteAddress = async (req, res) => {
    try {
      const { id } = req.params;
      const address = await Address.findByIdAndDelete(id);
  
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
  
      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    createAddress,
    getAddressesByUser,
    getAddressById,
    updateAddress,
    deleteAddress,
  };
  
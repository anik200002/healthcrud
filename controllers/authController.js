const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
// const express = require('express');
const mongoose=require('mongoose')


const registerUser = async (req, res) => {
  try {
    const { email, phone, password, branch_id } = req.body;

    if (!email || !phone || !password || !branch_id) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

   
    const newUser = new User({
      email,
      phone,
      password,
      branch_id,
    });

    await newUser.save();

    const token = newUser.generateAuthToken();

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: 'Server error' });
  }
};





const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = user.generateAuthToken();

    return res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



//getall users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


//update

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, phone, password, branch_id } = req.body;

  
    if (!email && !phone && !password && !branch_id) {
      return res.status(400).json({ message: 'At least one field must be provided to update.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (branch_id) user.branch_id = branch_id;

    await user.save();

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

//delete user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error occurred during user deletion:', error); 
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  loginUser,registerUser,getAllUsers,updateUser,deleteUser
};

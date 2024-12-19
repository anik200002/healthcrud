const Family = require('../models/family'); // Family Model
const User = require('../models/user'); // User Model

// Create a Family Member
const createFamilyMember = async (req, res) => {
  try {
    const { user_id, name, dob, gender, phone, email, relationship } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const familyMember = new Family({
      user_id,
      name,
      dob,
      gender,
      phone,
      email,
      relationship,
    });

    // Save the family member to the database
    await familyMember.save();
    return res.status(201).json({ message: 'Family member added successfully', familyMember });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve Family Members
const getFamilyMembers = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find all family members linked to the user
    const familyMembers = await Family.find({ user_id });
    if (!familyMembers.length) {
      return res.status(404).json({ message: 'No family members found' });
    }

    return res.status(200).json({ familyMembers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a Family Member
const updateFamilyMember = async (req, res) => {
  try {
    const { id } = req.params; // Family member ID
    const { name, dob, gender, phone, email, relationship } = req.body;

    // Find the family member by ID
    const familyMember = await Family.findOne({ id });
    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    // Update fields if provided
    familyMember.name = name || familyMember.name;
    familyMember.dob = dob || familyMember.dob;
    familyMember.gender = gender || familyMember.gender;
    familyMember.phone = phone || familyMember.phone;
    familyMember.email = email || familyMember.email;
    familyMember.relationship = relationship || familyMember.relationship;

    // Save the updated family member
    await familyMember.save();
    return res.status(200).json({ message: 'Family member updated successfully', familyMember });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a Family Member
const deleteFamilyMember = async (req, res) => {
  try {
    const { id } = req.params; // Family member ID

    // Find and delete the family member
    const familyMember = await Family.findOneAndDelete({ id });
    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    return res.status(200).json({ message: 'Family member deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createFamilyMember,
  getFamilyMembers,
  updateFamilyMember,
  deleteFamilyMember,
};

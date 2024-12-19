const HealthInfo = require('../models/healthInfo');
const User = require('../models/user'); 

// Create Health Info
const createHealthInfo = async (req, res) => {
  try {
    const { weight, height, blood_type, medical_conditions, allergies, medications, past_surgeries, user_id } = req.body;

    if (!weight || !height || !user_id) {
      return res.status(400).json({ message: 'Weight, Height and User ID are required.' });
    }

    // Check if user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const healthInfo = new HealthInfo({
      weight,
      height,
      blood_type,
      medical_conditions,
      allergies,
      medications,
      past_surgeries,
      user_id,
    });

    await healthInfo.save();

    return res.status(201).json({ message: 'Health information created successfully.', healthInfo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Read Health Info for a user
const getHealthInfo = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const healthInfo = await HealthInfo.findOne({ user_id });
    if (!healthInfo) {
      return res.status(404).json({ message: 'Health information not found for this user.' });
    }

    return res.status(200).json(healthInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update Health Info for a user
const updateHealthInfo = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { weight, height, blood_type, medical_conditions, allergies, medications, past_surgeries } = req.body;

    const updatedHealthInfo = await HealthInfo.findOneAndUpdate(
      { user_id },
      {
        weight,
        height,
        blood_type,
        medical_conditions,
        allergies,
        medications,
        past_surgeries,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedHealthInfo) {
      return res.status(404).json({ message: 'Health information not found for this user.' });
    }

    return res.status(200).json({ message: 'Health information updated successfully.', updatedHealthInfo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete Health Info for a user
const deleteHealthInfo = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const healthInfo = await HealthInfo.findOneAndDelete({ user_id });
    if (!healthInfo) {
      return res.status(404).json({ message: 'Health information not found for this user.' });
    }

    return res.status(200).json({ message: 'Health information deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createHealthInfo,
  getHealthInfo,
  updateHealthInfo,
  deleteHealthInfo,
};

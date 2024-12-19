const LifeStyleInfo = require('../models/lifeStyleInfo');
const User = require('../models/user'); 

const createLifeStyleInfo = async (req, res) => {
  try {
    const { smoking_habits, alcohol_consumptions, activity_level, diet_preferences, user_id } = req.body;

    // Validate required fields
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Check if the user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const lifestyleInfo = new LifeStyleInfo({
      smoking_habits,
      alcohol_consumptions,
      activity_level,
      diet_preferences,
      user_id,
    });

    await lifestyleInfo.save();
    return res.status(201).json({ message: 'Lifestyle information created successfully.', lifestyleInfo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get LifeStyle Info for a user
const getLifeStyleInfo = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const lifestyleInfo = await LifeStyleInfo.findOne({ user_id });
    if (!lifestyleInfo) {
      return res.status(404).json({ message: 'Lifestyle information not found for this user.' });
    }

    return res.status(200).json(lifestyleInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update LifeStyle Info
const updateLifeStyleInfo = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { smoking_habits, alcohol_consumptions, activity_level, diet_preferences } = req.body;

    const updatedLifeStyleInfo = await LifeStyleInfo.findOneAndUpdate(
      { user_id },
      {
        smoking_habits,
        alcohol_consumptions,
        activity_level,
        diet_preferences,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedLifeStyleInfo) {
      return res.status(404).json({ message: 'Lifestyle information not found for this user.' });
    }

    return res.status(200).json({ message: 'Lifestyle information updated successfully.', updatedLifeStyleInfo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete LifeStyle Info
const deleteLifeStyleInfo = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const lifestyleInfo = await LifeStyleInfo.findOneAndDelete({ user_id });
    if (!lifestyleInfo) {
      return res.status(404).json({ message: 'Lifestyle information not found for this user.' });
    }

    return res.status(200).json({ message: 'Lifestyle information deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createLifeStyleInfo,
  getLifeStyleInfo,
  updateLifeStyleInfo,
  deleteLifeStyleInfo,
};

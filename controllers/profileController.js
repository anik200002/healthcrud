const Profile = require('../models/profile');
const User = require('../models/user'); 

const createProfile = async (req, res) => {
  try {
    const { user_id, first_name, last_name, email, phone, dob, gender, picture } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = new Profile({
      user_id,
      first_name,
      last_name,
      email,
      phone,
      dob,
      gender,
      picture,
    });

    // Save the profile to the database
    await profile.save();
    return res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};




const getProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Find the profile linked to the user
      const profile = await Profile.findOne({ user_id }).populate('user_id');
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      return res.status(200).json({ profile });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  


  const updateProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { first_name, last_name, email, phone, dob, gender, picture } = req.body;
  
      // Find the profile linked to the user
      const profile = await Profile.findOne({ user_id });
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Update fields if provided
      profile.first_name = first_name || profile.first_name;
      profile.last_name = last_name || profile.last_name;
      profile.email = email || profile.email;
      profile.phone = phone || profile.phone;
      profile.dob = dob || profile.dob;
      profile.gender = gender || profile.gender;
      profile.picture = picture || profile.picture;
  
      // Save the updated profile
      await profile.save();
      return res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  


  const deleteProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      const profile = await Profile.findOne({ user_id });
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Delete the profile
     
      return res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports={createProfile,getProfile,deleteProfile,updateProfile}
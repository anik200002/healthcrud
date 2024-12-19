const InsurancePolicy = require('../models/insurancePolicy');
const User = require('../models/user'); 


const createInsurancePolicy = async (req, res) => {
  try {
    const { policy_number, issuer, valid_till, user_id } = req.body;

    // Validate required fields
    if (!policy_number || !issuer || !valid_till || !user_id) {
      return res.status(400).json({ message: 'Policy number, issuer, valid till date, and user ID are required.' });
    }

    // Check if user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const insurancePolicy = new InsurancePolicy({
      policy_number,
      issuer,
      valid_till,
      user_id,
    });

    await insurancePolicy.save();
    return res.status(201).json({ message: 'Insurance policy created successfully.', insurancePolicy });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



// Get Insurance Policy for a user
const getInsurancePolicy = async (req, res) => {
    try {
      const user_id = req.params.user_id;
  
      const insurancePolicy = await InsurancePolicy.findOne({ user_id });
      if (!insurancePolicy) {
        return res.status(404).json({ message: 'No insurance policy found for this user.' });
      }
  
      return res.status(200).json(insurancePolicy);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  

  // Update Insurance Policy
const updateInsurancePolicy = async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const { policy_number, issuer, valid_till } = req.body;
  
      const updatedPolicy = await InsurancePolicy.findOneAndUpdate(
        { user_id },
        {
          policy_number,
          issuer,
          valid_till,
          updated_at: Date.now(),
        },
        { new: true }
      );
  
      if (!updatedPolicy) {
        return res.status(404).json({ message: 'Insurance policy not found for this user.' });
      }
  
      return res.status(200).json({ message: 'Insurance policy updated successfully.', updatedPolicy });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  

  // Delete Insurance Policy
const deleteInsurancePolicy = async (req, res) => {
    try {
      const user_id = req.params.user_id;
  
      const insurancePolicy = await InsurancePolicy.findOneAndDelete({ user_id });
      if (!insurancePolicy) {
        return res.status(404).json({ message: 'No insurance policy found for this user.' });
      }
  
      return res.status(200).json({ message: 'Insurance policy deleted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    createInsurancePolicy,
    getInsurancePolicy,
    updateInsurancePolicy,
    deleteInsurancePolicy,
  };

  
  
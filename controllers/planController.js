const Plan = require('../models/Plan');  
const Branch = require('../models/branch');  


const createPlan = async (req, res) => {
  try {
    const { name, features, default: isDefault, branch_id, is_active } = req.body;

   
    if (!branch_id) {
      return res.status(400).json({ message: 'Branch ID is required.' });
    }

    const branch = await Branch.findById(branch_id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found.' });
    }

    const newPlan = new Plan({
      name,
      features,
      default: isDefault,
      branch_id,
      is_active,
    });

    await newPlan.save();
    return res.status(201).json({ message: 'Plan created successfully.', newPlan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



// Get all plans for a specific branch
const getPlansByBranch = async (req, res) => {
  try {
    const branch_id = req.params.branch_id;

    const plans = await Plan.find({ branch_id });
    if (plans.length === 0) {
      return res.status(404).json({ message: 'No plans found for this branch.' });
    }

    return res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



// Get a single plan by ID
const getPlanById = async (req, res) => {
  try {
    const plan_id = req.params.plan_id;

    const plan = await Plan.findById(plan_id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found.' });
    }

    return res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Update a plan
const updatePlan = async (req, res) => {
  try {
    const plan_id = req.params.plan_id;
    const { name, features, default: isDefault, branch_id, is_active } = req.body;

    const updatedPlan = await Plan.findByIdAndUpdate(
      plan_id,
      {
        name,
        features,
        default: isDefault,
        branch_id,
        is_active,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found.' });
    }

    return res.status(200).json({ message: 'Plan updated successfully.', updatedPlan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Delete a plan
const deletePlan = async (req, res) => {
  try {
    const plan_id = req.params.plan_id;

    const deletedPlan = await Plan.findByIdAndDelete(plan_id);
    if (!deletedPlan) {
      return res.status(404).json({ message: 'Plan not found.' });
    }

    return res.status(200).json({ message: 'Plan deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createPlan,
  getPlansByBranch,
  getPlanById,
  updatePlan,
  deletePlan,
};

const Branch = require('../models/branch');  
const WhitelistedDomain = require('../models/whiteListedDomain');  

const createBranch = async (req, res) => {
  try {
    const { name, logo, domain_id } = req.body;

    if (!name || !domain_id) {
      return res.status(400).json({ message: 'Name and domain_id are required.' });
    }

    const domain = await WhitelistedDomain.findById(domain_id);
    if (!domain) {
      return res.status(404).json({ message: 'Whitelisted domain not found.' });
    }

    const newBranch = new Branch({
      name,
      logo,
      domain_id,
    });

    await newBranch.save();

    return res.status(201).json({ message: 'Branch created successfully.', newBranch });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().populate('domain_id');  
    return res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findById(id).populate('domain_id');
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found.' });
    }

    return res.status(200).json(branch);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo, domain_id } = req.body;

    const domain = await WhitelistedDomain.findById(domain_id);
    if (!domain) {
      return res.status(404).json({ message: 'Whitelisted domain not found.' });
    }

    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      { name, logo, domain_id, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedBranch) {
      return res.status(404).json({ message: 'Branch not found.' });
    }

    return res.status(200).json({ message: 'Branch updated successfully.', updatedBranch });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a Branch
const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBranch = await Branch.findByIdAndDelete(id);
    if (!deletedBranch) {
      return res.status(404).json({ message: 'Branch not found.' });
    }

    return res.status(200).json({ message: 'Branch deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};

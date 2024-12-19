const WhitelistedDomain = require('../models/whiteListedDomain'); 

const createWhitelistedDomain = async (req, res) => {
  try {
    const { domain, name, branches } = req.body;

    if (!domain || !name || !branches) {
      return res.status(400).json({ message: 'Domain, name, and branches are required.' });
    }

    const newWhitelistedDomain = new WhitelistedDomain({
      domain,
      name,
      branches,
    });

    await newWhitelistedDomain.save();

    return res.status(201).json({ message: 'Whitelisted domain created successfully.', newWhitelistedDomain });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all Whitelisted Domains
const getAllWhitelistedDomains = async (req, res) => {
  try {
    const domains = await WhitelistedDomain.find();
    return res.status(200).json(domains);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific Whitelisted Domain by ID
const getWhitelistedDomainById = async (req, res) => {
  try {
    const { id } = req.params;

    const domain = await WhitelistedDomain.findById(id);
    if (!domain) {
      return res.status(404).json({ message: 'Whitelisted domain not found.' });
    }

    return res.status(200).json(domain);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a Whitelisted Domain
const updateWhitelistedDomain = async (req, res) => {
  try {
    const { id } = req.params;
    const { domain, name, branches } = req.body;

    const updatedDomain = await WhitelistedDomain.findByIdAndUpdate(
      id,
      { domain, name, branches, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedDomain) {
      return res.status(404).json({ message: 'Whitelisted domain not found.' });
    }

    return res.status(200).json({ message: 'Whitelisted domain updated successfully.', updatedDomain });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a Whitelisted Domain
const deleteWhitelistedDomain = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDomain = await WhitelistedDomain.findByIdAndDelete(id);
    if (!deletedDomain) {
      return res.status(404).json({ message: 'Whitelisted domain not found.' });
    }

    return res.status(200).json({ message: 'Whitelisted domain deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createWhitelistedDomain,
  getAllWhitelistedDomains,
  getWhitelistedDomainById,
  updateWhitelistedDomain,
  deleteWhitelistedDomain,
};

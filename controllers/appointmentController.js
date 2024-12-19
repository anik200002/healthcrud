// controllers/timeSlotController.js
const TimeSlot = require('../models/timeSlot');
const Doctor = require('../models/doctor'); // Import Doctor model

// Create Time Slot
const createTimeSlot = async (req, res) => {
  try {
    const { doctor_id, start_time, end_time, is_booked } = req.body;

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctor_id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    // Create a new time slot
    const timeSlot = new TimeSlot({
      doctor_id,
      start_time,
      end_time,
      is_booked: is_booked || false, // Default to false if not provided
    });

    // Save the time slot
    await timeSlot.save();
    return res.status(201).json({ message: 'Time slot created successfully.', timeSlot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = createTimeSlot;

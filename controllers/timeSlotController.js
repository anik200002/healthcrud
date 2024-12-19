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




// Get all time slots for a doctor
const getTimeSlots = async (req, res) => {
    try {
      const doctor_id = req.params.doctor_id;
  
      // Retrieve all time slots for the given doctor
      const timeSlots = await TimeSlot.find({ doctor_id });
      if (!timeSlots || timeSlots.length === 0) {
        return res.status(404).json({ message: 'No time slots found for this doctor.' });
      }
  
      return res.status(200).json(timeSlots);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error.' });
    }
  };
  
  


  // Update Time Slot
const updateTimeSlot = async (req, res) => {
  try {
    const timeSlotId = req.params.id;
    const { start_time, end_time, is_booked } = req.body;

    // Find and update the time slot
    const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(
      timeSlotId,
      {
        start_time,
        end_time,
        is_booked,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedTimeSlot) {
      return res.status(404).json({ message: 'Time slot not found.' });
    }

    return res.status(200).json({ message: 'Time slot updated successfully.', updatedTimeSlot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};




// Delete Time Slot
const deleteTimeSlot = async (req, res) => {
    try {
      const timeSlotId = req.params.id;
  
      // Find and delete the time slot
      const deletedTimeSlot = await TimeSlot.findByIdAndDelete(timeSlotId);
      if (!deletedTimeSlot) {
        return res.status(404).json({ message: 'Time slot not found.' });
      }
  
      return res.status(200).json({ message: 'Time slot deleted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error.' });
    }
  };
  
module.exports = {createTimeSlot,updateTimeSlot,deleteTimeSlot,getTimeSlots};

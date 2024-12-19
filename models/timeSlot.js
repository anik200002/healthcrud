const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;


const TimeSlotSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    doctor_id: { type: String, ref: 'Doctor', required: true },
    start_time: { type: Date },
    end_time: { type: Date },
    is_booked: { type: Boolean },
  },
  { timestamps: true }
);

const TimeSlot = mongoose.model('TimeSlot', TimeSlotSchema);
module.exports = TimeSlot;
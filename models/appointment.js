const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const AppointmentSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    appointment_date: { type: Date },
    status: { type: String },
    user_id: { type: String, ref: 'User', required: true },
    doctor_id: { type: String, ref: 'Doctor', required: true },
    note: { type: String },
    family_member_id: { type: String, ref: 'Family' },
    time_slot_id: { type: String, ref: 'TimeSlot' },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports=Appointment;
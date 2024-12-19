const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');  // Importing uuid for unique doctor IDs

const DoctorSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    first_name: { type: String },
    last_name: { type: String },
    specialty: { type: String },
    phone: { type: String },
    email: { type: String },
    experience: { type: String },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports=Doctor;
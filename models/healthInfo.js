const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');  
const { Schema } = mongoose;

const HealthInfoSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    weight: { type: Number },
    height: { type: Number },
    blood_type: { type: String },
    medical_conditions: { type: String },
    allergies: { type: String },
    medications: { type: String },
    past_surgeries: { type: String },
    user_id: { type: String, ref: 'User', required: true },
  },
  { timestamps: true }
);

const HealthInfo = mongoose.model('HealthInfo', HealthInfoSchema);
module.exports=HealthInfo;
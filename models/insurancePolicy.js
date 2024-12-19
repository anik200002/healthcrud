const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 
const { Schema } = mongoose;
const InsurancePolicySchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    issuer: { type: String },
    policy_number: { type: String },
    valid_till: { type: Date },
    user_id: { type: String, ref: 'User', required: true },
  },
  { timestamps: true }
);

const InsurancePolicy = mongoose.model('InsurancePolicy', InsurancePolicySchema);
module.exports=InsurancePolicy;
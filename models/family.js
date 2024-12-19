const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');
const FamilySchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    name: { type: String },
    dob: { type: Date },
    gender: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String },
    user_id: { type: String, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Family = mongoose.model('Family', FamilySchema);
module.exports=Family;
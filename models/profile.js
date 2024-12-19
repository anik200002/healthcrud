const mongoose = require('mongoose');
const { Schema } = mongoose;

const { v4: uuidv4 } = require('uuid'); 
const ProfileSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    picture: { type: String },
    user_id: { type: String, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports=Profile;
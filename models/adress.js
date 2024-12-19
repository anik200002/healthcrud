const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');  
const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    flat: { type: String },
    area: { type: String },
    landmark: { type: String },
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    address_type: { type: String },
    emergency_contact: { type: String },
    relationship: { type: String, enum: ['family', 'friend', 'other'] },
    emergency_number: { type: String },
    user_id: { type: String, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Address = mongoose.model('Address', AddressSchema);
module.exports=Address;
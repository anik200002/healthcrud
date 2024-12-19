const mongoose = require('mongoose');

const WhitelistedMobileNumberSchema = new Schema(
    {
      id: {
        type: String,
        default: uuidv4,
        unique: true,
      },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now },
      mobile_number: { type: String, required: true },
      branch_id: { type: String, ref: 'Branch', required: true },
    },
    { timestamps: true }
  );
  
  const WhitelistedMobileNumber = mongoose.model('WhitelistedMobileNumber', WhitelistedMobileNumberSchema);
  module.exports=WhitelistedMobileNumber;
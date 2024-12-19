const mongoose = require('mongoose');

const WhitelistedEmailSchema = new Schema(
    {
      id: {
        type: String,
        default: uuidv4,
        unique: true,
      },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now },
      email_id: { type: String, required: true },
      branch_id: { type: String, ref: 'Branch', required: true },
    },
    { timestamps: true }
  );
  
  const WhitelistedEmail = mongoose.model('WhitelistedEmail', WhitelistedEmailSchema);
  module.exports=WhitelistedEmail;
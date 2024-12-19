const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const WhitelistedDomainSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    domain: { type: String, required: true },
    name: { type: String, required: true },
    branches: { type: Number, required: true },
  },
  { timestamps: true }
);

const WhitelistedDomain = mongoose.model('WhitelistedDomain', WhitelistedDomainSchema);
module.exports=WhitelistedDomain;
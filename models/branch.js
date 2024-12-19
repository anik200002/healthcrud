const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');


const BranchSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    name: { type: String, required: true },
    logo: { type: String },
    domain_id: { type: String, ref: 'WhitelistedDomain', required: true },
  },
  { timestamps: true }
);

const Branch = mongoose.model('Branch', BranchSchema);
module.exports=Branch;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid'); 
const PlanSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    name: { type: String, required: true },
    features: { type: Schema.Types.Mixed, required: true }, 
    default: { type: Boolean, required: true },
    branch_id: { type: String, ref: 'Branch', required: true },
    is_active: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', PlanSchema);
module.exports=Plan;
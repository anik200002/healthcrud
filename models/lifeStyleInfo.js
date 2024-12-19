const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 
const { Schema } = mongoose;

const LifeStyleInfoSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    smoking_habits: { type: String, enum: ['none', 'occasional', 'regular'] },
    alcohol_consumptions: { type: String, enum: ['none', 'occasional', 'regular'] },
    activity_level: { type: String },
    diet_preferences: { type: String },
    user_id: { type: String, ref: 'User', required: true },
  },
  { timestamps: true }
);

const LifeStyleInfo = mongoose.model('LifeStyleInfo', LifeStyleInfoSchema);
module.exports=LifeStyleInfo;
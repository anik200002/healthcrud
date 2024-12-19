const mongoose = require('mongoose');

const VideoCallSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    appointment_id: { type: String, ref: 'Appointment', required: true },
    start_time: { type: Date },
    end_time: { type: Date },
    attached_files: { type: [String] }, 
  },
  { timestamps: true }
);

const VideoCall = mongoose.model('VideoCall', VideoCallSchema);
module.exports=VideoCall;
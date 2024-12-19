
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      default: () => new mongoose.Types.ObjectId(), 
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    branch_id: { type: String, ref: 'Branch', required: true },  
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

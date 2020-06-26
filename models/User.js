const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please add an email'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please add password'],
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', UserSchema);

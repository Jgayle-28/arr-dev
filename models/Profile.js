const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  profilePicture: {
    type: String,
    default: 'default_profilePicture',
  },
  coverPhoto: {
    type: String,
    default: 'default_coverPhoto',
  },
  about: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  favoriteVerse: {
    type: String,
  },
  favoriteBook: {
    type: String,
  },
  whatsApp: {
    type: String,
  },
  youTube: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);

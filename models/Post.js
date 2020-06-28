const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  profile: {
    type: Object,
  },
  // profile: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Profile',
  // },
  text: {
    type: String,
    required: [true, 'Make sure the text of the post'],
  },
  postType: {
    type: String,
    enum: ['PRAYER_REQ', 'PRAISE_REP', 'GENERAL'],
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: [true, 'Make sure enter the comment text'],
      },
      name: {
        type: String,
      },
      profilePicture: {
        type: String,
      },
      profile: {
        type: Object,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Posts', PostSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // profile: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Profile',
  // },
  profile: {
    type: Object,
  },
  postImage: { type: Object },
  text: {
    type: String,
    required: [true, 'Make sure the text of the post'],
  },
  postLink: { type: 'String' },
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
    type: Object,
  },
  likes: [
    {
      // user: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'User',
      // },
      user: { type: Object },
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
      // profilePicture: {
      //   type: Object,
      // },
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

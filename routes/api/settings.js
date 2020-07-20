const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const colors = require('colors');

const User = require('../../models/User');
const Post = require('../../models/Post');

// @desc -> Update user settings
// @route -> POST api/user-settings
// @access -> Private
router.post('/', auth, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists -> by id
    let user = await User.findOne({ _id: req.user.id });

    const userFields = {};
    if (name !== user.name) {
      // Update user name
      userFields.name = name;
      // Update user name in posts
      await Post.updateMany({ user: req.user.id }, { name }, { multi: true });
      // Update user name in all post comments
      let allPosts = await Post.find();
      // Map through comments and update comments by user
      allPosts.map(
        (post) =>
          post.comments.map((comment) => {
            comment.user.toString() === req.user.id
              ? (comment.name = name)
              : comment;
          }, post.save()) // saves post to DB
      );
    }

    if (email !== user.email) {
      userFields.email = email;
    }

    if (password && password.length > 0) {
      // encrypt password
      const salt = await bcrypt.genSalt(10); // how many rounds we want to encrypt
      const newPassword = await bcrypt.hash(password, salt); // hashes/encrypts
      userFields.password = newPassword;
    }

    // Update user in DB
    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userFields },
      { $new: true }
    );

    return res.status(200).json({ user, email });
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;

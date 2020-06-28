const express = require('express');
const auth = require('../../middleware/auth');
const colors = require('colors');
const { check, validationResult } = require('express-validator');

// Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();

// @desc -> Create Post
// @route -> POST api/posts
// @access -> Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // Get user and profile
      const user = await User.findById(req.user.id).select('-password');
      const profile = await User.find({ email: user.email });
      //  Create post object
      const newPost = new Post({
        text: req.body.text,
        postType: req.body.postType,
        name: user.name,
        profilePicture: profile[0].profilePicture,
        avatar: user.avatar,
        profile: profile[0],
        user: req.user.id,
      });
      // save the new post
      const post = await newPost.save();
      // Send the new post as response
      res.json({ success: true, post });
    } catch (err) {
      console.log(`${err.message}`.red.inverse);
      res.status(500).send('Server Error');
    }
  }
);

// @desc -> Get all Posts
// @route -> GET api/posts
// @access -> Private
router.get('/', auth, async (req, res, next) => {
  try {
    // Get posts -> Sort by most recent
    const posts = await Post.find().sort({ date: -1 });
    //  send posts
    res.json({ success: true, numOfposts: posts.length, posts });
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
});

// @desc -> Get post by id
// @route -> GET api/posts/:id
// @access -> Private
router.get('/:id', auth, async (req, res, next) => {
  try {
    // Get post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    //  send post
    res.json({ success: true, post });
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @desc -> Delete post
// @route -> DELETE api/posts/:id
// @access -> Private
router.delete('/:id', auth, async (req, res, next) => {
  try {
    // Get post
    const post = await Post.findById(req.params.id);
    // Check if post exists
    if (!post) {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    // Check if user owns the post
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({
          success: false,
          msg: 'User not authorized to remove this post',
        });
    }
    // Delete post from DB
    await post.remove();
    //  send response
    res.json({ success: true, msg: 'Posts Deleted', post });
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @desc -> Like post
// @route -> PUT api/posts/like/:id
// @access -> Private
router.put('/like/:id', auth, async (req, res, next) => {
  try {
    // Get post
    const post = await Post.findById(req.params.id);
    // Check if post exists
    if (!post) {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    // Check if user has liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res
        .status(400)
        .json({ success: false, msg: 'You have already liked this post' });
    }
    // If user has not liked post
    post.likes.unshift({ user: req.user.id });
    // Save updated post to DB
    await post.save();
    //  send response
    res.json({ success: true, msg: 'Posts Liked', post, likes: post.likes });
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @desc -> Unlike post
// @route -> PUT api/posts/unlike/:id
// @access -> Private
router.put('/unlike/:id', auth, async (req, res, next) => {
  try {
    // Get post
    const post = await Post.findById(req.params.id);
    // Check if post exists
    if (!post) {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    // Check if user has liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, msg: 'You have not like this post' });
    }
    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    // Remove user from likes array
    post.likes.splice(removeIndex, 1);
    // Save updated post to DB
    await post.save();
    //  send response
    res.json({ success: true, msg: 'Posts unliked', post, likes: post.likes });
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @desc -> Add comment post
// @route -> POST api/posts/comment/:id
// @access -> Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // Get user, profile and post
      const user = await User.findById(req.user.id).select('-password');
      const profile = await User.find({ email: user.email });
      const post = await Post.findById(req.params.id);

      //  Create post object
      const newComment = {
        text: req.body.text,
        name: user.name,
        profilePicture: profile[0].profilePicture,
        avatar: user.avatar,
        profile: profile[0],
        user: req.user.id,
      };
      // Add new comment to post
      post.comments.unshift(newComment);
      // Save the comment
      await post.save();
      // Send the new post as response
      res.json({ success: true, post, comments: post.comments });
    } catch (err) {
      console.log(`${err.message}`.red.inverse);
      res.status(500).send('Server Error');
    }
  }
);

// @desc -> Delete comment
// @route -> DELETE api/posts/comment/:id/:comment_id
// @access -> Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    // Get comment
    const post = await Post.findById(req.params.id);
    // Get comment from post
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Check if comment exists
    if (!comment) {
      return res.status(404).json({ success: false, msg: 'Comment not found' });
    }
    // If comment exists -> check user
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ success: false, msg: 'Not authorized to delete comment' });
    }
    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    // Remove user from likes array
    post.comments.splice(removeIndex, 1);
    // Save updated post to DB
    await post.save();
    //  send response
    res.json({
      success: true,
      msg: 'Comment removed',
      post,
      comments: post.comments,
    });
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

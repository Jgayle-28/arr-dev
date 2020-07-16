const express = require('express');
const auth = require('../../middleware/auth');
const colors = require('colors');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

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
      // const profile = await Profile.findById(req.user.id);
      let profile = await Profile.findOne({ user: req.user.id });
      // console.log('profile', profile);
      // console.log('req.user', req.user);
      // console.log('USER', user);
      // console.log('req.body', req.body);
      const { text, postType, postImage, postLink } = req.body;
      //  Create post object ->
      let userPost = {
        avatar: user.avatar,
        profile: profile,
        // profile: profile[0],
        user: req.user.id,
        name: user.name,
        postType,
        text,
      };
      if (postLink) {
        userPost.postLink =
          req.body.postLink === ''
            ? ''
            : normalize(req.body.postLink, { forceHttps: true });
      }

      if (postImage) userPost.postImage = postImage;

      const newPost = new Post(userPost);

      // const newPost = new Post({
      //   postImage: req.body.postImage,
      //   postLink:
      //     req.body.postLink === ''
      //       ? ''
      //       : normalize(req.body.postLink, { forceHttps: true }),
      //   text: req.body.text,
      //   postType: req.body.postType,
      //   // name: user.name,
      //   // profilePicture: profile[0].profilePicture,
      //   // avatar: user.avatar,
      //   // profile: profile[0],
      //   // user: req.user.id,
      // });

      // Update userPosts in profile
      if (profile) {
        let userPosts = [...profile.userPosts];
        userPosts.unshift(newPost);
        const profileFields = { userPosts };
        console.log('USER POSTS', userPosts);
        console.log('Profile Fields', profileFields);
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { $new: true }
        );
      }
      // save the new post
      const post = await newPost.save();
      // Send the new post as response
      res.json(post);
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
    res.json(posts);
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
    res.json(post);
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
    // Get post and profile
    const post = await Post.findById(req.params.id);
    let profile = await Profile.findOne({ user: req.user.id });
    // Check if post exists
    if (!post) {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    // Check if user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        msg: 'User not authorized to remove this post',
      });
    }
    // Delete post from DB
    await post.remove();

    // Remove from user posts in profile
    let userPosts = [...profile.userPosts];
    userPosts.splice(
      userPosts.findIndex((post) => post._id === req.params.id),
      1
    );
    const profileFields = { userPosts };
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { $new: true }
    );

    //  send response
    res.json({ success: true, msg: 'Posts Deleted', post, userPosts });
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
    // console.log('POST', post);
    // Check if post exists
    if (!post) {
      return res.status(404).json({ success: false, msg: 'Post not found' });
    }
    // console.log('USER', req.user.id);
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

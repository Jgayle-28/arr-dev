const express = require('express');
const multer = require('multer');
const auth = require('../../middleware/auth');
const colors = require('colors');
const normalize = require('normalize-url');
const { check, validationResult } = require('express-validator');

// Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Multer storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    // user-userId-timestamp -> format for image

    // Get file extension
    const ext = file.mimetype.split('/')[1];
    // Save formatted file name
    cb(null, `user-${req.user.id}-profilePicture.${ext}`);
    // cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// Multer filter -> check for images
const multerFilter = (req, file, cb) => {
  // If image is uploaded
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    // If image is not uploaded
    cb('Please upload an image', false);
  }
};

// Picture upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const router = express.Router();

// @desc -> Get current user profile
// @route -> GET api/profile/me
// @access -> Private
router.get('/me', auth, async (req, res, next) => {
  try {
    // req.user.id -> is the user making request
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar', 'profilePicture', 'coverPhoto']);
    // If NO profile
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is not profile for this user' });
    }
    // If there is a profile -> send profile
    res.json(profile);
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
});

// @desc -> Create or update user profile
// @route -> POST api/profile
// @access -> Private
// router.post('/', [auth, upload.single('profilePicture')], async (req, res) => {
router.post('/', auth, async (req, res) => {
  // console.log('req.file', req.file);
  // console.log('req.body', req.body);
  // Get fields from request body
  const {
    coverPhoto,
    profilePicture,
    country,
    city,
    state,
    about,
    favoriteVerse,
    favoriteBook,
    whatsApp,
    youTube,
    phone,
    website,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  // Check if anything was added

  // if (coverPhoto) profileFields.coverPhoto = coverPhoto;
  // if (profilePicture) profileFields.profilePicture = profilePicture;
  if (about) profileFields.about = about;
  if (country) profileFields.country = country;
  if (city) profileFields.city = city;
  if (state) profileFields.state = state;
  if (favoriteVerse) profileFields.favoriteVerse = favoriteVerse;
  if (favoriteBook) profileFields.favoriteBook = favoriteBook;
  if (whatsApp) profileFields.whatsApp = whatsApp;
  if (youTube) {
    profileFields.youTube =
      youTube === '' ? '' : normalize(youTube, { forceHttps: true });
  }
  if (phone) profileFields.phone = phone;
  if (website) {
    profileFields.website =
      website === '' ? '' : normalize(website, { forceHttps: true });
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    // IF there is a profile -> update
    if (profile) {
      // UPDATE
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { $new: true }
      );
      // Return profile
      return res.json(profile);
    }
    // If there is NO profile -> Create a profile
    profile = new Profile(profileFields);
    // Save profile
    await profile.save();
    // Return the profile
    res.json(profile);
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
});

// @desc -> Upload user profile-picture
// @route -> POST api/profile/upload/profile-picture
// @access -> Private
router.post('/upload/profile-picture', auth, async (req, res) => {
  // Get fields from request body
  const { profilePicture } = req.body;
  // Build profilePicture object
  const profileFields = {};
  profileFields.user = req.user.id;
  // Check if anything was added
  if (profilePicture) profileFields.profilePicture = profilePicture;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    // IF there is a profile -> update
    if (profile) {
      // UPDATE
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { $new: true }
      );
      // Return profile
      return res.json(profile);
    }
    // If there is NO profile -> Create a profile
    profile = new Profile(profileFields);
    // Save profile
    await profile.save();
    // Return the profile
    res.json(profile);
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
});

// @desc -> Upload user cover photo
// @route -> POST api/profile/upload/cover-photo
// @access -> Private
router.post('/upload/cover-photo', auth, async (req, res) => {
  // Get fields from request body
  const { coverPhoto } = req.body;
  // Build profilePicture object
  const profileFields = {};
  profileFields.user = req.user.id;
  // Check if anything was added
  if (coverPhoto) profileFields.coverPhoto = coverPhoto;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    // IF there is a profile -> update
    if (profile) {
      // UPDATE
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { $new: true }
      );
      // Return profile
      return res.json(profile);
    }
    // If there is NO profile -> Create a profile
    profile = new Profile(profileFields);
    // Save profile
    await profile.save();
    // Return the profile
    res.json(profile);
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
});

// @desc -> Get all profiles
// @route -> GET api/profile
// @access -> Public
router.get('/', async (req, res) => {
  try {
    // Get all profiles
    const profiles = await Profile.find().populate('user', [
      'name',
      'avatar',
      'profilePicture',
      'coverPhoto',
    ]);
    // send profiles
    res.json(profiles);
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
});

// @desc -> Get profile by user Id
// @route -> GET api/profile/user/:user_id
// @access -> Public
router.get('/user/:user_id', async (req, res) => {
  try {
    // Get all profile
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar', 'profilePicture', 'coverPhoto']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    // send profiles
    res.json(profile);
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @desc -> Delete user profile -> posts and user from DB
// @route -> DELETE api/profile
// @access -> Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    // TODO - Remove Users posts
    // send profiles
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

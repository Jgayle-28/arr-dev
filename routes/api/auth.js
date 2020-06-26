const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const colors = require('colors');

const User = require('../../models/User');

// @desc -> Get Auth
// @route -> GET api/auth
// @access -> Public
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); //.select('-password') -> removes pass word from response
    res.json(user);
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
  res.send('Auth route');
});

module.exports = router;

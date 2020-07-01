const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const colors = require('colors');
const { check, validationResult } = require('express-validator');

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
});

// @desc -> Login User
// @route -> POST api/auth
// @access -> Public
router.post(
  '/',
  // Validate submitted request
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    // If errors in request
    if (!errors.isEmpty()) {
      // Send errors as array
      return res.status(400).json({ errors: errors.array() });
    }
    // If NO errors
    const { email, password } = req.body;

    try {
      // Check if user exists -> by email
      let user = await User.findOne({ email });
      // If user does NOT exist send error response
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // If user exists -> Match password // user.password comes from user in DB
      const isMatch = await bcrypt.compare(password, user.password);

      //  If passwords do NOT match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      // Create token with payload and jwt secret token and expiration time
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          // send token which is user to front end
          res.json({ token }); // Send jwt web token -> can send the user id
        }
      );
      // return res.status(200).json({ errors: errors.array() });
    } catch (err) {
      console.log(`${err.message}`.red.inverse);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

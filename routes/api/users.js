const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const colors = require('colors');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @desc -> Create / Register User
// @route -> POST api/users
// @access -> Private
router.post(
  '/',
  // Validate submitted request
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    // If errors in request
    if (!errors.isEmpty()) {
      // Send errors as array
      return res.status(400).json({ errors: errors.array() });
    }
    // If NO errors
    const { name, email, password } = req.body;

    try {
      // Check if user exists -> by email
      let user = await User.findOne({ email });
      // If user exists send error response
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      // get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        default: 'mm',
      });
      // Create new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // encrypt password
      const salt = await bcrypt.genSalt(10); // how many rounds we want to encrypt
      user.password = await bcrypt.hash(password, salt); // hashes/encrypts password

      // SAVE USER TO DB
      await user.save();

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
          res.json({ token }); //can send the user id
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

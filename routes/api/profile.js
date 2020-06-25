const express = require('express');
const router = express.Router();

// @desc -> Get Profile
// @route -> GET api/profile
// @access -> Public
router.get('/', (req, res, next) => {
  res.send('Profile route');
});

module.exports = router;

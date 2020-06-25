const express = require('express');
const router = express.Router();

// @desc -> Get Auth
// @route -> GET api/auth
// @access -> Public
router.get('/', (req, res, next) => {
  res.send('Auth route');
});

module.exports = router;

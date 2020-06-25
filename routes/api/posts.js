const express = require('express');
const router = express.Router();

// @desc -> Get Posts
// @route -> GET api/posts
// @access -> Public
router.get('/', (req, res, next) => {
  res.send('Posts route');
});

module.exports = router;

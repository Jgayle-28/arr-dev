const express = require('express');
const auth = require('../../middleware/auth');
const colors = require('colors');
const { cloudinary } = require('../../utils/cloudinary');

const router = express.Router();

// @desc -> Delete cloudinary picture
// @route -> POST api/cloudinary/delete/cloudinary-picture
// @access -> Private
router.post('/delete/cloudinary-picture', auth, async (req, res) => {
  // Get fields from request body
  const { imageId } = req.body;
  console.log('imageId in route', imageId);
  try {
    const deleteImage = await cloudinary.api.delete_resources(
      (public_ids = [imageId]),
      function (result) {
        console.log(result);
      }
      // { resource_type: 'video' }
    );
    console.log('deleteImage', deleteImage);
    // Return JSON response
    res.json('Weeeee');
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    res.status(500).send('Server Error');
  }
});
module.exports = router;

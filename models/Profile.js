const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  profilePicture: {
    type: Object,
    default: {
      access_mode: 'public',
      asset_id: '9a19872d95b11fb649aab97038605ac5',
      bytes: 879,
      created_at: '2020-07-12T23:03:57Z',
      etag: 'abd554c5717a49c4edc0ab145316dd2b',
      existing: false,
      format: 'svg',
      height: 60,
      original_filename: 'default_image',
      placeholder: false,
      public_id: 'profile_pictures/default_image_qmdlo1',
      resource_type: 'image',
      secure_url:
        'https://res.cloudinary.com/dqumeqtlv/image/upload/v1594595037/profile_pictures/default_image_qmdlo1.svg',
      signature: '87cd37ddae76e8c36a3322bffa6c1595738f705d',
      tags: [],
      type: 'upload',
      url:
        'http://res.cloudinary.com/dqumeqtlv/image/upload/v1594595037/profile_pictures/default_image_qmdlo1.svg',
      version: 1594595037,
      version_id: 'b0fc35a610110b8c660196cfed524499',
      width: 60,
    },
  },
  coverPhoto: {
    type: Object,
    default: {
      access_mode: 'public',
      asset_id: '1d51266df534b292af926b227b8ca6af',
      bytes: 30311,
      created_at: '2020-07-13T00:36:35Z',
      etag: '1dfd711d70ca5630db1e67175ff500d0',
      format: 'jpg',
      height: 650,
      original_filename: 'default_coverPhoto',
      placeholder: false,
      public_id: 'cover_photos/m8muhxhysiaiibnwjv4w',
      resource_type: 'image',
      secure_url:
        'https://res.cloudinary.com/dqumeqtlv/image/upload/v1594600595/cover_photos/m8muhxhysiaiibnwjv4w.jpg',
      signature: '970a7bdebdc4bd712b104ac96b2937e2fef4f292',
      tags: [],
      type: 'upload',
      url:
        'http://res.cloudinary.com/dqumeqtlv/image/upload/v1594600595/cover_photos/m8muhxhysiaiibnwjv4w.jpg',
      version: 1594600595,
      version_id: 'ca3633576f1e96e938eb4a005c8a2317',
      width: 1280,
      access_mode: 'public',

      // asset_id: "9c672ee48f3f46a0568e2185b8e60aaa",
      // bytes: 215965,
      // created_at: "2020-07-13T00:41:21Z",
      // etag: "18116d3e4103eef26cf7fecad5311df5",
      // format: "jpg",
      // height: 353,
      // original_filename: "default-cover-photo",
      // placeholder: false,
      // public_id: "cover_photos/fyrrcvb6lb9vi84k1tbr",
      // resource_type: "image",
      // secure_url: "https://res.cloudinary.com/dqumeqtlv/image/upload/v1594600881/cover_photos/fyrrcvb6lb9vi84k1tbr.jpg",
      // signature: "8706e3fdd08687da8733bd1a8511f42dcc643918",
      // tags: [],
      // type: "upload",
      // url: "http://res.cloudinary.com/dqumeqtlv/image/upload/v1594600881/cover_photos/fyrrcvb6lb9vi84k1tbr.jpg",
      // version: 1594600881,
      // version_id: "2e599411f62d3436bc960be7f6b53760",
      // width: 1251
    },
  },
  about: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  favoriteVerse: {
    type: String,
  },
  favoriteBook: {
    type: String,
  },
  whatsApp: {
    type: String,
  },
  youTube: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  userPosts: { type: Array, default: [] },
});

module.exports = mongoose.model('Profile', ProfileSchema);

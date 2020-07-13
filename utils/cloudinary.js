const config = require('config');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dqumeqtlv',
  api_key: '489731581132373',
  api_secret: 'Rj0gDY29iUynnTbb2CnW4SsKqy4',
});
// cloudinary.config({
//   cloud_name: config.get('CLOUDINARY_NAME'),
//   api_key: config.get('CLOUDINARY_API_KEY'),
//   api_secret: config.get('CLOUDINARY_API_SECRET'),
// });

module.exports = { cloudinary };

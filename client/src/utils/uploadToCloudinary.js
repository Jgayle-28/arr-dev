const uploadToCloudinary = async (file, type) => {
  console.log('UPLOADING TO CLOUDINARY');

  // Create form data
  let data = new FormData();
  data.append('file', file);
  data.append('api_key', 489731581132373);
  data.append('cloud_name', 'dqumeqtlv');
  data.append('api_secret', 'Rj0gDY29iUynnTbb2CnW4SsKqy4');
  if (type === 'PROFILE_PICTURE') {
    data.append('upload_preset', 'profile_pictures');
  }
  if (type === 'COVER_PHOTO') {
    data.append('upload_preset', 'cover_photos');
  }
  if (type === 'POST_IMAGE') {
    data.append('upload_preset', 'post_images');
  }

  // Send file to cloudinary
  const res = await fetch(
    'https://api.cloudinary.com/v1_1/dqumeqtlv/image/upload',
    { method: 'POST', body: data }
  );
  const url = await res.json();
  // console.log('URL', url);
  return url;
};

export default uploadToCloudinary;

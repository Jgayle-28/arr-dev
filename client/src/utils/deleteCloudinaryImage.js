import axios from 'axios';

const deleteCloudinaryImage = (imageId) => {
  console.log('imageId', imageId);
  const data = {
    imageId,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios.post('/api/cloudinary/delete/cloudinary-picture', data);
};

export default deleteCloudinaryImage;

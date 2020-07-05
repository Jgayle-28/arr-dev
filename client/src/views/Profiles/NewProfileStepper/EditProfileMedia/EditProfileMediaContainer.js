import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// placeholders
import default_coverPhoto from '../../../../assets/img/placeholders/default_coverPhoto.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  input: {
    display: 'none',
  },
  inputWrapper: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: 15,
  },
  coverPhoto: {
    width: theme.spacing(35),
    height: theme.spacing(15),
    marginBottom: 15,
  },
}));

const EditProfileMediaContainer = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    profilePicture: null,
    coverPhoto: null,
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleImageSelect = (e) => {
    let reader = new FileReader();
    let newFile = e.target.files[0];
    let id = e.target.id;
    reader.onloadend = () => {
      // setFile(newFile);
      if (id === 'profilePicture') {
        setProfilePicture(reader.result);
        console.log('reader.result', reader.result.split(','));
      } else {
        setCoverPhoto(reader.result);
      }
    };
    if (newFile) {
      reader.readAsDataURL(newFile);
    }
    console.log('newFile', newFile);
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputWrapper}>
        <input
          onChange={(e) => handleImageSelect(e)}
          name='profilePicture'
          accept='image/*'
          className={classes.input}
          id='profilePicture'
          type='file'
        />
        {/* <img src={profilePicture} alt='' /> */}
        <Avatar src={profilePicture} className={classes.profilePicture} />
        {/* <Avatar src={profilePicture} className={classes.profilePicture} /> */}
        <label htmlFor='profilePicture'>
          <Button variant='outlined' color='primary' component='span'>
            Select Profile Picture
          </Button>
        </label>
      </div>

      <div className={classes.inputWrapper}>
        <input
          onChange={(e) => handleImageSelect(e)}
          name='coverPhoto'
          accept='image/*'
          className={classes.input}
          id='coverPhoto'
          type='file'
        />
        <Avatar
          src={coverPhoto === null ? default_coverPhoto : coverPhoto}
          className={classes.coverPhoto}
          variant='rounded'
        />
        <label htmlFor='coverPhoto'>
          <Button variant='outlined' color='primary' component='span'>
            Select Cover Photo
          </Button>
        </label>
      </div>
    </div>
  );
};
EditProfileMediaContainer.propTypes = {};
export default connect()(EditProfileMediaContainer);

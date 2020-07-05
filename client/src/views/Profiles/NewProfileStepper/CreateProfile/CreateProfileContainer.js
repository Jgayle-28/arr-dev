import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  uploadProfilePicture,
  uploadCoverPhoto,
} from '../../../../redux/actions/profileActions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// placeholders
import default_coverPhoto from '../../../../assets/img/placeholders/default_coverPhoto.svg';

const useStyles = makeStyles((theme) => ({
  container: { width: 700 },
  formWrapper: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // width: 200,
    },
  },
  root: {
    display: 'flex',
    width: '100%',
    margin: '15px 0',
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

const CreateProfileContainer = ({
  history,
  createProfile,
  uploadProfilePicture,
  uploadCoverPhoto,
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    // profilePicture: null,
    // coverPhoto: null,
    about: '',
    favoriteVerse: '',
    favoriteBook: '',
    whatsApp: '',
    youTube: '',
    phone: '',
    website: '',
  });
  const [preview, setPreview] = useState({
    avatar: null,
    photo: null,
  });
  const { avatar, photo } = preview;
  const {
    profilePicture,
    coverPhoto,
    about,
    favoriteVerse,
    favoriteBook,
    whatsApp,
    youTube,
    phone,
    website,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageSelect = (e) => {
    let reader = new FileReader();
    let newFile = e.target.files[0];
    let id = e.target.id;
    let name = e.target.name;
    reader.onloadend = () => {
      // setFormData({ ...formData, [id]: newFile });
      // setFormData({ ...formData, [id]: reader.result.split(',')[1] });
      setPreview({ ...preview, [name]: reader.result });
      if (id === 'profilePicture') {
        // Upload the base64 image/file
        uploadProfilePicture({ profilePicture: reader.result.split(',')[1] });
      } else {
        uploadCoverPhoto({ coverPhoto: reader.result.split(',')[1] });
      }
      // console.log('reader.result.split(', ')[1]', reader.result.split(',')[1]);
    };
    if (newFile) {
      reader.readAsDataURL(newFile);
    }
    console.log('newFile', newFile);
  };

  const handleSubmit = () => {
    console.log('FORM DATA', formData);
    createProfile(JSON.stringify(formData), history);
  };
  return (
    <div className={classes.container}>
      {/* PROFILE PIC / COVER PHOTO */}
      <div className={classes.root}>
        <div className={classes.inputWrapper}>
          <input
            onChange={(e) => handleImageSelect(e)}
            name='avatar'
            accept='image/*'
            className={classes.input}
            id='profilePicture'
            type='file'
          />
          <Avatar src={avatar} className={classes.profilePicture} />
          <label htmlFor='profilePicture'>
            <Button variant='outlined' color='primary' component='span'>
              Select Profile Picture
            </Button>
          </label>
        </div>
        {/* FORM FIELDS */}
        <div className={classes.inputWrapper}>
          <input
            onChange={(e) => handleImageSelect(e)}
            name='photo'
            accept='image/*'
            className={classes.input}
            id='coverPhoto'
            type='file'
          />
          <Avatar
            src={photo === null ? default_coverPhoto : photo}
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
      <form className={classes.formWrapper} noValidate autoComplete='off'>
        <TextField
          fullWidth
          name='about'
          value={about}
          label='About'
          id='outlined-size-small'
          multiline
          rows={4}
          variant='outlined'
          size='small'
          onChange={(e) => onChange(e)}
        />
        <TextField
          fullWidth
          name='favoriteVerse'
          value={favoriteVerse}
          label='Favorite Verse In The Bible'
          id='outlined-size-small'
          variant='outlined'
          size='small'
          onChange={(e) => onChange(e)}
        />
        <TextField
          fullWidth
          name='favoriteBook'
          value={favoriteBook}
          label='Favorite Book Of The Bible'
          id='outlined-size-small'
          variant='outlined'
          size='small'
          onChange={(e) => onChange(e)}
        />
        <TextField
          fullWidth
          name='whatsApp'
          value={whatsApp}
          label='Whats App Credentials'
          id='outlined-size-small'
          variant='outlined'
          size='small'
          onChange={(e) => onChange(e)}
        />
        <TextField
          fullWidth
          name='youTube'
          value={youTube}
          label='Youtube Channel'
          id='outlined-size-small'
          variant='outlined'
          size='small'
          onChange={(e) => onChange(e)}
        />
        <TextField
          fullWidth
          name='phone'
          value={phone}
          label='Share Phone Number'
          id='outlined-size-small'
          variant='outlined'
          size='small'
          onChange={(e) => onChange(e)}
        />
        <TextField
          fullWidth
          name='website'
          value={website}
          label='Your Website (if you have one)'
          id='outlined-size-small'
          variant='outlined'
          size='small'
          onChange={(e) => onChange(e)}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSubmit}>
          Create Profile
        </Button>
      </form>
    </div>
  );
};
CreateProfileContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  uploadProfilePicture: PropTypes.func.isRequired,
  uploadCoverPhoto: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default withRouter(
  connect(mapStateToProps, {
    createProfile,
    uploadProfilePicture,
    uploadCoverPhoto,
  })(CreateProfileContainer)
);

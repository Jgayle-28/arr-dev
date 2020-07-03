import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: { width: 800 },
  formWrapper: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // width: 200,
    },
  },
}));

const CreateProfileContainer = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    about: '',
    favoriteVerse: '',
    favoriteBook: '',
    whatsApp: '',
    youTube: '',
    phone: '',
    website: '',
  });
  const {
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

  const handleSubmit = () => {};
  return (
    <div className={classes.container}>
      <form className={classes.formWrapper} noValidate autoComplete='off'>
        <TextField
          fullWidth
          name='about'
          value={about}
          label='About'
          id='outlined-size-small'
          multiline
          rows={4}
          // defaultValue='Small'
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
          // defaultValue='Small'
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
          // defaultValue='Small'
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
          // defaultValue='Small'
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
          // defaultValue='Small'
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
          // defaultValue='Small'
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
          // defaultValue='Small'
          variant='outlined'
          size='small'
          onChange={(e) => onChange(e)}
        />
      </form>
    </div>
  );
};
CreateProfileContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(CreateProfileContainer);

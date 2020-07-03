import React from 'react';
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

const EditProfileContainer = () => {
  const classes = useStyles();

  const handleSubmit = () => {};
  return (
    <div className={classes.container}>
      <form className={classes.formWrapper} noValidate autoComplete='off'>
        <TextField
          fullWidth
          label='Size'
          id='outlined-size-small'
          // defaultValue='Small'
          variant='outlined'
          size='small'
        />
      </form>
    </div>
  );
};
EditProfileContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(EditProfileContainer);

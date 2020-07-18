import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CustomButton from '../../components/CustomButton';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardHeader: {
    letterSpacing: 0.7,
    borderBottom: '1px solid #EAEDF3',
  },
  textField: {
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#C6C6C6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1665D8',
    },
  },
}));

const initialState = {
  name: '',
  email: '',
};

const SettingsContainer = ({ auth: { loading, user } }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    if (!loading && user) {
      const userData = { ...initialState };
      for (const key in user) {
        if (key in userData) userData[key] = user[key];
      }
      setFormData(userData);
    }
  }, [loading, user]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log('formData', formData);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Card variant='outlined'>
            <CardHeader title='User Settings' className={classes.cardHeader} />
            <CardContent>
              <form
                className={classes.formWrapper}
                noValidate
                autoComplete='off'>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name='name'
                      value={name}
                      label='User Name'
                      id='outlined-size-small'
                      variant='outlined'
                      size='small'
                      onChange={(e) => onChange(e)}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name='email'
                      value={email}
                      label='User Email'
                      id='outlined-size-small'
                      variant='outlined'
                      size='small'
                      onChange={(e) => onChange(e)}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Divider variant='middle' />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name='password'
                      value={password}
                      label='User Password'
                      id='outlined-size-small'
                      variant='outlined'
                      size='small'
                      onChange={(e) => onChange(e)}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name='password2'
                      value={password2}
                      label='Confirm Password'
                      id='outlined-size-small'
                      variant='outlined'
                      size='small'
                      onChange={(e) => onChange(e)}
                      className={classes.textField}
                    />
                  </Grid>
                </Grid>
              </form>
            </CardContent>
            <CardActions>
              <CustomButton
                onClick={handleSubmit}
                variant='contained'
                color='primary'>
                Update Settings
              </CustomButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
SettingsContainer.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SettingsContainer);

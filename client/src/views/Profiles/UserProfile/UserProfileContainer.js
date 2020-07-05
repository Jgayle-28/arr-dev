import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import UserPosts from '../components/UserPosts';
import UserDetails from '../components/UserDetails';

const useStyles = makeStyles({
  profileContainer: {
    flexGrow: 1,
  },
  media: {
    height: 300,
  },
  userDetailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-60px',
    marginLeft: 40,
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: { height: 120, width: 120 },
  userName: {
    color: '#344356',
    fontWeight: 500,
    paddingTop: 50,
    marginLeft: 25,
  },
  editBtn: {
    marginTop: 50,
    marginRight: 20,
    color: '#1665D8',
    '&:hover': {
      color: '#1665D8',
    },
    // marginRight: 40,
    // backgroundColor: '#1665D8',
    // '&:hover': {
    //   backgroundColor: '#1665D8',
    // },
  },
  actionWrapper: { paddingLeft: 180, paddingBottom: 0, marginBottom: 0 },
  actionBtnActive: {
    paddingBottom: 10,
    letterSpacing: '.5px',
    color: '#344356',
    borderRadius: 0,
    transition: 'all .2s ease',
    borderBottom: '3px solid #1665D8',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#344356',
      borderBottom: '3px solid #1665D8',
    },
  },
  actionBtnHover: {
    paddingBottom: 10,
    letterSpacing: '.5px',
    color: '#344356',
    borderRadius: 0,
    transition: 'all .2s ease',
    borderBottom: '3px solid transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#344356',
      borderBottom: '3px solid #C9DBF6',
    },
  },
});

const UserProfileContainer = ({ auth: { user }, userProfile }) => {
  const classes = useStyles();
  const [profileSection, setProfileSection] = useState('DETAILS');

  const coverPhoto = () => {
    let imageStr = ``;
    if (userProfile !== null) {
      imageStr = `data:image/jpeg;base64, ${userProfile.coverPhoto}`;
    }
    return (
      <CardMedia
        className={classes.media}
        image={imageStr}
        // title='Contemplative Reptile'
      />
    );
  };

  const userAvatar = () => {
    let imageStr = ``;
    if (userProfile !== null) {
      imageStr = `data:image/jpeg;base64, ${userProfile.profilePicture}`;
    }
    // console.log('imageStr', imageStr);
    return (
      <Avatar
        alt={user && user.name}
        src={imageStr}
        className={classes.avatar}
      />
    );
  };

  const showProfileSection = () => {
    switch (profileSection) {
      case 'DETAILS':
        return (
          <Fragment>
            <UserDetails profile={userProfile} />
          </Fragment>
        );
      case 'POSTS':
        return (
          <Fragment>
            <UserPosts />
          </Fragment>
        );
      default:
        return 'You found me 🤖';
    }
  };

  return (
    <div className={classes.profileContainer}>
      <Grid container spacing={1} justify='center'>
        <Grid item xs={10}>
          {/* HEADER START*/}
          <Card className={classes.root} variant='outlined'>
            {/* COVER PHOTO */}
            {coverPhoto()}
            <div className={classes.userDetailsWrapper}>
              {/* USER AVATAR, NAME % EDIT BTN*/}
              <div className={classes.userDetails}>
                {userAvatar()}
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h3'
                  className={classes.userName}>
                  {user && user.name}
                </Typography>
              </div>
              <IconButton
                className={classes.editBtn}
                color='primary'
                aria-label='Edit profile'>
                <EditIcon />
              </IconButton>
              {/* <Button
                variant='contained'
                className={classes.editBtn}
                endIcon={<EditIcon />}>
                Edit Profile
              </Button> */}
            </div>
            {/* <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                Lizard
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent> */}

            <CardActions className={classes.actionWrapper}>
              <Button
                disableRipple
                onClick={() => setProfileSection('DETAILS')}
                size='small'
                color='primary'
                className={
                  profileSection === 'DETAILS'
                    ? classes.actionBtnActive
                    : classes.actionBtnHover
                }>
                My Details
              </Button>
              <Button
                disableRipple
                onClick={() => setProfileSection('POSTS')}
                size='small'
                color='primary'
                className={
                  profileSection === 'POSTS'
                    ? classes.actionBtnActive
                    : classes.actionBtnHover
                }>
                My Posts
              </Button>
            </CardActions>
          </Card>
          {/* DISPLAY PROFILE SECTION */}
          {showProfileSection()}
        </Grid>
      </Grid>
    </div>
  );
};
UserProfileContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  userProfile: state.profile.userProfile,
});

export default connect(mapStateToProps)(UserProfileContainer);

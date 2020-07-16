import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profileActions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Fade from '@material-ui/core/Fade';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { FiEdit } from 'react-icons/fi';
import UserPosts from '../components/UserPosts';
import UserDetails from '../components/UserDetails';
import UserConnect from '../components/UserConnect';

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
    color: '#3E3F42',
    fontWeight: 500,
    paddingTop: 70,
    marginLeft: 25,
  },
  // editBtn: {
  //   marginTop: 50,
  //   marginRight: 20,
  //   color: '#1665D8',
  //   '&:hover': {
  //     color: '#1665D8',
  //   },
  // },
  editBtn: {
    letterSpacing: 0.5,
    marginBottom: 50,
    marginRight: 20,
    backgroundColor: 'rgba(22,101,216,.65)',
    '&:hover': {
      backgroundColor: 'rgba(22,101,216,.65)',
    },
  },
  actionWrapper: { paddingLeft: 180, paddingBottom: 0, marginBottom: 0 },
  actionBtnActive: {
    paddingBottom: 10,
    letterSpacing: '.5px',
    color: '#3E3F42',
    borderRadius: 0,
    transition: 'all .2s ease',
    borderBottom: '3px solid #1665D8',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#3E3F42',
      borderBottom: '3px solid #1665D8',
    },
  },
  actionBtnHover: {
    paddingBottom: 10,
    letterSpacing: '.5px',
    color: '#88898B',
    borderRadius: 0,
    transition: 'all .2s ease',
    borderBottom: '3px solid transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#3E3F42',
      borderBottom: '3px solid #C9DBF6',
    },
  },
  infoContainer: { display: 'flex', alignItems: 'center', marginLeft: 25 },
  iconWrapper: {
    backgroundColor: '#fff',
    border: '1px solid #BCBDC1',
    height: 20,
    width: 20,
    marginRight: 8,
  },
  titleIcon: {
    color: '#BCBDC1',
    fontSize: 14,
  },
  locationDetail: {
    marginRight: 8,
  },
  item: { display: 'flex', alignItems: 'center', margin: '10px 10px 0 0' },
});

const UserProfileContainer = ({
  auth: { user },
  userProfile,
  setEdit,
  getCurrentProfile,
}) => {
  const classes = useStyles();
  const [profileSection, setProfileSection] = useState('ABOUT');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getCurrentProfile();
  }, []);
  useEffect(() => {
    if (profile !== userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

  const showProfileSection = () => {
    switch (profileSection) {
      case 'ABOUT':
        return (
          <Fragment>
            <UserDetails profile={userProfile} />
          </Fragment>
        );
      case 'CONNECT':
        return (
          <Fragment>
            <UserConnect profile={userProfile} user={user} />
          </Fragment>
        );
      case 'POSTS':
        return (
          <Fragment>
            <UserPosts profile={profile} />
          </Fragment>
        );
      default:
        return 'You found me 🤖';
    }
  };

  return (
    <div>
      {/* HEADER START*/}
      <Fade in={true} timeout={600}>
        <Card className={classes.root} variant='outlined'>
          {/* COVER PHOTO */}
          <CardMedia
            className={classes.media}
            image={
              userProfile.coverPhoto !== null &&
              userProfile.coverPhoto.url &&
              userProfile.coverPhoto.url
            }
          />
          <div className={classes.userDetailsWrapper}>
            {/* USER AVATAR, NAME % EDIT BTN*/}
            <div className={classes.userDetails}>
              <Avatar
                alt={user && user.name}
                src={
                  userProfile.profilePicture.url &&
                  userProfile.profilePicture.url
                }
                className={classes.avatar}
              />
              <div>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h3'
                  className={classes.userName}>
                  {user && user.name}
                </Typography>
              </div>
            </div>
            {/* <IconButton
              onClick={setEdit}
              className={classes.editBtn}
              color='primary'
              aria-label='Edit profile'>
              <EditIcon />
            </IconButton> */}
            <Button
              disableElevation
              color='primary'
              variant='contained'
              className={classes.editBtn}
              onClick={setEdit}
              startIcon={<FiEdit />}>
              Edit Profile
            </Button>
          </div>
          {/* PROFILE SELECTION BUTTONS */}
          <CardActions className={classes.actionWrapper}>
            <Button
              disableRipple
              onClick={() => setProfileSection('ABOUT')}
              size='small'
              color='primary'
              className={
                profileSection === 'ABOUT'
                  ? classes.actionBtnActive
                  : classes.actionBtnHover
              }>
              About Me
            </Button>
            <Button
              disableRipple
              onClick={() => setProfileSection('CONNECT')}
              size='small'
              color='primary'
              className={
                profileSection === 'CONNECT'
                  ? classes.actionBtnActive
                  : classes.actionBtnHover
              }>
              Connect
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
      </Fade>
      {/* DISPLAY SELECTED PROFILE SECTION */}
      {showProfileSection()}
    </div>
  );
};
UserProfileContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  userProfile: state.profile.userProfile,
});

export default connect(mapStateToProps, { getCurrentProfile })(
  UserProfileContainer
);

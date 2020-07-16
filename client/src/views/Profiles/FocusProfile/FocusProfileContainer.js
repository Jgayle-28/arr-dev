import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getProfileById } from '../../../redux/actions/profileActions';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import UserDetails from '../components/UserDetails';
import UserConnect from '../components/UserConnect';
import UserPosts from '../components/UserPosts';
import Spinner from '../../../components/Spinner';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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
  editBtn: {
    marginTop: 50,
    marginRight: 20,
    color: '#1665D8',
    '&:hover': {
      color: '#1665D8',
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
  userCard: { position: 'relative' },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#1665D8',
    margin: 10,
    '&:hover': {
      backgroundColor: '#1665D8',
    },
  },
});

const FocusProfileContainer = ({
  profile: { loading },
  focusProfile,
  getProfileById,
  match,
  history,
}) => {
  const classes = useStyles();
  const [profileSection, setProfileSection] = useState('ABOUT');

  useEffect(() => {
    // Gets id from id in url
    getProfileById(match.params.id);
  }, [getProfileById]);

  const goBackClick = () => {
    history.goBack();
  };

  const showProfileSection = () => {
    switch (profileSection) {
      case 'ABOUT':
        return (
          <Fragment>
            <UserDetails profile={focusProfile} />
          </Fragment>
        );
      case 'CONNECT':
        return (
          <Fragment>
            <UserConnect profile={focusProfile} user={focusProfile.user} />
          </Fragment>
        );
      case 'POSTS':
        return (
          <Fragment>
            <UserPosts profile={focusProfile} focusProfile />
          </Fragment>
        );
      default:
        return 'You found me 🤖';
    }
  };

  return (
    <div>
      {focusProfile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* HEADER START*/}
          <Fade in={true} timeout={600}>
            <Card className={classes.userCard} variant='outlined'>
              <Fab
                size='small'
                color='primary'
                aria-label='go back'
                onClick={goBackClick}
                className={classes.backButton}>
                <ChevronLeftIcon />
              </Fab>
              {/* COVER PHOTO */}
              <CardMedia
                className={classes.media}
                image={focusProfile && focusProfile.coverPhoto.url}
                // title='Contemplative Reptile'
              />
              <div className={classes.userDetailsWrapper}>
                {/* USER AVATAR, NAME % EDIT BTN*/}
                <div className={classes.userDetails}>
                  <Avatar
                    alt={focusProfile && focusProfile.user.name}
                    src={focusProfile && focusProfile.profilePicture.url}
                    className={classes.avatar}
                  />
                  <div>
                    <Typography
                      gutterBottom
                      variant='h5'
                      component='h3'
                      className={classes.userName}>
                      {focusProfile && focusProfile.user.name}
                    </Typography>
                  </div>
                </div>
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
                  About
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
                  Posts
                </Button>
              </CardActions>
            </Card>
          </Fade>
          {/* DISPLAY SELECTED PROFILE SECTION */}
          {showProfileSection()}
        </Fragment>
      )}
    </div>
  );
};
FocusProfileContainer.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  focusProfile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  focusProfile: state.profile.focusProfile,
});

export default connect(mapStateToProps, { getProfileById })(
  FocusProfileContainer
);

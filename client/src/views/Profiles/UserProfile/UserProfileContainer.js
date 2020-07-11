import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profileActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Fade from '@material-ui/core/Fade';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import UserPosts from '../components/UserPosts';
import UserDetails from '../components/UserDetails';
import UserConnect from '../components/UserConnect';
import { FaMobileAlt } from 'react-icons/fa';
import { IoMdGlobe, IoIosMail } from 'react-icons/io';

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
    // marginRight: 8 ,
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

  useEffect(() => {
    // getCurrentProfile();
  }, []);

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
            <UserPosts />
          </Fragment>
        );
      default:
        return 'You found me 🤖';
    }
  };

  return (
    <div>
      {/* <div className={classes.profileContainer}> */}
      {/*<Grid container spacing={1} justify='center'>
        <Grid item xs={10}> */}
      {/* HEADER START*/}
      <Fade in={true} timeout={600}>
        <Card className={classes.root} variant='outlined'>
          {/* COVER PHOTO */}
          {coverPhoto()}
          <div className={classes.userDetailsWrapper}>
            {/* USER AVATAR, NAME % EDIT BTN*/}
            <div className={classes.userDetails}>
              {userAvatar()}
              <div>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h3'
                  className={classes.userName}>
                  {user && user.name}
                </Typography>
                {/* LOCATION */}
                {/* <div className={classes.infoContainer}>
                      <Avatar className={classes.iconWrapper}>
                        <IoMdGlobe className={classes.titleIcon} />
                      </Avatar>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                        className={classes.detailText}>
                        <span className={classes.locationDetail}>
                          <b>City: </b>
                          {userProfile && userProfile.city}
                        </span>
                        <span className={classes.locationDetail}>
                          <b>State: </b>
                          {userProfile && userProfile.state}
                        </span>
                        <span className={classes.locationDetail}>
                          <b>Country: </b>
                          {userProfile && userProfile.country}
                        </span>
                      </Typography>
                    </div> */}
              </div>
            </div>
            <IconButton
              onClick={setEdit}
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
      {/* //   </Grid>
      // </Grid> */}
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

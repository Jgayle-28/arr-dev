import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { FaScroll } from 'react-icons/fa';
import { TiInfoLarge } from 'react-icons/ti';
import {
  IoMdGlobe,
  IoIosPhonePortrait,
  IoIosBookmarks,
  IoIosLink,
} from 'react-icons/io';
import { GoInfo } from 'react-icons/go';

const useStyles = makeStyles({
  detailWrapper: {
    marginTop: 20,
  },
  header: { borderBottom: '1px solid #E4E4E4' },
  sectionContainer: { width: '50%' },
  sectionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    color: '#3E3F42', //8E9CB7
  },
  title: { color: '#3E3F42', fontWeight: 500, letterSpacing: '.7px' },
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

  detailText: { paddingBottom: 10 },
  locationDetail: {
    marginRight: 8,
  },
  infoText: { color: '#848484', margin: 0, paddingBottom: 10 },
});

const UserDetailContainer = ({ profile }) => {
  console.log('profile', profile);
  const classes = useStyles();

  return (
    <Fade in={true} timeout={600}>
      <Card className={classes.detailWrapper} variant='outlined'>
        <CardHeader
          className={classes.header}
          title='About Me'
          // subheader="September 14, 2016"
        />
        <CardContent>
          {/* LOCATION */}

          <div className={classes.sectionTitleWrapper}>
            <Avatar className={classes.iconWrapper}>
              <IoMdGlobe className={classes.titleIcon} />
            </Avatar>
            <p className={classes.title}>Location</p>
          </div>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.detailText}>
            <span className={classes.locationDetail}>
              <b>City: </b>
              {profile && profile.city}
            </span>
            <span className={classes.locationDetail}>
              <b>State: </b>
              {profile && profile.state}
            </span>
            <span className={classes.locationDetail}>
              <b>Country: </b>
              {profile && profile.country}
            </span>
          </Typography>
          <Divider />

          {/* BIO */}
          <div>
            <div className={classes.sectionTitleWrapper}>
              <Avatar className={classes.iconWrapper}>
                <TiInfoLarge className={classes.titleIcon} />
              </Avatar>
              {/* <FaScroll className={classes.titleIcon} /> */}
              <p className={classes.title}>Bio</p>
            </div>
            <p className={classes.infoText}>{profile && profile.about}</p>
            <Divider />
          </div>
          {/* Favorite Verse */}
          <div>
            <div className={classes.sectionTitleWrapper}>
              <Avatar className={classes.iconWrapper}>
                <FaScroll
                  className={classes.titleIcon}
                  style={{ fontSize: 12 }}
                />
              </Avatar>
              <p className={classes.title}>Favorite Bible Verse</p>
            </div>
            <p className={classes.infoText}>
              {profile && profile.favoriteVerse}
            </p>
            <Divider />
          </div>
          {/* Favorite Book */}
          <div>
            <div className={classes.sectionTitleWrapper}>
              <Avatar className={classes.iconWrapper}>
                <IoIosBookmarks
                  className={classes.titleIcon}
                  style={{ fontSize: 12 }}
                />
              </Avatar>
              <p className={classes.title}>Favorite Book Of The Bible</p>
            </div>
            <p className={classes.infoText}>
              {profile && profile.favoriteBook}
            </p>
          </div>

          {/* <div className={classes.sectionContainer}>
            <div className={classes.sectionTitleWrapper}>
              <Avatar className={classes.iconWrapper}>
                <IoIosLink className={classes.titleIcon} />
              </Avatar>
              <p className={classes.title}>Connect</p>
            </div>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              className={classes.detailText}>
              {profile && profile.phone}
            </Typography>
            <Divider />
          </div> */}

          {/* <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant='h5' component='h2'>
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            adjective
          </Typography>
          <Typography variant='body2' component='p'>
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>*/}
        </CardContent>
        {/*   <CardActions>
          <Button size='small'>Learn More</Button>
        </CardActions> */}
      </Card>
    </Fade>
  );
};

export default UserDetailContainer;

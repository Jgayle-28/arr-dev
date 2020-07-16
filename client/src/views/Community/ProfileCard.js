import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../redux/actions/profileActions';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IoMdGlobe } from 'react-icons/io';

const useStyles = makeStyles({
  profileCard: { cursor: 'pointer' },
  cardContainer: {
    display: 'flex',
  },
  avatar: {
    width: 65,
    height: 65,
    marginRight: 15,
  },
  userName: { color: '#3E3F42', letterSpacing: 0.5 },
  infoContainer: { display: 'flex', alignItems: 'flex-start', marginTop: 5 },
  iconWrapper: {
    backgroundColor: '#fff',
    border: '1px solid #BCBDC1',
    height: 20,
    width: 20,
    marginTop: 3,
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
  userWrapper: { display: 'flex', flexDirection: 'column' },
});

const ProfileCard = ({ profile, history }) => {
  console.log('profile', profile);
  const classes = useStyles();

  const handleCardClick = () => {
    history.push(`/user-profile/${profile.user._id}`);
  };
  return (
    <Fragment>
      {profile && (
        <Card
          variant='outlined'
          className={classes.profileCard}
          onClick={handleCardClick}>
          <CardContent className={classes.cardContainer}>
            <Avatar
              alt={profile.user && profile.user.name}
              src={profile && profile.profilePicture.url}
              className={classes.avatar}
            />
            <div className={classes.userWrapper}>
              {/* User Name */}
              <Typography variant='h5' className={classes.userName}>
                {profile.user && profile.user.name}
              </Typography>
              {/* User Location */}
              {(profile.city && profile.city.length > 0) ||
              (profile.state && profile.state.length > 0) ||
              (profile.country && profile.country.length > 0) ? (
                <div className={classes.infoContainer}>
                  <Avatar className={classes.iconWrapper}>
                    <IoMdGlobe className={classes.titleIcon} />
                  </Avatar>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    className={classes.detailText}>
                    {/* City */}
                    {profile.city && (
                      <span className={classes.locationDetail}>
                        <b>City: </b>
                        {profile.city}
                      </span>
                    )}
                    {/* State */}
                    {profile.state && (
                      <span className={classes.locationDetail}>
                        <b>State: </b>
                        {profile.state}
                      </span>
                    )}
                    {/* Country */}
                    {profile.country && (
                      <span className={classes.locationDetail}>
                        <b>Country: </b>
                        {profile.country}
                      </span>
                    )}
                  </Typography>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
};
ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { getProfileById })(ProfileCard));

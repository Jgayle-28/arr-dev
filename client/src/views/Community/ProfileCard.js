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
  cardContainer: {
    display: 'flex',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  userName: { color: '#3E3F42', letterSpacing: 0.5 },
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

const ProfileCard = ({ profile, getProfileById }) => {
  const classes = useStyles();
  return (
    <Fragment>
      {profile && (
        <Card variant='outlined'>
          <CardContent className={classes.cardContainer}>
            <Avatar
              alt={profile.user && profile.user.name}
              src=''
              className={classes.avatar}
            />
            <Typography variant='h5' className={classes.userName}>
              {profile.user && profile.user.name}
            </Typography>
            <div className={classes.infoContainer}>
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
                  {profile.city && profile.city}
                </span>
                <span className={classes.locationDetail}>
                  <b>State: </b>
                  {profile.state && profile.state}
                </span>
                <span className={classes.locationDetail}>
                  <b>Country: </b>
                  {profile.country && profile.country}
                </span>
              </Typography>
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

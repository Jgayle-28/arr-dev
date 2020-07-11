import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/actions/profileActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileCard from './ProfileCard';
import Spinner from '../../components/Spinner';

const useStyles = makeStyles({
  communityContainer: {
    flexGrow: 1,
  },
});

const CommunityContainer = ({
  profile: { profiles, loading },
  getProfiles,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfiles();
  }, []);

  console.log('PROFILES', profiles);

  return (
    <div className={classes.communityContainer}>
      <h1 style={{ textAlign: 'center' }}>Community</h1>
      <Grid container spacing={2}>
        {loading ? (
          <Spinner />
        ) : (
          profiles.length > 0 &&
          profiles.map((profile, i) => (
            <Grid item xs={4} key={i}>
              <ProfileCard profile={profile} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};
CommunityContainer.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(CommunityContainer);

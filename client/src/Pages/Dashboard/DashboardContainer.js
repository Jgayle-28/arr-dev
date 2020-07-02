import React, { useEffect } from 'react';
import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import NavBar from '../../components/NavBar';
import LeftNav from '../../components/LeftNav';

const DashboardContainer = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <div>
      <NavBar />
      <LeftNav />
      {profile && profile !== null ? (
        <div>
          <h1>has profile</h1>
        </div>
      ) : (
        <div>
          <h1>has no profile</h1>
        </div>
      )}
    </div>
  );
};
DashboardContainer.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(
  DashboardContainer
);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import Modal from '../../components/Modal';

const HomeContainer = (props) => {
  const { userProfile } = props;
  // useEffect(() => {
  //   getCurrentProfile();
  // }, []);
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>HOME</h1>
      {/* {userProfile && userProfile !== null && <Modal />} */}
    </div>
  );
};
HomeContainer.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  // userProfile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  userProfile: state.profile.userProfile,
});
export default connect(mapStateToProps)(HomeContainer);

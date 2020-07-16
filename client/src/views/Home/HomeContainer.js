import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
// import Modal from '../../components/Modal';
import CreatePostForm from '../../components/Posts/components/CreatePostForm';
import Posts from '../../components/Posts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const HomeContainer = (props) => {
  const classes = useStyles();
  const { userProfile } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify='center'>
        <Grid item xs={8}>
          <CreatePostForm />
          <Posts />
        </Grid>
      </Grid>
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

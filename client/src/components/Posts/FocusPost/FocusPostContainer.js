import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../../redux/actions/postsActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PostCard from '../components/PostCard';
import ReplyForm from '../components/ReplyForm';
import PostComments from '../components/PostComments';
import Spinner from '../../Spinner';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backButton: {
    backgroundColor: '#1665D8',
    margin: 10,
    '&:hover': {
      backgroundColor: '#1665D8',
    },
  },
  cardHeader: { borderBottom: '1px solid #EAEDF3' },
}));

const FocusPostContainer = ({
  posts: { focusPost, loading },
  getPost,
  history,
  match,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getPost(match.params.id);
  }, []);

  const goBackClick = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Fab
        size='small'
        color='primary'
        aria-label='go back'
        onClick={goBackClick}
        className={classes.backButton}>
        <ChevronLeftIcon />
      </Fab>
      <Grid container spacing={1} justify='center'>
        {loading || focusPost === null ? (
          <Spinner />
        ) : (
          <Grid item xs={8}>
            {/* POST DETAILS / CARD */}
            <PostCard post={focusPost} focusPost />
            <Card variant='outlined'>
              {/* REPLY FORM */}
              <CardHeader
                className={classes.cardHeader}
                title={<ReplyForm />}
              />
              <CardContent>Comments Here</CardContent>
              {/* POST COMMENTS */}
              <PostComments />
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
FocusPostContainer.propTypes = {
  posts: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
  userProfile: state.profile.userProfile,
});

export default connect(mapStateToProps, { getPost })(FocusPostContainer);

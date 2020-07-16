import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/postsActions';
import Spinner from '../Spinner';
import PostCard from './components/PostCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const PostsContainer = ({ posts: { userPosts, loading }, getPosts }) => {
  const classes = useStyles();
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {userPosts &&
            userPosts.map((post, i) => <PostCard post={post} key={i} />)}
        </Fragment>
      )}
    </div>
  );
};
PostsContainer.propTypes = {
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(PostsContainer);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import PostCard from '../../../../components/Posts/components/PostCard';

const useStyles = makeStyles((theme) => ({
  postsContainer: {
    marginTop: 20,
    flexGrow: 1,
  },
}));

const UserPostsContainer = ({ profile }) => {
  const classes = useStyles();
  return (
    <div className={classes.postsContainer}>
      <Fade in={true} timeout={600}>
        <Grid container spacing={1} justify='center'>
          {profile &&
            profile.userPosts.map((post, i) => (
              <Grid item xs={10} key={i}>
                <PostCard post={post} />
              </Grid>
            ))}
        </Grid>
      </Fade>
    </div>
  );
};

export default UserPostsContainer;

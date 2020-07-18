import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import placeholder from '../../../../assets/img/placeholders/postPlaceholder.svg';
import noPosts from '../../../../assets/img/placeholders/noPosts.png';
import PostCard from '../../../../components/Posts/components/PostCard';

const useStyles = makeStyles((theme) => ({
  postsContainer: {
    marginTop: 20,
    flexGrow: 1,
  },
  image: { marginTop: 20 },
  text: { textAlign: 'center', letterSpacing: 0.7 },
}));

const UserPostsContainer = ({ profile, focusProfile }) => {
  const classes = useStyles();
  return (
    <div className={classes.postsContainer}>
      <Fade in={true} timeout={600}>
        <Grid container spacing={1} justify='center'>
          {profile && profile.userPosts.length > 0 ? (
            profile.userPosts.map((post, i) => (
              <Grid item xs={10} key={i}>
                <PostCard post={post} focusProfile />
              </Grid>
            ))
          ) : (
            <div>
              <img src={noPosts} alt='no posts' className={classes.image} />
              <Typography
                gutterBottom
                variant='h5'
                component='h3'
                color='textSecondary'
                className={classes.text}>
                {focusProfile
                  ? 'User Has Not Posted anything yet'
                  : 'You Currently have No Posts'}
              </Typography>
            </div>
          )}
        </Grid>
      </Fade>
    </div>
  );
};

export default UserPostsContainer;

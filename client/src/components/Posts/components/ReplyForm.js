import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addPostComment } from '../../../redux/actions/postsActions';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { FaPaperPlane } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    flexGrow: 1,
  },
  avatar: { marginRight: 10 },
  input: { width: '70%' },
  sendBtn: { marginLeft: 'auto' },
  sendBtnIcon: { fontSize: 16 },
}));

const PostForm = ({
  postId,
  posts: { focusPost },
  auth,
  userProfile,
  addPostComment,
}) => {
  const classes = useStyles();
  const [text, setText] = useState('');

  const handleSubmit = () => {
    addPostComment(postId, { text });
    setText('');
  };
  return (
    <div className={classes.formWrapper}>
      <Grid container spacing={1} alignItems='flex-start'>
        <Grid item xs={1}>
          <Avatar
            alt={auth.user && auth.user.name}
            src={userProfile && userProfile.profilePicture.url}
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            onChange={(e) => setText(e.target.value)}
            value={text}
            fullWidth
            multiline
            placeholder='Comment...'
            InputProps={{ disableUnderline: true }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label='settings' onClick={handleSubmit}>
            <FaPaperPlane className={classes.sendBtnIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
PostForm.propTypes = {
  postId: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  addPostComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  userProfile: state.profile.userProfile,
  posts: state.posts,
});

export default connect(mapStateToProps, { addPostComment })(PostForm);

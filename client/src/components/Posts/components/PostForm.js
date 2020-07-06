import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { FaPaperPlane } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    // display: 'flex',
    // alignItems: 'flex-end',
    flexGrow: 1,
  },
  avatar: { marginRight: 10 },
  input: { width: '70%' },
  sendBtn: { marginLeft: 'auto' },
  sendBtnIcon: { fontSize: 16 },
}));

const PostForm = () => {
  const classes = useStyles();
  return (
    <div className={classes.formWrapper}>
      <Grid container spacing={1} alignItems='flex-end'>
        <Grid item xs={1}>
          <Avatar
            alt='Remy Sharp'
            src='/static/images/avatar/1.jpg'
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            placeholder='Your Comment...'
            InputProps={{ disableUnderline: true }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label='settings'>
            <FaPaperPlane className={classes.sendBtnIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostForm;

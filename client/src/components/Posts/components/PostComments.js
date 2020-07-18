import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { deletePostComment } from '../../../redux/actions/postsActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
// import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import { FaFeatherAlt } from 'react-icons/fa';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BackspaceIcon from '@material-ui/icons/Backspace';
import placeholder from '../../../assets/img/placeholders/commentBubbles.svg';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  postCommentWrapper: {
    width: '100%',
    marginLeft: 0,
    backgroundColor: theme.palette.background.paper,
  },
  postItem: { marginLeft: 0, paddingLeft: 0 },
  inline: {
    display: 'inline',
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
    fontSize: 14,
  },
  userName: { marginRight: 15, color: '#3E3F42' },
  menuText: { color: '#A5A5A7' },
  image: { marginTop: 20, margin: 'auto', display: 'block' },
  text: { textAlign: 'center', letterSpacing: 0.7, marginTop: 20 },
}));

const PostComments = ({ auth, posts: { focusPost }, deletePostComment }) => {
  const classes = useStyles();

  const getCommentHeader = (name, date) => (
    <div className={classes.headerWrapper}>
      <b className={classes.userName}>{name}</b>
      <span style={{ color: '#6B6C6F' }}>
        <FaFeatherAlt style={{ marginRight: 5 }} />
        <Moment format='YYYY/DD/MM @ hh:mm A'>
          <small>{date}</small>
        </Moment>
      </span>
    </div>
  );

  const handleDeleteClick = (commentId, popupState) => {
    const postId = focusPost._id;
    deletePostComment(postId, commentId);
    popupState.close();
  };

  return (
    <List className={classes.postCommentWrapper}>
      {focusPost && focusPost.comments.length > 0 ? (
        focusPost.comments.map((comment, i) => (
          <Fragment key={i}>
            <ListItem alignItems='flex-start' className={classes.postItem}>
              <ListItemAvatar>
                <Link to={`/user-profile/${comment.user}`}>
                  <Avatar
                    alt={comment.name}
                    src={comment.profile.profilePicture.url}
                  />
                </Link>
              </ListItemAvatar>
              <ListItemText
                primary={getCommentHeader(comment.name, comment.date)}
                secondary={<Fragment>{comment.text}</Fragment>}
              />
              {!auth.loading && comment.user === auth.user._id && (
                <ListItemSecondaryAction>
                  <PopupState variant='popover' popupId='demo-popup-menu'>
                    {(popupState) => (
                      <React.Fragment>
                        <IconButton
                          aria-label='settings'
                          {...bindTrigger(popupState)}>
                          <MoreHorizIcon />
                        </IconButton>
                        <Menu
                          {...bindMenu(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}>
                          <MenuItem
                            onClick={() =>
                              handleDeleteClick(comment._id, popupState)
                            }>
                            <ListItemIcon>
                              <BackspaceIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText
                              primary='Delete Comment'
                              className={classes.menuText}
                            />
                          </MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            {/* <Divider variant='inset' component='li' /> */}
          </Fragment>
        ))
      ) : (
        <div>
          <img src={placeholder} alt='no comments' className={classes.image} />
          <Typography
            gutterBottom
            variant='h5'
            component='h3'
            color='textSecondary'
            className={classes.text}>
            No Comments Yet
          </Typography>
        </div>
      )}
    </List>
  );
};
PostComments.propTypes = {
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePostComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

export default withRouter(
  connect(mapStateToProps, { deletePostComment })(PostComments)
);

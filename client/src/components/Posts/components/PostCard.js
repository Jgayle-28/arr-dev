import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  likePost,
  unLikePost,
  deletePost,
} from '../../../redux/actions/postsActions';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Moment from 'react-moment';
import ReplyForm from './ReplyForm';
import deleteCloudinaryImage from '../../..//utils/deleteCloudinaryImage';
// Icons
// import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BackspaceIcon from '@material-ui/icons/Backspace';
import {
  FaCommentDots,
  FaRegComment,
  FaPrayingHands,
  FaChild,
  FaFeatherAlt,
} from 'react-icons/fa';
import { FiLink2 } from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
  postCardWrapper: {
    margin: '25px 0',
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    height: 50,
    width: 50,
  },
  actionWrapper: {
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #EAEDF3',
    borderTop: '1px solid #EAEDF3',
  },
  actionWrapperFocus: {
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px solid #EAEDF3',
  },
  actionBtn: {
    color: '#3E3F42',
    letterSpacing: '.5px',
    margin: '0 20px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  actionBtnIcon: { color: '#6B6C6F' },
  actionBtnIconActive: { color: '#EC7A6A' },
  postLikes: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 4px',
    borderRadius: 8,
    // height: 20,
    // width: 20,
    // padding: 2,
    // borderRadius: '50%',
    // border: '2px solid #fff',
    background: '#E6492D',
    color: '#fff',
    fontSize: 10,
    margin: '-10px -10px 0 0',
    zIndex: 999,
  },
  numOfComments: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 4px',
    borderRadius: 8,
    background: '#6B6C6F',
    color: '#fff',
    fontSize: 10,
    margin: '-10px -8px 0 0',
    zIndex: 999,
  },
  menuText: { color: '#A5A5A7' },
  linkWrapper: {
    color: '#848484',
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
}));

const getPostTitle = (name, date) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
    <b style={{ marginRight: 15, color: '#3E3F42' }}>{name}</b>
    <span style={{ color: '#6B6C6F' }}>
      {/* <b style={{ marginRight: 5 }}>Posted: </b> */}
      <FaFeatherAlt style={{ marginRight: 5 }} />
      <Moment format='YYYY/DD/MM @ hh:mm A'>{date}</Moment>
    </span>
  </div>
);

const getPostType = (type) => {
  switch (type) {
    case 'PRAYER_REQ':
      return (
        <Chip
          size='small'
          icon={<FaPrayingHands style={{ marginLeft: 10 }} />}
          label='Prayer Request'
          color='secondary'
        />
      );
    case 'PRAISE_REP':
      return (
        <Chip
          size='small'
          icon={<FaChild style={{ marginLeft: 10, height: 14 }} />}
          label='Praise Report'
          color='primary'
        />
      );
    case 'GENERAL':
      return (
        <Chip
          size='small'
          icon={<FaCommentDots style={{ marginLeft: 10 }} />}
          label='General'
        />
      );
    default:
      break;
  }
};

const PostCard = ({
  auth,
  post,
  likePost,
  unLikePost,
  deletePost,
  history,
  focusPost,
  profile: { focusProfile },
}) => {
  const classes = useStyles();
  const [userHasLiked, setUserHasLiked] = useState(false);

  console.log('POST', post);

  useEffect(() => {
    post.likes.map((like) =>
      like.user === auth.user._id
        ? setUserHasLiked(true)
        : setUserHasLiked(false)
    );
  }, [post.likes]);

  const handleLikeClick = (postId) => {
    if (!userHasLiked) {
      if (focusProfile !== null) {
        likePost(postId, focusProfile.user._id);
      } else {
        likePost(postId);
      }
    } else {
      if (focusProfile !== null) {
        unLikePost(postId, focusProfile.user._id);
      } else {
        unLikePost(postId);
      }
      // unLikePost(postId);
      setUserHasLiked(false);
    }
  };

  const handleDeleteClick = (post, popupState) => {
    if (post.postImage) {
      deleteCloudinaryImage(post.postImage.public_id);
    }
    deletePost(post._id);
    popupState.close();
  };

  const handleCommentsClick = (postId) => {
    history.push(`/user-post/${postId}`);
  };

  return (
    <Card className={classes.postCardWrapper} variant='outlined'>
      <CardHeader
        avatar={
          <Link to={`/user-profile/${post.user}`}>
            <Avatar
              alt={post && post.name}
              src={post.profile && post.profile.profilePicture.url}
              className={classes.avatar}
            />
          </Link>
        }
        action={
          !auth.loading && post.user === auth.user._id ? (
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
                      onClick={() => handleDeleteClick(post, popupState)}>
                      <ListItemIcon>
                        <BackspaceIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText
                        primary='Delete Post'
                        className={classes.menuText}
                      />
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          ) : null
        }
        title={getPostTitle(post.name, post.date)}
        subheader={getPostType(post.postType)}
      />
      {/* Post image */}
      {post.postImage && (
        <CardMedia className={classes.media} image={post.postImage.url} />
      )}

      {/* POST TEXT */}
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.text}
        </Typography>
        {post.postLink && (
          <span className={classes.linkWrapper}>
            <FiLink2 style={{ marginRight: 8 }} />
            <a target='_blank' href={post.postLink}>
              {post.postLink}
            </a>
          </span>
        )}
      </CardContent>
      {/* ACTION BUTTONS */}
      <div
        className={
          !focusPost ? classes.actionWrapper : classes.actionWrapperFocus
        }>
        <Button
          disableRipple
          className={classes.actionBtn}
          onClick={() => handleLikeClick(post._id)}>
          {post.likes.length > 0 && (
            <span className={classes.postLikes}>{post.likes.length}</span>
          )}
          <FavoriteBorderIcon
            style={{ marginRight: 5 }}
            className={
              userHasLiked ? classes.actionBtnIconActive : classes.actionBtnIcon
            }
          />
          Like
        </Button>
        <Button
          disableRipple
          className={classes.actionBtn}
          onClick={() => handleCommentsClick(post._id)}>
          {post.comments.length > 0 && (
            <span className={classes.numOfComments}>
              {post.comments.length}
            </span>
          )}
          <FaRegComment
            className={classes.actionBtnIcon}
            style={{ fontSize: 21, marginRight: 5 }}
          />
          Comments
        </Button>
      </div>
      {/* {!focusPost && (
        <CardActions disableSpacing>
          <ReplyForm postId={post._id} />
        </CardActions>
      )} */}
    </Card>
  );
};
PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default withRouter(
  connect(mapStateToProps, { likePost, unLikePost, deletePost })(PostCard)
);

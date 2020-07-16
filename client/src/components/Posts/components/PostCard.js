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
import Collapse from '@material-ui/core/Collapse';
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
import { FiLink2, FiAtSign } from 'react-icons/fi';

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
      <Moment format='YYYY/MM hh:mm A'>{date}</Moment>
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
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [userHasLiked, setUserHasLiked] = useState(false);

  useEffect(() => {
    post.likes.map((like) =>
      like.user === auth.user._id
        ? setUserHasLiked(true)
        : setUserHasLiked(false)
    );
  }, [post.likes]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = (postId) => {
    if (!userHasLiked) {
      likePost(postId);
    } else {
      unLikePost(postId);
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
              alt={post.name}
              src={post.profile.profilePicture.url}
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
        <CardMedia
          className={classes.media}
          image={post.postImage.url}
          // title='Paella dish'
        />
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
          {/* Add conditional rendering for 'Liked' */}
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
      {!focusPost && (
        <CardActions disableSpacing>
          <ReplyForm />
        </CardActions>
      )}

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
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
});

export default withRouter(
  connect(mapStateToProps, { likePost, unLikePost, deletePost })(PostCard)
);

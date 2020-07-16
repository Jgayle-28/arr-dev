import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../redux/actions/postsActions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CustomButton from '../../../components/CustomButton';
import { FaCommentDots, FaPrayingHands, FaChild } from 'react-icons/fa';
import { FiCamera, FiCameraOff, FiExternalLink } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';
import uploadToCloudinary from '../../../utils/uploadToCloudinary';
import placeholder from '../../../assets/img/daniel-lg.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'none',
  },
  cardHeader: { padding: 8 },
  actions: {
    borderTop: '1px solid #E4E4E4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeBtn: { marginRight: 5 },
  selectBtn: { color: '#3E3F42', marginRight: 5 },
  deleteBtn: { color: '#FB8BB0', margin: '0 5px' },
  postTypeWrapper: { display: 'flex' },
  userTextWrapper: { display: 'flex', marginBottom: 15, width: '100%' },
  avatar: { marginRight: 15 },
  textInput: { width: '100%' },
  linkInput: {
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#C6C6C6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1665D8',
    },
  },
  imagePreview: { height: 250, width: '100%', borderRadius: 10 },
}));

const CreatePostForm = ({ auth: { user }, userProfile, addPost }) => {
  const classes = useStyles();
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [postLinkStatus, setPostLinkStatus] = useState(false);
  const [postLink, setPostLink] = useState('');
  const [postData, setPostData] = useState({
    text: '',
    postType: '',
  });

  const { text, postType } = postData;

  const resetForm = () => {
    setImagePreview(null);
    setPostLinkStatus(false);
    setPostLinkStatus(false);
    setPostLink('');
    setPostData({
      text: '',
      postType: '',
    });
  };

  const onChange = (e, name, type) => {
    // Changes post type
    if (name && name.length > 0) {
      setPostData({ ...postData, [name]: type });
    } else {
      // Sets post text
      setPostData({ ...postData, [e.target.name]: e.target.value });
    }
  };

  const handleImageSelect = async (e) => {
    let reader = new FileReader();
    let newFile = e.target.files[0];
    // Set Raw image file
    setImage(newFile);
    if (newFile) {
      reader.readAsDataURL(newFile);
    }
    // Set preview image
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const handlePostLinkStatus = () => {
    setPostLinkStatus((postLink) => !postLink);
  };

  const handleCreatePost = async () => {
    let formData = postData;

    if (postLink.length > 0) {
      formData.postLink = postLink;
    }
    if (imagePreview !== null) {
      // Upload to cloudinary
      const imageUrl = await uploadToCloudinary(image, 'POST_IMAGE');
      formData.postImage = imageUrl;
      console.log('IMAGE URL', imageUrl);
    }
    console.log('formData', formData);
    addPost(formData);
    resetForm();
  };

  return (
    <div>
      <Card variant='outlined'>
        <CardHeader
          className={classes.cardHeader}
          title={
            <div className={classes.postTypeWrapper}>
              <Button
                onClick={() => onChange('', 'postType', 'PRAYER_REQ')}
                className={
                  postType !== 'PRAYER_REQ'
                    ? classes.selectBtn
                    : classes.activeBtn
                }
                size='small'
                color={postType === 'PRAYER_REQ' ? 'primary' : ''}
                variant='outlined'
                component='span'
                startIcon={<FaPrayingHands />}>
                Prayer Request
              </Button>
              <Button
                onClick={() => onChange('', 'postType', 'PRAISE_REP')}
                className={
                  postType !== 'PRAISE_REP'
                    ? classes.selectBtn
                    : classes.activeBtn
                }
                color={postType === 'PRAISE_REP' ? 'primary' : ''}
                size='small'
                variant='outlined'
                component='span'
                startIcon={<FaChild />}>
                Praise Report
              </Button>
              <Button
                onClick={() => onChange('', 'postType', 'GENERAL')}
                className={
                  postType !== 'GENERAL' ? classes.selectBtn : classes.activeBtn
                }
                color={postType === 'GENERAL' ? 'primary' : ''}
                size='small'
                variant='outlined'
                component='span'
                startIcon={<FaCommentDots />}>
                General Post
              </Button>
            </div>
          }
        />
        <CardContent>
          {/* USER AVATAR AND TEXT */}
          <div className={classes.userTextWrapper}>
            <Avatar
              alt={user && user.name}
              src={userProfile && userProfile.profilePicture.url}
              className={classes.avatar}
            />
            <TextField
              value={text}
              name='text'
              onChange={(e) => onChange(e)}
              className={classes.textInput}
              id='standard-textarea'
              placeholder={`What is stirring inside you ${user.name}?`}
              multiline
              InputProps={{ disableUnderline: true }}
            />
          </div>
          {/* IMAGE PREVIEW */}
          {imagePreview !== null && (
            <img
              src={imagePreview}
              alt='post image'
              className={classes.imagePreview}
            />
          )}
          {postLinkStatus && (
            <TextField
              fullWidth
              value={postLink}
              placeholder='https://yourlink.com'
              id='outlined-size-small'
              variant='outlined'
              size='small'
              onChange={(e) => setPostLink(e.target.value)}
              className={classes.linkInput}
            />
          )}
        </CardContent>
        {/* POST ACTIONS */}
        <CardActions className={classes.actions}>
          <div>
            <input
              accept='image/*'
              onChange={(e) => handleImageSelect(e)}
              className={classes.input}
              id='contained-button-file'
              multiple
              type='file'
            />
            <label htmlFor='contained-button-file'>
              <Button
                className={classes.selectBtn}
                size='small'
                variant='outlined'
                component='span'
                startIcon={<FiCamera style={{ color: '#3E3F42' }} />}>
                {imagePreview !== null ? 'Change Image' : 'Select image'}
              </Button>
            </label>
            {imagePreview !== null && (
              <Button
                className={classes.deleteBtn}
                size='small'
                color='secondary'
                variant='outlined'
                component='span'
                onClick={() => setImagePreview(null)}
                startIcon={<FiCameraOff style={{ color: '#FB8BB0' }} />}>
                {/* Delete image */}
              </Button>
            )}
            <Button
              className={classes.selectBtn}
              style={{ marginLeft: 5 }}
              size='small'
              variant='outlined'
              component='span'
              onClick={handlePostLinkStatus}
              startIcon={<FiExternalLink style={{ color: '#3E3F42' }} />}>
              {postLinkStatus === false ? 'Add Link' : 'Remove Link'}
            </Button>
          </div>
          <CustomButton
            disabled={text.length === 0 || postType.length === 0}
            color='primary'
            size='small'
            component='span'
            onClick={handleCreatePost}
            startIcon={<FaPaperPlane />}>
            Create Post
          </CustomButton>
        </CardActions>
      </Card>
    </div>
  );
};
CreatePostForm.propTypes = {
  userProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  userProfile: state.profile.userProfile,
});

export default connect(mapStateToProps, { addPost })(CreatePostForm);

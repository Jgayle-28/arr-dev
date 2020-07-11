import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { toggleMenu } from '../../redux/actions/dashboardActions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TuneIcon from '@material-ui/icons/Tune';
import Avatar from '@material-ui/core/Avatar';
import logo from '../../assets/img/logos/arr-logo-sm.svg';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #EAEDF3',
    boxShadow: 'none',
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuBtn: {
    color: '#A5A5A7',
    margin: '10px 0 0 10px',
    cursor: 'pointer',
    fontSize: 18,
  },
  menuButton: {
    color: '#A5A5A7',
    margin: '10px 0 0 10px',
    cursor: 'pointer',
    fontSize: 18,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuText: { color: '#A5A5A7' },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const NavBarContainer = ({
  auth: { user, loading },
  userProfile,
  logoutUser,
  toggleMenu,
  history,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logoutUser();
    handleMenuClose();
    history.push('/');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <AccountCircle fontSize='small' />
        </ListItemIcon>
        <ListItemText primary='Profile' className={classes.menuText} />
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <TuneIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText primary='Settings' className={classes.menuText} />
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText primary='Logout' className={classes.menuText} />
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const userAvatar = () => {
    let imageStr = ``;
    if (userProfile !== null) {
      imageStr = `data:image/jpeg;base64, ${userProfile.profilePicture}`;
    }
    // console.log('imageStr', imageStr);
    return (
      <Avatar
        alt={user && user.name}
        // src='localhost:5000/public/img/users/user-5ef5554a8e016533ddc94429-profilePicture.jpeg'
        src={imageStr}
        className={classes.orange}
      />
    );
  };

  return (
    <div className={classes.grow}>
      {!loading && (
        <Fragment>
          <AppBar position='static' className={classes.navBar}>
            <Toolbar>
              {/* <IconButton
                
                edge='start'
                className={classes.menuButton}
                aria-label='open drawer'> */}
              <MenuIcon
                className={classes.menuButton}
                style={{ fontSize: 22 }}
                onClick={toggleMenu}
              />
              {/* </IconButton> */}
              <img
                src={logo}
                alt='Remnant Remains Logo'
                className={classes.logo}
              />

              <div className={classes.grow} />
              {/* DESKTOP NAVBAR */}
              <div className={classes.sectionDesktop}>
                {/* AVATAR */}
                {userAvatar()}
                {/* <Avatar
                  alt={user && user.name}
                  src={userAvatar}
                  className={classes.orange}
                /> */}
                <MoreIcon
                  onClick={handleProfileMenuOpen}
                  className={classes.menuBtn}
                />
              </div>

              {/* MOBILE NAVBAR */}
              <div className={classes.sectionMobile}>
                <Avatar
                  alt={user && user.name}
                  src={user && user.profilePicture}
                  className={classes.orange}
                />
                <MoreIcon
                  onClick={handleMobileMenuOpen}
                  className={classes.menuBtn}
                />
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Fragment>
      )}
    </div>
  );
};
NavBarContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  userProfile: state.profile.userProfile,
});

export default withRouter(
  connect(mapStateToProps, { logoutUser, toggleMenu })(NavBarContainer)
);

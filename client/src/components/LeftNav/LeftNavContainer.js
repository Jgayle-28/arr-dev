import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleMenu } from '../../redux/actions/dashboardActions';
import { Link } from 'react-router-dom';
// import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    zIndex: 0,
    borderRight: '1px solid #EAEDF3',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerStyles: { zIndex: 0 },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menuItem: {
    color: '#3E3F42',
    letterSpacing: 0.5,
    transition: '.2s all ease',
    '&:hover': {
      backgroundColor: '#F7FAFE',
      color: '#1765D8',
      paddingLeft: 20,
    },
  },
  menuItemActive: {
    letterSpacing: 0.5,
    backgroundColor: '#F7FAFE',
    color: '#1765D8',
    paddingLeft: 20,
    borderLeft: '4px solid #1765D8',
    '&:hover': {
      backgroundColor: '#F7FAFE',
      color: '#1765D8',
    },
  },
  menuText: { marginLeft: 20 },
  link: { textDecoration: 'none' },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    zIndex: 0,
    width: drawerWidth,
  },
}));

function LeftNavContainer(props) {
  const { pathname } = props.location;
  const { dashboard, toggleMenu } = props;
  const classes = useStyles();
  const theme = useTheme();

  // To add slight delay for menu click
  const handleLinkClick = () => {
    setTimeout(() => {
      toggleMenu();
    }, 200);
  };

  const menu = (
    <Fragment>
      <div className={classes.toolbar} style={{ zIndex: 0 }} />
      <List dense>
        <ListItem button disabled>
          <ListItemText primary='Menu' className={classes.menuText} />
        </ListItem>
        <Link
          to='/dashboard'
          className={classes.link}
          onClick={dashboard.menuOpen ? handleLinkClick : null}>
          <ListItem
            button
            className={
              pathname === '/dashboard'
                ? classes.menuItemActive
                : classes.menuItem
            }>
            <ListItemText primary='Dashboard' className={classes.menuText} />
          </ListItem>
        </Link>
        <Link
          to='/profile'
          className={classes.link}
          onClick={dashboard.menuOpen ? handleLinkClick : null}>
          <ListItem
            button
            className={
              pathname === '/profile'
                ? classes.menuItemActive
                : classes.menuItem
            }>
            <ListItemText primary='Profile' className={classes.menuText} />
          </ListItem>
        </Link>
        <Link
          to='/users'
          className={classes.link}
          onClick={dashboard.menuOpen ? handleLinkClick : null}>
          <ListItem
            button
            className={
              pathname === '/users' ? classes.menuItemActive : classes.menuItem
            }>
            <ListItemText primary='Users' className={classes.menuText} />
          </ListItem>
        </Link>
      </List>
    </Fragment>
  );

  return (
    <div className={classes.drawer} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation='css'>
        <Drawer
          // container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={dashboard.menuOpen} //From redux
          onClose={toggleMenu} //From redux
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.drawerStyles}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          {menu}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.drawerStyles}
          variant='permanent'
          open>
          {menu}
        </Drawer>
      </Hidden>
    </div>
  );
}
LeftNavContainer.propTypes = {
  dashboard: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
LeftNavContainer.propTypes = {};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default withRouter(
  connect(mapStateToProps, { toggleMenu })(LeftNavContainer)
);

import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  MenuItem,
  CssBaseline,
  Menu,
  Divider
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, withRouter } from 'react-router-dom';
import * as userActions from "../actions/userActions";
import userStore from '../stores/userStore';
import { toast } from 'react-toastify';
import SearchBar from './SearchBar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  titleMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
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

function NavBar(props) {
  const dummyCategories = ['Hokusai', 'Hiroshige', 'Utamaro', 'Kuniyoshi', 'Yoshitoshi']
  const classes = useStyles();
  const theme = useTheme();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };
  const open = Boolean(menuAnchorEl);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [loggedIn, setLoggedIn] = useState(userStore.isAuthenticated());

  useEffect(() => {
    userStore.addChangeListener(onLogginChange);

    return () => userStore.removeChangeListener(onLogginChange);
  }, [])

  function onLogginChange() {
    setLoggedIn(userStore.isAuthenticated());
  }

  const onLogoutClick = (event) => {
    // debugger;
    event.preventDefault();
    userActions.logoutUser();
    toast.info('Logout Successful!');
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const drawer = (
    <div>
      <List>
        {dummyCategories.map((text, index) => (
          <div key={text} >
            <Divider />
            <ListItem button>
              <ListItemText primary={text} />
            </ListItem>
          </div>
        ))}
        <Divider />
      </List>
    </div >
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const withoutLoginMobileView = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink to="/" style={{ fontSize: 21, padding: theme.spacing(0, 1), color: 'inherit', textDecoration: 'inherit' }}>Home</NavLink>
      </MenuItem>
      <Divider />
      <MenuItem>
        <NavLink to="/login" style={{ fontSize: 21, padding: theme.spacing(0, 1), color: 'inherit', textDecoration: 'inherit' }}>Login</NavLink>
      </MenuItem>
      <Divider />
      <MenuItem>
        <NavLink to="/register" style={{ fontSize: 21, color: 'inherit', padding: theme.spacing(0, 1), textDecoration: 'inherit' }}>
          Register
        </NavLink>
      </MenuItem>
    </Menu>
  );

  const onLoginMobileView = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink to="/" style={{ fontSize: 21, padding: theme.spacing(0, 1), color: 'inherit', textDecoration: 'inherit' }}>Home</NavLink>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  const withoutLogin = (
    <>
      <NavLink to="/login" style={{ fontSize: 21, padding: theme.spacing(0, 1), color: 'inherit', textDecoration: 'inherit' }}>Login</NavLink>
      <NavLink to="/register" style={{ fontSize: 21, color: 'inherit', padding: theme.spacing(0, 1), textDecoration: 'inherit' }}>
        Register
      </NavLink>
    </>
  );

  const onLogin = (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
        <Typography style={{ padding: theme.spacing(0, 1) }}  >
          {props.name}
        </Typography>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Interest</MenuItem>
        <MenuItem onClick={handleClose}>Bookmark</MenuItem>
        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {loggedIn !== true ? withoutLoginMobileView : onLoginMobileView}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          {props.location.pathname === '/' && <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>}
          <Typography variant="h6" className={classes.title} noWrap>
            <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>NewsTime</NavLink>
          </Typography>
          {props.location.pathname !== '/' && <Typography variant="h6" className={classes.titleMobile} noWrap>
            <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>NewsTime</NavLink>
          </Typography>}
          {props.location.pathname === '/' && <SearchBar />}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {loggedIn !== true ? withoutLogin : onLogin}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {(props.location.pathname === '/') && <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden lgUp={true} implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>}
    </div >
  );
}

export default withRouter(NavBar);

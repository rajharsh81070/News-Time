import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { NavLink } from 'react-router-dom';
import * as userActions from "../actions/userActions";
import userStore from '../stores/userStore';
import { toast } from 'react-toastify';
import SearchBar from './SearchBar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    textTransform: "none"
  },
  searchbar: {
    padding: theme.spacing(0, 12)
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openIcon, setOpenIcon] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenIcon((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenIcon(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenIcon(false);
    }
  }

  const [loggedIn, setLoggedIn] = useState(userStore.isAuthenticated());

  useEffect(() => {
    userStore.addChangeListener(onLogginChange);

    return () => userStore.removeChangeListener(onLogginChange);
  }, [])

  function onLogginChange() {
    setLoggedIn(userStore.isAuthenticated());
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogoutClick = (event) => {
    // debugger;
    event.preventDefault();
    userActions.logoutUser();
    toast.info('Logout Successful!');
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>NewsTime</NavLink>
          </Typography>
          <div className={classes.searchbar} >
            <SearchBar />
          </div>
          {/* {console.log(loggedIn)} */}
          {loggedIn !== true ?
            <>
              <Typography variant="h6" >
                <NavLink to="/login" style={{ padding: theme.spacing(0, 1), color: 'inherit', textDecoration: 'inherit' }}>Login</NavLink>
              </Typography>
              <Typography variant="h6" >
                <NavLink to="/register" style={{ color: 'inherit', padding: theme.spacing(0, 1), textDecoration: 'inherit' }}>
                  Register
                </NavLink>
              </Typography>
            </>
            :
            <div>
              <IconButton
                ref={anchorRef}
                aria-controls={openIcon ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                aria-label="account of current user"
                color="inherit"
              >
                <AccountCircle />
                <Typography style={{ padding: theme.spacing(0, 1) }}  >
                  {props.name}
                </Typography>
              </IconButton>
              <Popper open={openIcon} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={openIcon} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>History</MenuItem>
                          <MenuItem onClick={handleClose}>Interest</MenuItem>
                          <MenuItem onClick={handleClose}>BookMark</MenuItem>
                          <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          }
          {/* <Typography variant="h6">
                <NavLink to="/" style={{ padding: theme.spacing(0, 1), color: 'inherit', textDecoration: 'inherit' }}>Profile</NavLink>
              </Typography>
              <Typography variant="h6">
                <NavLink onClick={onLogoutClick} style={{ color: 'inherit', padding: theme.spacing(0, 1), textDecoration: 'inherit' }}>Logout
            </NavLink>
              </Typography> */}

          {/* <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        {/* <Divider /> */}
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div >
  );
}

export default NavBar;

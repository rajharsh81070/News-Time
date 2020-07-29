import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  // Button,
  CssBaseline,
  // TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';
import NavBar from './NavBar';
import userStore from '../stores/userStore';
import { getProfile } from "../actions/userActions";
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // margin: theme.spacing(1)
  },
  root: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: '405px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '30px',
      marginTop: theme.spacing(33),
      marginBottom: theme.spacing(30)
    },
  },
  textField: {
    marginBottom: '24px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '84px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '24px'
    },
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto'
    },
  },
  avatar: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    alignSelf: 'center',
  },
}));

function Profile(props) {
  const classes = useStyles();
  const [profileInfo, setProfileInfo] = useState(userStore.getProfile());
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(userStore.getIsLoading());

  useEffect(() => {
    userStore.addChangeListener(onChange);
    if (profileInfo.length === undefined) {
      getProfile();
    }
    if (error.length && error === "Unauthorized") {
      props.history.push('/login');
      toast.error(error);
    }
    return () => userStore.removeChangeListener(onChange);
  }, [profileInfo.length, error.length, error, props.history])

  function onChange() {
    const data = userStore.getErrors();
    if (data.hasOwnProperty('message')) {
      setError(data.message);
    } else {
      const updatedData = { ...profileInfo };
      setProfileInfo(updatedData);
      setIsLoading(userStore.getIsLoading());
    }
  }

  const onLoadingProfile = (
    <Container style={{ paddingTop: '90px', paddingBlockEnd: '381px' }} component="main" maxWidth="md">
      <Paper className={classes.paper} variant="elevation" elevation={24}>
        <Grid className={classes.grid} >
          <Grid style={{ alignSelf: 'center' }} item>
            <Avatar alt="Remy Sharp" src={profileInfo.image || 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png'} className={classes.avatar} />
          </Grid>
          <Grid className={classes.textField} item xs>
            <Typography style={{ marginTop: '30px', background: 'rgb(231, 231, 231)', borderRadius: '6px', width: '90%', marginBottom: '9px' }} color="inherit" variant='h5'>
              Email: {profileInfo.email}
            </Typography>
            <Typography style={{ marginTop: '5px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
              Name: {`${profileInfo.firstName} ${profileInfo.lastName}`}
            </Typography>
            <Typography style={{ marginTop: '5px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
              Country: {profileInfo.country}
            </Typography>
            <Typography style={{ marginTop: '5px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
              State: {profileInfo.state}
            </Typography>
            <Typography style={{ marginTop: '5px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
              City: {profileInfo.city}
            </Typography>
            <Typography style={{ marginTop: '5px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
              Ph. No. : {profileInfo.phone}
            </Typography>
            <Typography style={{ marginTop: '5px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
              Age: {profileInfo.age}
            </Typography>
          </Grid>
        </Grid>
        {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '55vh' }} /> */}
      </Paper>
    </Container>
  );

  const isLoadingProfile = (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );

  return (
    <>
      {/* {console.log(profileInfo.length)} */}
      {/* {console.log(error)} */}
      <CssBaseline />
      <NavBar name={profileInfo.firstName} />
      {isLoading === true ? isLoadingProfile : onLoadingProfile}
    </>
  );
}

export default Profile;
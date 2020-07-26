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

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  grid: {
    [theme.breakpoints.down('sm')]: {
      display: 'inline-table',
      margin: 'auto'
    },
  },
  avatar: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(3)
    },
  },
}));

function Profile(props) {
  const classes = useStyles();
  const [profileInfo, setProfileInfo] = useState(userStore.getProfile());
  const [error, setError] = useState("");

  useEffect(() => {
    userStore.addChangeListener(onChange);
    if (profileInfo.length === undefined) {
      getProfile();
    }
    if (error.length) {
      props.history.push('/login');
      toast.error(error);
    }
    return () => userStore.removeChangeListener(onChange);
  }, [profileInfo.length, error.length, error, props.history])

  function onChange() {
    const data = userStore.getErrors();
    if (data.hasOwnProperty('message')) {
      setError(data.message);
    }
  }

  return (
    <>
      {console.log(profileInfo)}
      {/* {console.log(error)} */}
      <CssBaseline />
      <NavBar name={profileInfo.firstName} />
      <Container style={{ paddingTop: '90px', paddingBlockEnd: '381px' }} component="main" maxWidth="md">
        <Paper className={classes.paper} variant="elevation" elevation={24}>
          <Grid className={classes.grid} container wrap="nowrap" spacing={3}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={profileInfo.image || 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png'} className={classes.avatar} />
            </Grid>
            <Grid item xs>
              <Typography style={{ marginTop: '30px', paddingLeft: '30px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
                Email: {profileInfo.email}
              </Typography>
              <Typography style={{ marginTop: '5px', paddingLeft: '30px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
                Name: {`${profileInfo.firstName} ${profileInfo.lastName}`}
              </Typography>
              <Typography style={{ marginTop: '5px', paddingLeft: '30px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
                Country: {profileInfo.country}
              </Typography>
              <Typography style={{ marginTop: '5px', paddingLeft: '30px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
                State: {profileInfo.state}
              </Typography>
              <Typography style={{ marginTop: '5px', paddingLeft: '30px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
                City: {profileInfo.city}
              </Typography>
              <Typography style={{ marginTop: '5px', paddingLeft: '30px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
                Phone Number: {profileInfo.phone}
              </Typography>
              <Typography style={{ marginTop: '5px', paddingLeft: '30px', background: 'rgb(231, 231, 231)', borderRadius: '5px', width: '90%', marginBottom: '10px' }} color="inherit" variant='h5'>
                Age: {profileInfo.age}
              </Typography>
            </Grid>
          </Grid>
          {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '55vh' }} /> */}
        </Paper>
      </Container>
    </>
  );
}

export default Profile;
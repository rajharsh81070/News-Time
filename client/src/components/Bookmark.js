import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';
import userStore from '../stores/userStore';
import * as userActions from '../actions/userActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import NewsCard from './NewsCard';
import {
  CssBaseline,
  Typography,
  Container
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
}));

function Bookmark(props) {
  const classes = useStyles();
  const [bookmarks, setBookmarks] = useState(userStore.getBookmarks());
  const [name] = useState(userStore.getName());
  const [isLoading, setIsLoading] = useState(userStore.getIsLoading());

  useEffect(() => {
    userStore.addChangeListener(onChange);
    if (bookmarks.length === 0) {
      userActions.getBookmarks();
    }
    return () => userStore.removeChangeListener(onChange);
  }, [bookmarks.length])

  function onChange() {
    setBookmarks(userStore.getBookmarks());
    setIsLoading(userStore.getIsLoading());
  }

  const isLoadingProfile = (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );

  const onLoadingProfile = (
    bookmarks.length ?
      <NewsCard />
      :
      <Container style={{ minHeight: '91vh', paddingTop: '90px' }} fixed>
        <Typography variant="h6" style={{ fontSize: '24px', fontWeight: '180' }} gutterBottom={true}>
          No bookmarks Found
        </Typography>
      </Container>
  );

  return (
    <>
      <CssBaseline />
      <NavBar name={name} />
      {isLoading === true ? isLoadingProfile : onLoadingProfile}
    </>
  );
}

export default Bookmark;
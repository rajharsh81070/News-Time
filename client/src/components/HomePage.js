import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import userStore from '../stores/userStore';
import newsStore from '../stores/newsStore';
import * as newsActions from '../actions/newsActions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Typography,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  }
}));

function HomePage(props) {
  const classes = useStyles();

  const [data, setData] = useState({
    language: 'en',
    country: 'in',
    page: 1
  });
  const [name, setName] = useState(userStore.getName());
  const [news, setNews] = useState(newsStore.getNews(data));

  useEffect(() => {
    newsStore.addChangeListener(onChange);
    if (news.length === 0)
      newsActions.topHeadlines(data);
    return () => newsStore.removeChangeListener(onChange);
  }, [])

  function onChange() {
    setNews(newsStore.getNews(data));
  }

  return (
    <div>
      <NavBar name={name} />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>
      {/* {console.log(news)} */}
    </div >
  );
}

export default HomePage;
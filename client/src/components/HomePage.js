import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import userStore from '../stores/userStore';
import newsStore from '../stores/newsStore';
import * as newsActions from '../actions/newsActions';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Typography,
  Container,
  // List,
  // ListItem,
  Divider,
  Box,
} from "@material-ui/core";
import NewsCard from './NewsCard';
import Pagination from "@material-ui/lab/Pagination";
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  paginator: {
    justifyContent: "center",
    padding: "10px"
  },
}));

function HomePage(props) {
  const classes = useStyles();

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [data] = useState(newsStore.getData());
  const [name] = useState(userStore.getName());
  const [news, setNews] = useState(newsStore.getNews());
  const [isLoading, setIsLoading] = useState(newsStore.getLoading());

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleDataChange = (event) => {
    const { target } = event;
    let updatedData = { ...data, category: target.innerText };
    // console.log(data.category);
    // console.log(updatedData.category);
    if (data.category === '' && updatedData.category === 'Top Headlines') {
      if (news.category === 'Top Headlines')
        data.category = 'Top Headlines';
    }
    if (data.category !== updatedData.category) {
      if (updatedData.category === 'Top Headlines') {
        updatedData.category = '';
      }
      newsStore.setData(updatedData);
      setIsLoading(!isLoading);
      newsActions.topHeadlines(updatedData);
    }
    // console.log(updatedData);
  };

  useEffect(() => {
    newsStore.addChangeListener(onChange);
    if (news.length === 0)
      newsActions.topHeadlines(data);
    return () => newsStore.removeChangeListener(onChange);
  }, [data, news.length])

  function onChange() {
    setNews(newsStore.getNews());
    setIsLoading(newsStore.getLoading());
  }

  const isLoadingContainer = (
    <Container style={{ paddingTop: '90px' }} fixed>
      <Typography style={{ paddingBottom: '10px' }}>
        <Skeleton variant="rect" width="auto" height={90} animation="pulse" />
      </Typography>
      <Typography style={{ paddingBottom: '10px' }}>
        <Skeleton variant="rect" width="auto" height={90} animation="pulse" />
      </Typography>
      <Typography style={{ paddingBottom: '10px' }}>
        <Skeleton variant="rect" width="auto" height={90} animation="pulse" />
      </Typography>
      <Typography style={{ paddingBottom: '10px' }}>
        <Skeleton variant="rect" width="auto" height={90} animation="pulse" />
      </Typography>
      <Typography style={{ paddingBottom: '10px' }}>
        <Skeleton variant="rect" width="auto" height={90} animation="pulse" />
      </Typography>
      <Typography style={{ paddingBottom: '10px' }}>
        <Skeleton variant="rect" width="auto" height={90} animation="pulse" />
      </Typography>
      <Typography style={{ paddingBottom: '10px' }}>
        <Skeleton variant="rect" width="auto" height={90} animation="pulse" />
      </Typography>
      <Typography style={{ paddingBottom: '10px' }}>
        <Skeleton variant="rect" width="auto" height={90} animation="pulse" />
      </Typography>
      <Typography style={{ paddingBottom: '10px' }}>
        <Skeleton variant="rect" width="auto" height={90} animation="pulse" />
      </Typography>
    </Container>
  );

  const onLoadingContainer = (
    <>
      <Container style={{ paddingTop: '90px' }} fixed>
        <Typography variant="h3" align='center' style={{ fontSize: '36px', fontWeight: '300', textDecoration: 'underline' }} gutterBottom={true}>
          {news.category}
        </Typography>
        {
          (news.articles && news.articles.length !== 0) ? (
            news.articles
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((article, index) => {
                return (
                  <div key={index} style={{ paddingBottom: '10px' }}>
                    <NewsCard article={article} />
                  </div>
                );
              })
          )
            :
            <Typography variant="h6" style={{ fontSize: '24px', fontWeight: '180' }} gutterBottom={true}>No Articles Found</Typography>
        }
      </Container>
      {
        (news.articles && news.articles.length !== 0) ? (
          <>
            <Divider />
            <Box component="span">
              {/* {console.log(noOfPages)} */}
              <Pagination
                count={(Math.ceil(news.totalResults / itemsPerPage)) > 10 ? 10 : Math.ceil(news.totalResults / itemsPerPage)}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                variant="outlined"
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                classes={{ ul: classes.paginator }}
              />
            </Box>
          </>
        )
          :
          ''
      }
    </>
  );

  return (
    <div>
      {console.log(news)}
      <CssBaseline />
      <NavBar
        isLoading={isLoading}
        setIsLoading={setIsLoading} handleDataChange={handleDataChange}
        name={name}
      />
      {(isLoading === true) ? isLoadingContainer : onLoadingContainer}
    </div >
  );
}

export default HomePage;
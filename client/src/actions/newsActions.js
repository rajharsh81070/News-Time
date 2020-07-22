import AppDispatcher from '../appDispatcher';
import actionTypes from './actionTypes';

export async function topHeadlines(params) {
  // console.log(params);
  let query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
  };
  const response = await fetch('http://localhost:5000/news/topheadlines?' + query, requestOptions);
  let news = await response.json();
  if (params.category)
    news.category = params.category;
  else
    news.category = "Top Headlines";
  // console.log(news);
  AppDispatcher.dispatch({
    actionType: actionTypes.GET_TOP_HEADLINES_ALL,
    news: news
  });
}

export async function searchArticles(params) {
  let query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

  const requestOptions = {
    method: 'GET',
    mode: 'cors',
  };

  const response = await fetch('http://localhost:5000/news/everything?' + query, requestOptions);
  let news = await response.json(); news.category = `Search results for ${params.qInTitle}`;
  // console.log(news);
  AppDispatcher.dispatch({
    actionType: actionTypes.GET_SEARCH_RESULTS,
    news: news
  });
}
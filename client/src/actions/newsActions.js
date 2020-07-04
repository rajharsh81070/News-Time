import AppDispatcher from '../appDispatcher';
import actionTypes from './actionTypes';

export async function topHeadlines(params) {
  // console.log(data);
  let query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
  };
  const response = await fetch('http://localhost:5000/news/topheadlines?' + query, requestOptions);
  const news = await response.json();
  // console.log(news);
  AppDispatcher.dispatch({
    actionType: actionTypes.GET_TOP_HEADLINES,
    news: news
  });
}
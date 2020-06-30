import AppDispatcher from '../appDispatcher';
import actionTypes from './actionTypes';

export function topHeadlines() {
  return fetch('http://localhost:5000/').then(data => data.json())
    .then(news => {
      // console.log(news);
      AppDispatcher.dispatch({
        actionType: actionTypes.GET_TOP_HEADLINES,
        news: news
      });
    });
}
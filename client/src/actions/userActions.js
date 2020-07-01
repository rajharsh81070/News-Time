import dispatcher from '../appDispatcher';
import actionTypes from './actionTypes';

export function registerUser(data) {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch('http://localhost:5000/user/register', requestOptions)
    .then(data => data.json())
    .then(data => {
      if (!data.success) {
        debugger;
        dispatcher.dispatch({
          actionType: actionTypes.ERROR_MESSAGE,
          message: data
        })
      } else {
        debugger;
        dispatcher.dispatch({
          actionType: actionTypes.USER_REGISTERED,
          message: data
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
}
export function loginUser(data) {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch('http://localhost:5000/user/login', requestOptions)
    .then(data => data.json())
    .then(user => {
      debugger;
      dispatcher.dispatch({
        actionType: actionTypes.LOGIN_USER,
        payload: user
      });
    })
    .catch(err => {
      console.log(err);
    });
}

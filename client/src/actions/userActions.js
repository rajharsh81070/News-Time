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
        // debugger;
        dispatcher.dispatch({
          actionType: actionTypes.ERROR_MESSAGE,
          message: data
        })
      } else {
        // debugger;
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
      // debugger;
      if (user.success) {
        dispatcher.dispatch({
          actionType: actionTypes.LOGIN_USER,
          token: user
        });
      } else {
        dispatcher.dispatch({
          actionType: actionTypes.ERROR_MESSAGE,
          message: user
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export function logoutUser() {
  // debugger;
  // localStorage.removeItem('token');
  dispatcher.dispatch({
    actionType: actionTypes.LOGOUT_USER
  })
}

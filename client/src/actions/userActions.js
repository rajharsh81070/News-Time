import AppDispatcher from '../appDispatcher';
import actionTypes from './actionTypes';

export default {
  registerUser: (data) => {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    return fetch('http://localhost:5000/user/register', requestOptions);
  },
  loginUser: (data) => {
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
      .then(data => {
        debugger;
        AppDispatcher.dispatch({
          actionType: actionTypes.LOGIN_USER,
          payload: data
        });
        console.log("dispatch");
      })
      .catch(err => {
        console.log(err);
      });
  }

}
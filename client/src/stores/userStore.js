import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';

// function setToken(token) {
//   if (localStorage.getItem('token')) {
//     localStorage.setItem('token', token);
//   }
// }

// function removeUser() {
//   localStorage.removeItem('profile');
//   localStorage.removeItem('token');
// }

let _errors = {};
// let isRegis

class UserStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getUser() {
    return localStorage.getItem('profile');
  }

  getJWT() {
    return localStorage.getItem('token');
  }

  getErrors() {
    return _errors;
  }

}

const store = new UserStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.LOGIN_USER:
      debugger;
      console.log(action.payload);
      // setToken(action.token);
      store.emitChange();
      break;
    case actionTypes.LOGOUT_USER:
      // removeUser();
      store.emitChange();
      break;
    case actionTypes.ERROR_MESSAGE:
      debugger;
      _errors = action.message;
      store.emitChange();
      break;
    case actionTypes.USER_REGISTERED:
      debugger;
      _errors = action.message;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});

export default store;
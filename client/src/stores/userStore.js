import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';
import jwt_decode from "jwt-decode";

const CHANGE_EVENT = 'change';

function setToken(token, name) {
  if (localStorage.getItem('token') === null) {
    localStorage.setItem('token', token);
  }
}

function setName(name) {
  if (localStorage.getItem('name') === null) {
    localStorage.setItem('name', name);
  }
}

function updateName(name) {
  localStorage.removeItem('name');
  localStorage.setItem('name', name);
}

function removeUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
}

let _errors = {};
let _user = {};
let isLoading = true;

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

  getName() {
    return localStorage.getItem('name');
  }

  getJWT() {
    return localStorage.getItem('token');
  }

  getProfile() {
    return _user;
  }

  getErrors() {
    return _errors;
  }

  getIsLoading() {
    return isLoading;
  }

}

const store = new UserStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.LOGIN_USER:
      // debugger;
      // console.log(action.token);
      const authToken = action.token.token;
      const decoded = jwt_decode(authToken);
      // console.log(decoded);
      setToken(authToken);
      setName(decoded.name);
      store.emitChange();
      break;
    case actionTypes.LOGOUT_USER:
      // debugger;
      removeUser();
      store.emitChange();
      break;
    case actionTypes.ERROR_MESSAGE:
      // debugger;
      _errors = action.message;
      store.emitChange();
      break;
    case actionTypes.USER_REGISTERED:
      // debugger;
      _errors = action.message;
      store.emitChange();
      break;
    case actionTypes.GET_PROFILE:
      _user.photo = action.user.photo;
      _user.firstName = action.user.firstName;
      _user.firstName = action.user.firstName;
      _user.lastName = action.user.lastName;
      _user.email = action.user.email;
      _user.country = action.user.country;
      _user.state = action.user.state;
      _user.city = action.user.city;
      _user.age = action.user.age;
      _user.phone = action.user.phone;
      isLoading = false;
      updateName(action.user.firstName);
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});

export default store;
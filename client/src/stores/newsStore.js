import { EventEmitter } from 'events';
import AppDispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';

let _news = [];

class NewsStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getNews() {
    return _news;
  }

}

const store = new NewsStore();

AppDispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.GET_TOP_HEADLINES:
      _news = action.news;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
})

export default store;
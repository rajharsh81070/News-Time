import React from 'react';
import { Route, Switch } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import HomePage from './HomePage';
import Profile from './Profile';
import Footer from './Footer';
import Bookmark from './Bookmark';
// import userStore from '../stores/userStore';

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/bookmark" exact component={Bookmark} />
        </Switch>
        <Footer />
      </>
    </div>
  )
}

export default App;
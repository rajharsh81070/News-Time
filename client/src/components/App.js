import React from 'react';
import { Route, Switch } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import HomePage from './HomePage';
// import userStore from '../stores/userStore';

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
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
        </Switch>
        {/* <Footer /> */}
      </>
    </div>
  )
}

export default App;
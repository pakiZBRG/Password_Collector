import './style.scss';
import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Passwords from './pages/Passwords';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const location = useLocation();

    return (
      <AnimatePresence /*initial={false}*/ exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path='/' component={Home}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/user' component={Passwords}/>
          <Route exact path='/forgot-password' component={ForgotPassword}/>
        </Switch>
      </AnimatePresence>
  );
}

export default App;

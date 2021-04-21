import './style.scss';
import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  const location = useLocation();

    return (
      <AnimatePresence /*initial={false}*/ exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path='/' component={Home}/>
          <Route exact path='/register' component={Register}/>
        </Switch>
      </AnimatePresence>
  );
}

export default App;

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';

// Import Components
import SplashPage from './pages/SplashPage';
import SnippingMain from './pages/SnippingMain';
import NavBar from './pages/NavBar';
import './css/App.css';

import CloseIcon from '@material-ui/icons/Close';
import { AppBar, Container } from '@material-ui/core';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <AppBar
          className='topframe'
          position='static'
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          <span>x</span>
        </AppBar>
        <NavBar />
        <Switch>
          {/* <Route exact path = "/" component={SplashPage} /> */}
          {/* <Route exact path = "/snipping" component={SnippingMain} /> */}
          <Route exact path='/' component={SnippingMain} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

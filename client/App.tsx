import { Route, Switch, BrowserRouter} from "react-router-dom";
import React from 'react';

// Import Components
import SplashPage from './pages/SplashPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path = "/" component={SplashPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
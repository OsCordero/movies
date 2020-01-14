import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../Pages/Login/Login';
import './app.scss';
import Register from './../Pages/Register/Register';
const App = () => {
  return (
    <div className='app'>
      <Router>
        <div>
          <div className='container'>
            <Switch>
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;

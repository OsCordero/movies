import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../../helpers/history';

import Login from '../Pages/Login/Login';
import Register from './../Pages/Register/Register';
import './app.scss';
import './loaders.scss';
import Home from './../Pages/Home/Home';
import PrivateRoute from './../helperComponents/PrivateRoute';
import PublicRoute from './../helperComponents/PublicRoute';
const App = () => {
  return (
    <div className='app'>
      <Router history={history}>
        <div>
          <div className='container'>
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <PublicRoute restricted={true} path='/login' exact component={Login} />
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

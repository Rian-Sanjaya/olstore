import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from '../src/hoc/layout'
import Auth from './hoc/auth'

import Home from '../src/components/Home'
import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'
import UserDashboard from './components/User'

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' exact component={Auth(Home, null)} />
          <Route path='/register_login' component={Auth(RegisterLogin, false)} />
          <Route path='/register' component={Auth(Register, false)} />
          <Route path='/user/dashboard' component={Auth(UserDashboard, true)} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default Routes;

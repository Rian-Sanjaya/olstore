import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from '../src/hoc/layout'
import Home from '../src/components/Home'
import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'
import UserDashboard from './components/User'

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register_login' component={RegisterLogin} />
          <Route path='/register' component={Register} />
          <Route path='/user/dashboard' component={UserDashboard} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default Routes;

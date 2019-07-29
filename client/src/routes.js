import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from '../src/hoc/layout'
import Auth from './hoc/auth'

import Home from '../src/components/Home'
import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'
import Shop from './components/Shop'
import ProductDetail from './components/Product'

import UserDashboard from './components/User'
import AddProduct from './components/User/Admin/add_product'
import ManageCategories from './components/User/Admin/manage_categories';
import UserCart from './components/User/cart'

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' exact component={Auth(Home, null)} />
          <Route path='/register_login' component={Auth(RegisterLogin, false)} />
          <Route path='/register' component={Auth(Register, false)} />
          <Route path='/shop' component={Auth(Shop, null)} />
          <Route path='/product_detail/:id' component={Auth(ProductDetail, null)} />

          <Route path='/user/dashboard' component={Auth(UserDashboard, true)} />
          <Route path='/admin/add_product' component={Auth(AddProduct, true)} />
          <Route path='/admin/manage_categories' component={Auth(ManageCategories, true)} />
          <Route path='/user/cart' component={Auth(UserCart, true)} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default Routes;

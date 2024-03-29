import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from '../src/hoc/layout'
import Auth from './hoc/auth'

import Home from '../src/components/Home'
import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'
import Shop from './components/Shop'
import ProductDetail from './components/Product'
import ForgotPass from './components/reset_pass'
import ResetPass from './components/reset_pass/reset_pass'

import UserDashboard from './components/User'
import AddProduct from './components/User/Admin/add_product'
import ManageCategories from './components/User/Admin/manage_categories';
import UserCart from './components/User/cart'
import UpdateProfile from './components/User/update_profile'
import ManageSite from './components/User/Admin/manage_site'

import PageNotFound from './components/utils/page_not_found'

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
          <Route path='/forgot_pass' component={Auth(ForgotPass, false)} />
          <Route path='/reset_password/:token' component={Auth(ResetPass, false)} />

          <Route path='/user/dashboard' component={Auth(UserDashboard, true)} />
          <Route path='/user/cart' component={Auth(UserCart, true)} />
          <Route path='/user/user_profile' component={Auth(UpdateProfile, true)} />
          <Route path='/admin/add_product' component={Auth(AddProduct, true)} />
          <Route path='/admin/manage_categories' component={Auth(ManageCategories, true)} />
          <Route path='/admin/site_info' component={Auth(ManageSite, true)} />
          <Route component={Auth(PageNotFound)} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default Routes;

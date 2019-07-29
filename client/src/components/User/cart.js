import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserDashboardSidebar from '../../hoc/user'
import { getCartItems } from '../../actions/user_action'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

class UserCart extends Component {
  state = {
    loading: true,
    total:0,
    showTotal: false,
    showSuccess: false,
  }
  
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    console.log({user: user})
    if (user.authUser.cart) {
      if (user.authUser.cart.length > 0) {
        user.authUser.cart.forEach( item => {
          cartItems.push(item.id)
        })

        this.props.getCartItems(cartItems, user.authUser.cart)
      }
    }
  }

  render() {
    return (
      <div>User Cart</div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

const mapActionsToProps = {
  getCartItems
}

export default connect(mapStateToProps, mapActionsToProps)(UserCart)
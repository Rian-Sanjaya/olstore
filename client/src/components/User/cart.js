import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserDashboardSidebar from '../../hoc/user'
import UserProductBlock from '../utils/User/product_block'
import { getCartItems, removeCartItem } from '../../actions/user_action'
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
    
    if (user.authUser.cart) {
      if (user.authUser.cart.length > 0) {
        user.authUser.cart.forEach( item => {
          cartItems.push(item.id)
        })

        this.props.getCartItems(cartItems, user.authUser.cart)
        .then( () => {
          if (this.props.user.cartDetail.length > 0) {
            this.calculateTotal(this.props.user.cartDetail)
          }
        })
      }
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0

    cartDetail.forEach( item => {
      total += parseInt(item.price, 10) * item.quantity
    })

    this.setState({
      total,
      showTotal: true
    })
  }

  removeFromCart = (id) => {
    this.props.removeCartItem(id)
    .then( () => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        })
      } else {
        this.calculateTotal(this.props.user.cartDetail)
      }
    })
  }

  showNoItemMessage = () =>(
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown}/>
      <div>
        You have no items
      </div>
    </div>
  )


  render() {
    return (
      <UserDashboardSidebar>
        <div>
          <h1>My Cart</h1>
          <div className='user_cart'>
            <UserProductBlock
              products={this.props.user}
              type='cart'
              removeItem={ (id) => this.removeFromCart(id) }
            />
            {
              this.state.showTotal ?
                <div>
                  <div className='user_cart_sum'>
                    <div>
                      Total amount: $ {this.state.total}
                    </div>
                  </div>
                </div>

              : this.state.showSuccess ?
                  <div className='cart_success'>
                    <FontAwesomeIcon icon={faSmile} />
                    <div>
                      THANK YOU
                    </div>
                    <div>
                      YOUR ORDER IS NOW COMPLETE
                    </div>
                  </div>

                : this.showNoItemMessage()
            }
          </div>
        </div>
      </UserDashboardSidebar>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

const mapActionsToProps = {
  getCartItems,
  removeCartItem
}

export default connect(mapStateToProps, mapActionsToProps)(UserCart)
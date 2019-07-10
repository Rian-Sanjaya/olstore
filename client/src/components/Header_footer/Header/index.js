import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logoutUser } from '../../../actions/user_action';

class Header extends Component {
  state = {
    publicLinks: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true
      }
    ],
    userLinks: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Log in',
        linkTo: '/register_login',
        public: true
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false
      }
    ]
  }

  componentDidUpdate() {
    if (this.props.logout && this.props.logout.success) {
      this.props.history.push('/')
    }
  }

  logoutHandler = () => {
    this.props.logoutUser()
  }

  cartLink = (item, i) => {
    const { authUser } = this.props

    return (
      <div className='cart_link' key={i}>
        <span>{authUser.cart ? authUser.cart.length : 0}</span>
        <Link to={item.linkTo}>
          {item.name}
        </Link>
      </div>
    )
  }

  defaultLink = (item, i) => (
    // make Log out a function, not a link
    item.name === 'Log out' ? 
      <div className='log_out_link'
        key={i}
        onClick={ () => this.logoutHandler() }
      >
        {item.name}
      </div>
    : <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
  )

  showLinks = (links) => {
    const { authUser } = this.props

    let list = []

    if (authUser) {
      links.forEach( (item) => {
        if (!authUser.isAuth) {
          if (item.public === true) {
            list.push(item)
          }
        } else {
          if (item.name !== 'Log in') {
            list.push(item)
          }
        }
      }) 
    }

    return list.map( (item, i) => {
      if (item.name !== 'My Cart') {
        return this.defaultLink(item, i)
      } else {
        return this.cartLink(item, i)
      }
    })
  }

  render() {
    const { userLinks, publicLinks } = this.state

    return (
      <header className='bck_b_light'>
        <div className='container'>
          <div className='left'>
            <div className='logo'>
              Waves
            </div>
          </div>

          <div className='right'>
            <div className='top'>
              {this.showLinks(userLinks)}
            </div>
            <div className='bottom'>
              {this.showLinks(publicLinks)}
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    authUser: state.user.authUser,
    logout: state.user.logout
  }
}

const mapActionsToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Header))
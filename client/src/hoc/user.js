import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const userLinks = [
  {
    name: 'My Account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'User Information',
    linkTo: '/user/user_profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
]

const adminLinks = [
  {
    name: 'Site info',
    linkTo: '/admin/site_info'
  },
  {
    name: 'Add products',
    linkTo: '/admin/add_product'
  },
  {
    name: 'Manage categories',
    linkTo: '/admin/manage_categories'
  },
  {
    name: 'Upload file',
    linkTo: '/admin/add_file'
  }
]

const UserDashboardSidebar = (props) => {

  const generateLinks = (links) => (
    links.map( (item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ))
  )

  return (
    <div className='container'>
      <div className='user_container'>
        <div className='user_left_nav'>
          <h2>My Account</h2>
          
          <div className='links'>
            {generateLinks(userLinks)}
          </div>

          {
            props.authUser.isAdmin ?
              <div>
                <h2>Admin</h2>
                <div className='links'>
                  {generateLinks(adminLinks)}
                </div>
              </div>
            : null
          }
        </div>

        <div className='user_right'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    authUser: state.user.authUser
  }
}

export default connect(mapStateToProps)(UserDashboardSidebar)
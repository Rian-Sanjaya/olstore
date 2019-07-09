import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/user_action'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function(ComponentPass, redirect, adminRoute = null) {

  class AuthenticationCheck extends Component {
    // state = {
    //   loading: true
    // }

    componentDidMount() {
      this.props.auth()
    }

    componentDidUpdate() {
      const { authUser } = this.props

      if (!authUser.isAuth) {
        if (redirect) {
          this.props.history.push('/register_login')
        }
      } else {
        if (redirect === false) {
          this.props.history.push('/user/dashboard')
        }
      }
    }

    render() {
      const { authUser } = this.props

      if (authUser.loading) {
        return (
          <div className='main_loader'>
            <CircularProgress style={{color: '#2196F3'}} thickness={7} />
          </div>
        )
      }

      return (
        <ComponentPass {...this.props} user={authUser} />
      )
    }
  }

  const mapStateToProps = (state, props) => {
    return {
      authUser: state.user.authUser
    }
  }

  const mapActionsToProps = {
    auth
  }

  return connect(mapStateToProps, mapActionsToProps)(AuthenticationCheck)
}
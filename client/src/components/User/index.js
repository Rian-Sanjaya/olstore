import React from 'react'
import MyButton from '../utils/button'
import UserDashboardSidebar from '../../hoc/user'

const UserDashboard = () => {
  return (
    <UserDashboardSidebar>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>name</span>
            <span>lastname</span>
            <span>email</span>
          </div>
          <MyButton
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
          />
        </div>

        <div className="user_nfo_panel">
          <h1>History purchases</h1>            
        </div>
      </div>
    </UserDashboardSidebar>
  )
}

export default UserDashboard
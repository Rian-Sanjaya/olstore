import React from 'react'
import MyButton from '../utils/button'
import UserDashboardSidebar from '../../hoc/user'

const UserDashboard = (props) => {
  const { authUser } = props

  return (
    <UserDashboardSidebar>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>{authUser.name}</span>
            <span>{authUser.lastname}</span>
            <span>{authUser.email}</span>
          </div>
          <MyButton
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
          />
        </div>

        {/* {
          authUser.history ? 
            <div className="user_nfo_panel">
              <h1>History purchases</h1>
              <div className='user_product_block_wrapper'>
                History
              </div>      
            </div>
          : null
        } */}

      </div>
    </UserDashboardSidebar>
  )
}

// const mapStateToProps = (state, props) => {
//   return {
//     authUser: state.user.authUser
//   }
// }

// export default connect(mapStateToProps)(UserDashboard)

export default UserDashboard
import React from 'react'
import UserDashboardSidebar from '../../hoc/user'
import UpdatePersonalNfo from './update_personal_nfo'

const UpdateProfile = () => {
  return (
    <UserDashboardSidebar>
      <h1>Profile</h1>
      <UpdatePersonalNfo />
    </UserDashboardSidebar>
  )
}

export default UpdateProfile
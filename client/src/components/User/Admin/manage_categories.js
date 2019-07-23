import React from 'react'
import UserDashboardSidebar from '../../../hoc/user'
import ManageBrands from './manage_brands'
import ManageWoods from './manage_woods'

const ManageCategories = () => {
  return (
    <UserDashboardSidebar>
      <ManageBrands />
      <ManageWoods />
    </UserDashboardSidebar>
  )
}

export default ManageCategories
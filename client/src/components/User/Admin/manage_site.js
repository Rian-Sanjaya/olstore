import React from 'react'
import UserDashboardSidebar from '../../../hoc/user'
import UpdateSiteNfo from './update_site_nfo'

const ManageSite = () => {
  return (
      <UserDashboardSidebar>
         <UpdateSiteNfo />
      </UserDashboardSidebar>
  );
};

export default ManageSite;
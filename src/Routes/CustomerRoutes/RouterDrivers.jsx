import React from 'react'
import { Route, Routes } from "react-router-dom";

import Drivers from '../../Components/Customer/Drivers/Drivers';
import NewDriver from '../../Components/Customer/Drivers/NewDriver';
import EditDriver from '../../Components/Customer/Drivers/EditDriver';

/**
 * 
 * @export
 * @function RouterDrivers
 * @description Router for Drivers routes 
 */
function RouterDrivers(props) {
  return (
    <Routes>
      <Route path="" element={<Drivers {...props} />} />
      <Route path="new" element={<NewDriver {...props} />} />
      <Route path="edit/:driver_id" element={<EditDriver {...props} />} />
    </Routes>
  )
}

export default RouterDrivers
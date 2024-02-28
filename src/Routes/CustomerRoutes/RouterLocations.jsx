import React from 'react'
import { Route, Routes } from "react-router-dom";

import Locations from '../../Components/Customer/Locations/Locations';
import NewLocation from '../../Components/Customer/Locations/NewLocation';
import EditLocation from '../../Components/Customer/Locations/EditLocation';

/**
 * 
 * @export
 * @function RouterLocations
 * @description Router for Locations routes 
 */
function RouterLocations(props) {
  return (
    <Routes>
      <Route path="" element={<Locations {...props} />} />
      <Route path="new" element={<NewLocation {...props} />} />
      <Route path="edit/:location_id" element={<EditLocation {...props} />} />
    </Routes>
  )
}

export default RouterLocations
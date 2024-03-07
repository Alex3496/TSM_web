import React from 'react'
import { Route, Routes } from "react-router-dom";

import Trailers from '../../Components/Customer/Trailers/Trailers';
import NewTrailer from '../../Components/Customer/Trailers/NewTrailer';
import EditTrailer from '../../Components/Customer/Trailers/EditTrailer';

/**
 * 
 * @export
 * @function RouterTrailers
 * @description Router for Trailers routes 
 */
function RouterTrailers(props) {
  return (
    <Routes>
      <Route path="" element={<Trailers {...props} />} />
      <Route path="new" element={<NewTrailer {...props} />} />
      <Route path="edit/:trailer_id" element={<EditTrailer {...props} />} />
    </Routes>
  )
}

export default RouterTrailers
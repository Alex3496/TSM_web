import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Rutas principales
import RouterPublic from './Routes/PublicRoutes';
import RouterCustomer from './Routes/CustomerRoutes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<RouterPublic />} />
        <Route path="/customer/*" element={<RouterCustomer />} />
      </Routes>
    </Router>
  );
}

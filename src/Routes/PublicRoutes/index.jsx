import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';
// Components
import Login from '../../Components/Auth/login';

/**
 * 
 * @export
 * @function PublicRoutes
 * @description Router for handling all public routes
 */
function PublicRoutes() {

  return (
    <Layout className="layout-login">
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </Layout>
  )
}

export default PublicRoutes;
import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';

// Components
import Login from '../../Components/Auth/login';
import Register from '../../Components/Auth/register';

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
        <Route path='/register' element={<Register />} />
      </Routes>
    </Layout>
  )
}

export default PublicRoutes;
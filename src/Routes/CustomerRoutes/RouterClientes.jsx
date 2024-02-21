import React from 'react'
import { Route, Routes } from "react-router-dom";

import Clientes from '../../Components/Customer/Clientes/Clientes';
import NewCliente from '../../Components/Customer/Clientes/NewCliente';
import EditCliente from '../../Components/Customer/Clientes/EditCliente';

/**
 * 
 * @export
 * @function RouterClientes
 * @description Router for Clientes routes 
 */
function RouterClientes(props) {
  return (
    <Routes>
      <Route path="" element={<Clientes {...props} />} />
      <Route path="new" element={<NewCliente {...props} />} />
      <Route path="edit/:cliente_id" element={<EditCliente {...props} />} />
    </Routes>
  )
}

export default RouterClientes
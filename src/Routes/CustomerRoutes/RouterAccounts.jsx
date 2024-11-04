import React from 'react'
import { Route, Routes } from "react-router-dom";

//Componetes
import Accounts from '../../Components/Customer/Accounts/Accounts';
/**
 * 
 * @export
 * @function RouterAccounts
 * @description Router para el modulo de Cuentas 
 */
function RouterAccounts(props) {
  return (
    <Routes>
      <Route path="" element={<Accounts {...props} />} />
    </Routes>
  )
}

export default RouterAccounts
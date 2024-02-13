import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from 'antd';

//COMPONENTES
import Sidebar from "../../Components/Customer/Sidebar";
import Header from "../../Components/Customer/Header/header";

//Rutas
import RouterClientes from "./RouterClientes"



const { Content } = Layout

/**
 * 
 * @export
 * @function CustomerRoutes
 * @description Contiene la base principal ed la vista princial del cliente del sistema
 */
class CustomerRoutes extends React.Component {

	constructor(props) {
		super(props)
		
	}

	componentDidMount() {
		
	}

	render() {

		return (
			<Layout>
				<Header/>
				<Layout>
					<Sidebar/>
					<Content style={{ minHeight: 'calc(100vh - 100px)' }}>
		                <Routes>
		                 	<Route path='/customers/*'         element={<RouterClientes/>} />
		                </Routes>
		             </Content>
				</Layout>
			</Layout>
		)
	}


}
export default function (props) {

	const navigate = useNavigate()

	return <CustomerRoutes {...props} navigate={navigate} />
}
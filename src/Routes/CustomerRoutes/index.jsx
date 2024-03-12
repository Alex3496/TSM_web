import React, { useContext } from 'react'
import { Layout } from 'antd';
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";

//COMPONENTES
import Sidebar from "../../Components/Customer/Sidebar";
import Header from "../../Components/Customer/Header/header";

//Rutas
import RouterDrivers from "./RouterDrivers";
import RouterClientes from "./RouterClientes";
import RouterTrailers from "./RouterTrailers";
import RouterLocations from "./RouterLocations";



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
		axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
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
		                 	<Route path='/locations/*'         element={<RouterLocations/>} />
		                 	<Route path='/trailers/*'         element={<RouterTrailers/>} />
		                 	<Route path='/drivers/*'         element={<RouterDrivers/>} />
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
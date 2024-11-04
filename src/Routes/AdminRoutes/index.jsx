import React, { useContext } from 'react'
import { Layout } from 'antd';
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";

//COMPONENTES
import Sidebar from "../../Components/Customer/Sidebar";
import Header from "../../Components/Customer/Header/header";

//Rutas




const { Content } = Layout

/**
 * 
 * @export
 * @function AdminRoutes
 * @description Contiene la base principal de la vista princial del Admin del sistema
 */
class AdminRoutes extends React.Component {

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
		                 	
		                </Routes>
		             </Content>
				</Layout>
			</Layout>
		)
	}


}
export default function (props) {

	const navigate = useNavigate()

	return <AdminRoutes {...props} navigate={navigate} />
}
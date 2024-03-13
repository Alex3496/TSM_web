import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Layout, Button, Typography, Dropdown } from 'antd';

//componentes
import { User, SetUser } from '../../../Hooks/logged';


//css
import '../../../Styles/Header.scss'

const { Header } = Layout;
const { Text } = Typography;

const Main = () => {

	let user = useContext(User);
	let setUser = React.useContext(SetUser)
	const navigate = useNavigate()

	/**
	 * @const cerrarSesion
	 * @description Cierra la sesion
	 */
	const cerrarSesion = () => {
		setUser(undefined);
		sessionStorage.clear();
		navigate('/')

	};

	const items = [
	  	{
	    	label: "Log Out",
	    	key: '0',
	    	onClick: () => cerrarSesion(),
	  	},
	];


	return (
		<Header className="header">
			<Row>
				<Col span={4} className="center">
					<Text>TSM</Text>
				</Col>
				<Col span={16}>
				</Col>
				<Col span={4} className="center">
					<Dropdown
					    menu={{
					      items,
					    }}
					    trigger={['click']}
					>
						<Button
							type="ghost"
						>
							<Text>{user?.nombre}</Text>
						</Button>
					</Dropdown>
				</Col>
			</Row>
		</Header>
	);
};

export default Main;
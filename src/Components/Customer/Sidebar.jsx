import React from 'react';
import { Layout, Menu } from 'antd';
import { FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { PiSteeringWheelBold } from "react-icons/pi";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const App = () => {

	const navigate = useNavigate()

	return (
		<Sider
			width={200}
		>
			<Menu
				className="pt-2"
				mode="inline"
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				style={{
					height: '100%',
				}}
				items={[
					{
						key: "accounts",
						icon: <UserOutlined/>,
						label: "Cuentas",
						onClick: () => { navigate('/customer/accounts') }
					},
				]}
			/>
		</Sider>
	);
};
export default App;
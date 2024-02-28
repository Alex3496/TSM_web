import React from 'react';
import { useNavigate } from "react-router-dom";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

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
						key: "customers",
						icon: <UserOutlined/>,
						label: "Customers",
						onClick: () => { navigate('/customer/customers') }
					},
					{
						key: "locations",
						icon: <UserOutlined/>,
						label: "Locations",
						onClick: () => { navigate('/customer/locations') }
					},
					{
						key: "trailers",
						icon: <UserOutlined/>,
						label: "Trailes",
					},
					{
						key: "drivers",
						icon: <UserOutlined/>,
						label: "Drivers",
					}
				]}
			/>
		</Sider>
	);
};
export default App;
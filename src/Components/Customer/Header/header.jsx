import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col, Layout, Button, Typography } from 'antd';


//css
import '../../../Styles/Header.scss'

const { Header } = Layout;
const { Text } = Typography;

const Main = () => {


	return (
		<Header className="header">
			<Row>
				<Col span={4}>
				</Col>
				<Col span={16}>
				</Col>
				<Col span={4} className="center">
					<Button
						type="ghost"
					>
						<Text>USUARIO</Text>
					</Button>
				</Col>
			</Row>
		</Header>
	);
};

export default Main;
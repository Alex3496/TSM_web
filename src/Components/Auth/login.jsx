import React, { useState, useContext } from 'react'
import { Row, Col, Form, Input, Button, Checkbox, Spin, message, Typography } from "antd";

import axios from "axios";
import { useNavigate } from "react-router-dom";

//Componentes
import { User, SetUser } from '../../Hooks/logged';

const { Link } = Typography;

function App() {

	const navigate = useNavigate()
	let user = useContext(User);
	let setUser = React.useContext(SetUser)

	/**
	 * @function onFinish
	 * @description Realia la peticion para iniciar sesion con las credenciales adecuadas
	 * */
	const onFinish = (values) => {
		axios.post('/login',{
			...values
		}).then(({data, headers}) => {
			setUser(data.user)
			sessionStorage.setItem('token', headers.authorization);
			axios.defaults.headers.common['Authorization'] =  headers.authorization;
			navigate('/customer')

		}).catch(error => {
			console.log(error?.response?.data)
			message.error(error?.response?.data?.message ?? "Error al logear")
		})

	}


	return (
		<>
			<Row style={{minHeight: "100vh"}}>
				<Col span={24} className="center">
					<Form
						name="basic"
						className=""
						layout="vertical"
						onFinish={onFinish}
						style={{
							width: "100%",
							maxWidth: 400,
						}}
						initialValues={{
							remember: true,
						}}
						autoComplete="off"
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						{/*<Form.Item
							name="remember"
							valuePropName="checked"
						>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>*/}

						<Form.Item>
							<Button type="primary" htmlType="submit" block>
								Submit
							</Button>
						</Form.Item>
						<Link onClick={()=>navigate('/register')}>Create an account</Link>
					</Form>
				</Col>
			</Row>
		</>
	)
}

export default App

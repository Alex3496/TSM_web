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
		axios.post('/register',{
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
							label="Full Name"
							name="nombre"
							rules={[
								{
									required: true,
									message: 'Please input your name',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Last Name"
							name="apellidos"
							rules={[
								{
									required: true,
									message: 'Please input your last name',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
					        name="email"
					        label="E-mail"
					        rules={[
					         	{
					            	type: 'email',
					            	message: 'The input is not valid E-mail!',
					          	},
					          	{
					            	required: true,
					            	message: 'Please input your E-mail!',
					          	},
					        ]}
					     >
					        <Input />
					     </Form.Item>

						<Form.Item
					        name="password"
					        label="Password"
					        rules={[
					          {
					            required: true,
					            message: 'Please input your password!',
					          },
					        ]}
					        hasFeedback
					      >
					        <Input.Password />
					      </Form.Item>

					    <Form.Item
					        name="confirm"
					        label="Confirm Password"
					        dependencies={['password']}
					        hasFeedback
					        rules={[
					         	{
					            	required: true,
					            	message: 'Please confirm your password!',
					          	},
					          	({ getFieldValue }) => ({
					            	validator(_, value) {
					              		if (!value || getFieldValue('password') === value) {
					                		return Promise.resolve();
					              		}
					              		return Promise.reject(new Error('The new password that you entered do not match!'));
					            	},
					          	}),
					        ]}
					      >
					        <Input.Password />
					    </Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit" block>
								Register
							</Button>
						</Form.Item>
						<Link>Create an account</Link>
					</Form>
				</Col>
			</Row>
		</>
	)
}

export default App

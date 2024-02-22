import { useState } from 'react'
import { Row, Col, Form, Input, Button, Checkbox, Spin, message } from "antd";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {

	const navigate = useNavigate()

	/**
	 * @function onFinish
	 * @description Realia la peticion para iniciar sesion con las credenciales adecuadas
	 * */
	const onFinish = (values) => {
		axios.post('/login',{
			...values
		}).then(({data, headers}) => {
			console.log(data)
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
					</Form>
				</Col>
			</Row>
		</>
	)
}

export default App

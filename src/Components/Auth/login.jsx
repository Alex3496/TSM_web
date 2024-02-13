import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";

function App() {

	const navigate = useNavigate()

	const onFinish = (values) => {
		console.log(values)
		navigate('/customer')
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
							maxWidth: 600,
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

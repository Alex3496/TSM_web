import React from 'react';
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Card, Row, Col, Button, Typography, Form, Input, Divider, Space, Select, Switch, InputNumber, message } from 'antd';
import axios from "axios";

//componentes
import SelectPais from "../../Widget/Input/SelectPais"
import SelectEstados from "../../Widget/Input/SelectEstados"

const {  Content } = Layout;
const { Title, Text } = Typography;

/**
 * 
 * @export
 * @function Clientes
 * @description Vista principal de clientes
 */
class Clientes extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			pais_id: undefined,
			loading: false,
		}
	}

	fomrRef = React.createRef();

	/**
	 * 
	 * @method onFinish
	 * @description Se ejecuta al hacer submit al formulario  
	 * */
	onFinish = (values) => {
		console.log(values)
		this.addCliente(values)
	}

	/**
	 * 
	 * @method onfinish
	 * @description Se ejecuta al hacer submit al formulario  
	 * */
	submit = () => {
		try{
			this.fomrRef.current.submit();
		}catch(error){
			console.log(error)
		}
	}

	/**
	 * 
	 * @method onfinish
	 * @description Se ejecuta al hacer submit al formulario  
	 * */
	addCliente = (values) => {
		this.setState({ loading: true })
		axios.post('/clientes',{
			...values
		}).then(response => {
			message.success("Customers created")
			this.props.navigate("/customer/customers")
		}).catch(error => {
			console.log(error)
			message.error("Error creating client")
		}).finally(()=>{
			this.setState({loading: false})
		})
	}

	render(){

		return (
			<Layout
				className="layout-content"
			>
				<Row>
					<Col span={12}>
						<Breadcrumb
							style={{
								margin: '16px 0',
							}}
						>
							<Breadcrumb.Item>Customers</Breadcrumb.Item>
							<Breadcrumb.Item>New Customer</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
					<Col span={12} className="flex-right">
						<Space>
							<Button onClick={()=>this.props.navigate("/customer/customers")}>Cancelar</Button>
							<Button onClick={()=>this.submit()}>Guardar</Button>
						</Space>
					</Col>
				</Row>
				<Content className="content-main" style={{maxHeight: "84vh", overflowY: "auto"}}>
					<Form
						layout="vertical"
						initialValues={{
							moneda: "MXN"
						}}
						ref={this.fomrRef}
						onFinish={this.onFinish}					
					>
						<Card>
							<Row gutter={[8,8]} className="" align="center">
								<Col span={10} className="">
									<Title level={5}>Customer General Information</Title>
								</Col>
								<Col span={10} className="">
									<Row gutter={[8,8]}>
										<Col span={12}>
											<Form.Item
												label="Name"
												name="nombre"
												rules={[
				                                    {
				                                        required: true,
				                                        message: 'Enter a name',
				                                    },
				                                ]}
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label="Last Name"
												name="apellidos"
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label="Email"
												name="email"
												rules={[
				                                    {
				                                        type: "email",
				                                        message: "Enter a valid email address"
				                                    },{
				                                        required: true,
				                                        message: 'Enter an email',
				                                    },
				                                ]}
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label="Phone"
												name="telefono"
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={24}>
										<Form.Item
											label="Notes"
											name="notas"
										>
											<Input.TextArea
												className="width-100"
											/>
										</Form.Item>
										</Col>
									</Row>
								</Col>
								<Divider/>
								<Col span={10} className="">
									<Title level={5}>Address</Title>
								</Col>
								<Col span={10} className="">
									<Row gutter={[8,8]}>
										<Col span={24}>
											<Form.Item
												label="Country"
												name="pais_id"
											>
												<SelectPais
													onSelect={(pais_id) => this.setState({pais_id})}
												/>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												label="Address Line 1"
												name="direccion1"
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												label="Address Line 2"
												name="direccion2"
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label="Postal Code"
												name="codigo_postal"
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label="City"
												name="ciudad"
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												label="State"
												name="estado_id"
											>
												<SelectEstados pais_id={this.state.pais_id}/>
											</Form.Item>
										</Col>
									</Row>
								</Col>
								<Divider/>
								<Col span={10} className="">
									<Title level={5}>Billing information</Title>
								</Col>
								<Col span={10} className="">
									<Row gutter={[8,8]}>
										<Col span={24}>
											<Form.Item
												label="Billing email"
												name="billing_email"
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												label="Billing contact"
												name="billing_contact"
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												label="Billing phone"
												name="billing_phone"
											>
												<Input/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label="Currency"
												name="moneda"
											>
												<Select
													options={[
														{ value: 'MXN', label: 'MXN' },
														{ value: 'USD', label: 'USD' },
														{ value: 'CAD', label: 'CAD' },
													]}
												/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label="Credit status"
												name="credito_status"
												valuePropName="checked"
											>
												<Switch/>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												label="Credit Limit"
												name="credito_limite"
											>
												<InputNumber className="width-100"/>
											</Form.Item>
										</Col>
									</Row>
								</Col>
							</Row>

						</Card>
					</Form>
				</Content>
			</Layout>
		)
	}
}
export default function(props){

	const navigate = useNavigate()

	return <Clientes {...props} navigate={navigate}/>
}
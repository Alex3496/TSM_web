import React from 'react';
import { Row, Col, Typography, Form, Input, Divider, Space, Select, Switch, InputNumber, message, DatePicker } from 'antd';

//componentes
import SelectPais from "../../../Widget/Input/SelectPais"
import SelectEstados from "../../../Widget/Input/SelectEstados"

const { Title, Text } = Typography;

/**
 * 
 * @export
 * @function FormDriver
 * @description Vista principal de clientes
 */
class FormDriver extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			pais_id: undefined,
			loading: false,
		}
	}

	fomrRef = React.createRef();

	componentDidUpdate(prevProps){
		if(this.props.pais_id != this.state.pais_id && this.state.pais_id === undefined){
			this.setState({pais_id: this.props.pais_id})
		}
	}

	render(){

		return (
			<Row gutter={[8,8]} className="" align="center">
				<Col xs={20} md={10} className="">
					<Title level={5}>Driver General Information</Title>
				</Col>
				<Col xs={20} md={10} className="">
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
					</Row>
				</Col>
				<Divider/>
				<Col xs={20} md={10} className="">
					<Title level={5}>Address</Title>
				</Col>
				<Col xs={20} md={10} className="">
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
				<Col xs={20} md={10} className="">
					<Title level={5}>Employee Information</Title>
				</Col>
				<Col xs={20} md={10} className="">
					<Row gutter={[8,8]}>
						<Col span={24}>
							<Form.Item
								label="Employee number"
								name="num_empleado"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								label="Driver OPS"
								name="driver_ops"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Status"
								name="status"
							>
								<Select
									options={[
										{ value: 1, label: 'Active' },
										{ value: 2, label: 'Incative' },
									]}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Driver Type"
								name="driver_type"
							>
								<Select
									options={[
										{ value: 1, label: 'Single' },
										{ value: 2, label: 'Team' },
									]}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Hiring date"
								name="fecha_contratacion"
							>
								<DatePicker className="width-100" needConfirm={false} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="License num"
								name="num_licencia"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="USA VISA num"
								name="num_visa_us"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Passport num"
								name="num_pasaporte"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Fast Card num"
								name="num_fast_card"
							>
								<Input/>
							</Form.Item>
						</Col>
					</Row>
				</Col>
			</Row>			
		)
	}
}
export default function(props){

	return <FormDriver {...props}/>
}
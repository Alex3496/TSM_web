import React from 'react';
import { Row, Col, Typography, Form, Input, Divider, Space, Select, Switch, InputNumber, message, TimePicker } from 'antd';

//componentes
import SelectPais from "../../../Widget/Input/SelectPais"
import SelectEstados from "../../../Widget/Input/SelectEstados"

const { Title, Text } = Typography;
/**
 * 
 * @export
 * @function FormCliente
 * @description Vista principal de clientes
 */
class FormCliente extends React.Component{

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
					<Title level={5}>General Information</Title>
				</Col>
				<Col xs={20} md={10} className="">
					<Row gutter={[8,8]}>
						<Col span={24}>
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
								label="Contact Name"
								name="nombre_contacto"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Contact Email"
								name="email_contacto"
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
						<Col span={12}>
							<Form.Item
								label="Working hours"
								name="horario"
							>
								<TimePicker.RangePicker format="HH:mm" className="width-100" use12Hours={true}/>
							</Form.Item>
						</Col>
						<Col span={24}>
						<Form.Item
							label="Notes"
							name="sites_notas"
						>
							<Input.TextArea
								className="width-100"
							/>
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
								label="State"
								name="estado_id"
							>
								<SelectEstados pais_id={this.state.pais_id}/>
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
					</Row>
				</Col>
			</Row>			
		)
	}
}
export default function(props){

	return <FormCliente {...props}/>
}
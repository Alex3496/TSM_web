import React from 'react';
import { Row, Col, Typography, Form, Input, Divider, Space, Select, Switch, InputNumber, message, TimePicker } from 'antd';

//componentes
import SelectPais from "../../../Widget/Input/SelectPais"
import SelectEstados from "../../../Widget/Input/SelectEstados"

const { Title, Text } = Typography;
/**
 * 
 * @export
 * @function FormTrailer
 * @description Vista principal de trailers
 */
class FormTrailer extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			loading: false,
		}
	}

	fomrRef = React.createRef();

	componentDidUpdate(prevProps){
		
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
								label="Trailer Number"
								name="trailer_number"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Brand"
								name="brand"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Model"
								name="model"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Year"
								name="year"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="VIN #"
								name="vin"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Plate Number"
								name="plate_number"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Plate State"
								name="plate_state"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Trailer Type"
								name="trailer_type"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Door Style"
								name="door_style"
							>
								<Input/>
							</Form.Item>
						</Col>
					</Row>
				</Col>
				<Divider/>
				<Col xs={20} md={10} className="">
					<Title level={5}>Dimensions</Title>
				</Col>
				<Col xs={20} md={10} className="">
					<Row gutter={[8,8]}>
						<Col span={8}>
							<Form.Item
								label="Length"
								name="length"
							>
								<InputNumber className="width-100"/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Width"
								name="width"
							>
								<InputNumber className="width-100"/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Height"
								name="height"
							>
								<InputNumber className="width-100"/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Number Axles"
								name="number_axles"
							>
								<Input/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Gross Weight"
								name="gross_weight"
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

	return <FormTrailer {...props}/>
}
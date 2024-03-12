import React from 'react';
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Card, Row, Col, Button, Typography, Form, Input, Divider, Space, Select, Switch, InputNumber, message } from 'antd';
import axios from "axios";

//componentes
import FormDriver from "./layouts/formDriver"
import SelectPais from "../../Widget/Input/SelectPais"
import SelectEstados from "../../Widget/Input/SelectEstados"

const {  Content } = Layout;
const { Title, Text } = Typography;

/**
 * 
 * @export
 * @function Drivers
 * @description Vista principal de drivers
 */
class Drivers extends React.Component{

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
		this.addDriver(values)
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
	addDriver = (values) => {
		this.setState({ loading: true })
		axios.post('/drivers',{
			...values
		}).then(response => {
			message.success("Drivers created")
			this.props.navigate("/customer/customers")
		}).catch(error => {
			console.log(error)
			message.error("Error creating driver")
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
							<Breadcrumb.Item>Drivers</Breadcrumb.Item>
							<Breadcrumb.Item>New Driver</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
					<Col span={12} className="flex-right">
						<Space>
							<Button onClick={()=>this.props.navigate("/customer/drivers")}>Cancel</Button>
							<Button onClick={()=>this.submit()} type="primary">Save</Button>
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
							<FormDriver pais_id={this.state.pais_id}/>
						</Card>
					</Form>
				</Content>
			</Layout>
		)
	}
}
export default function(props){

	const navigate = useNavigate()

	return <Drivers {...props} navigate={navigate}/>
}
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Card, Row, Col, Button, Typography, Form, Input, Divider, Space, Select, Switch, InputNumber, message } from 'antd';
import axios from "axios";

//componentes
import FormLocation from "./layouts/FormLocation"
import SelectPais from "../../Widget/Input/SelectPais"
import SelectEstados from "../../Widget/Input/SelectEstados"

const {  Content } = Layout;
const { Title, Text } = Typography;

/**
 * 
 * @export
 * @function Locations
 * @description Vista para añadir una nueva ubicacion
 */
class Locations extends React.Component{

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
		this.addLocation(values)
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
	addLocation = (values) => {
		this.setState({ loading: true })
		axios.post('/locations',{
			...values
		}).then(response => {
			message.success("Location created")
			this.props.navigate("/customer/locations")
		}).catch(error => {
			console.log(error)
			message.error("Error creating location")
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
							items={[
								{ title: "Locations" },
								{ title: "New Location" }
							]}
						/>
							
					</Col>
					<Col span={12} className="flex-right">
						<Space>
							<Button onClick={()=>this.props.navigate("/customer/locations")}>Cancel</Button>
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
							<FormLocation/>
						</Card>
					</Form>
				</Content>
			</Layout>
		)
	}
}
export default function(props){

	const navigate = useNavigate()

	return <Locations {...props} navigate={navigate}/>
}
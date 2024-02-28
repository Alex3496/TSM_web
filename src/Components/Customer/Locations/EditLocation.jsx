import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Layout, Card, Row, Col, Button, Typography, Form, Input, Divider, Space, Select, Switch, Popconfirm, message } from 'antd';
import axios from "axios";
import dayjs from "dayjs";

//componentes
import FormLocation from "./layouts/FormLocation"
import SelectEstados from "../../Widget/Input/SelectEstados"

const {  Content } = Layout;
const { Title, Text } = Typography;

/**
 * 
 * @export
 * @function EditLocation
 * @description Vista principal para editar una ubicacion
 */
class EditLocation extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			pais_id: undefined,
			loading: false,
		}
	}

	fomrRef = React.createRef();

	componentDidMount(){
		if(this.props.params?.location_id){
			this.getLocation()
		}
	}

	/**
	 * 
	 * @method onFinish
	 * @description Se ejecuta al hacer submit al formulario  
	 * */
	onFinish = (values) => {
		if(this.props.params?.location_id){
			this.updateLocation(values)
		}
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
	getLocation = () => {
		this.setState({ loading: true })
		axios.get('/locations/'+this.props.params.location_id)
		.then(response => {
			console.log("response", response.data);
			let location = response.data;

			this.setState({pais_id: location?.pais_id?._id})

			this.fomrRef.current.setFieldsValue({
				...location,
				horario:location.horario.length > 0 ? [dayjs(location.horario[0]),dayjs(location.horario[1])] : [],
				pais_id: location?.pais_id ? {
					value: location?.pais_id._id,
					label: location?.pais_id?.nombre
				} : null,
				estado_id: location?.estado_id?._id,
			})
		}).catch(error => {
			console.log(error)
			message.error("Error obtaining location information")
		}).finally(()=>{
			this.setState({loading: false})
		})
	}

	/**
	 * 
	 * @method onfinish
	 * @description Actualiza la informacion de un cliente
	 * */
	updateLocation = (values) => {
		this.setState({ loading: true })
		axios.put('/locations',{
			...values,
			location_id: this.props.params.location_id
		}).then(response => {
			message.success("Updated customer")
			this.props.navigate("/customer/locations")
		}).catch(error => {
			console.log(error)
			message.error("Error updating client")
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
							<Breadcrumb.Item>Locations</Breadcrumb.Item>
							<Breadcrumb.Item>Edit Location</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
					<Col span={12} className="flex-right">
						<Space>
							<Button onClick={()=>this.props.navigate("/customer/locations")}>Cancel</Button>
							<Button onClick={()=>this.submit()} type="primary">Update</Button>
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
							<FormLocation pais_id={this.state.pais_id}/>
						</Card>
					</Form>
					<Row>
						<Col span={24}>
							<Popconfirm
                                placement="topRight"
                                title="Do you want to delete this location?"
                                onConfirm={() => axios.delete('/locations',{
                                	params: {
                                		location_id: this.props.params?.location_id
                                	}
                                }).then(() => {
                                    this.props.navigate("/customer/locations")
                                    message.success('Location deleted')
                                }).catch(error => console.log(error))}
                                okText="Si"
                                cancelText="No"
                            >
                                <Button
                                   danger
                                >
                                	Delete Location
                                </Button>
                            </Popconfirm>
						</Col>
					</Row>
				</Content>
			</Layout>
		)
	}
}
export default function(props){

	const navigate = useNavigate()

	return <EditLocation {...props} navigate={navigate} params={useParams()}/>
}
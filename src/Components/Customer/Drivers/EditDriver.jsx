import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Layout, Card, Row, Col, Button, Typography, Form, Input, Divider, Space, Select, Switch, Popconfirm, message } from 'antd';
import axios from "axios";
import dayjs from "dayjs";

//componentes
import FormDriver from "./layouts/formDriver"
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

	componentDidMount(){
		if(this.props.params?.driver_id){
			this.getDriver()
		}
	}

	/**
	 * 
	 * @method onFinish
	 * @description Se ejecuta al hacer submit al formulario  
	 * */
	onFinish = (values) => {
		if(this.props.params?.driver_id){
			this.updateDriver(values)
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
	getDriver = () => {
		this.setState({ loading: true })
		axios.get('/drivers/'+this.props.params.driver_id)
		.then(response => {
			console.log("response", response.data);
			let driver = response.data;

			this.setState({pais_id: driver?.pais_id?._id})

			this.fomrRef.current.setFieldsValue({
				...driver,
				pais_id: driver?.pais_id ? {
					value: driver?.pais_id._id,
					label: driver?.pais_id?.nombre
				} : null,
				estado_id: driver?.estado_id?._id,
				fecha_contratacion: dayjs(driver.fecha_contratacion)
			})
		}).catch(error => {
			console.log(error)
			message.error("Error obtaining driver information")
		}).finally(()=>{
			this.setState({loading: false})
		})
	}

	/**
	 * 
	 * @method onfinish
	 * @description Actualiza la informacion de un cliente
	 * */
	updateDriver = (values) => {
		this.setState({ loading: true })
		axios.put('/drivers',{
			...values,
			driver_id: this.props.params.driver_id
		}).then(response => {
			message.success("Updated driver")
			this.props.navigate("/customer/drivers")
		}).catch(error => {
			console.log(error)
			message.error("Error updating driver")
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
							<Breadcrumb.Item>Edit Driver</Breadcrumb.Item>
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
					<Row>
						<Col span={24}>
							<Popconfirm
                                placement="topRight"
                                title="Do you want to delete this driver?"
                                onConfirm={() => axios.delete('/clientes',{
                                	params: {
                                		driver_id: this.props.params?.driver_id
                                	}
                                }).then(() => {
                                    this.props.navigate("/customer/drivers")
                                    message.success('Driver deleted')
                                }).catch(error => console.log(error))}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                   danger
                                >
                                	Delete Driver
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

	return <Drivers {...props} navigate={navigate} params={useParams()}/>
}
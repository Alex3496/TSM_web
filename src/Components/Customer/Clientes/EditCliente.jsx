import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Layout, Card, Row, Col, Button, Typography, Form, Input, Divider, Space, Select, Switch, Popconfirm, message } from 'antd';
import axios from "axios";

//componentes
import FormCliente from "./layouts/formCliente"
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

	componentDidMount(){
		if(this.props.params?.cliente_id){
			this.getCliente()
		}
	}

	/**
	 * 
	 * @method onFinish
	 * @description Se ejecuta al hacer submit al formulario  
	 * */
	onFinish = (values) => {
		if(this.props.params?.cliente_id){
			this.updateCliente(values)
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
	getCliente = () => {
		this.setState({ loading: true })
		axios.get('/clientes/'+this.props.params.cliente_id)
		.then(response => {
			console.log("response", response.data);
			let cliente = response.data;

			this.setState({pais_id: cliente?.pais_id?._id})

			this.fomrRef.current.setFieldsValue({
				...cliente,
				pais_id: cliente?.pais_id ? {
					value: cliente?.pais_id._id,
					label: cliente?.pais_id?.nombre
				} : null,
				estado_id: cliente?.estado_id?._id,
			})
		}).catch(error => {
			console.log(error)
			message.error("Error creating client")
		}).finally(()=>{
			this.setState({loading: false})
		})
	}

	/**
	 * 
	 * @method onfinish
	 * @description Actualiza la informacion de un cliente
	 * */
	updateCliente = (values) => {
		this.setState({ loading: true })
		axios.put('/clientes',{
			...values,
			cliente_id: this.props.params.cliente_id
		}).then(response => {
			message.success("Updated customer")
			this.props.navigate("/customer/customers")
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
							<Breadcrumb.Item>Customers</Breadcrumb.Item>
							<Breadcrumb.Item>Edit Customer</Breadcrumb.Item>
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
							<FormCliente pais_id={this.state.pais_id}/>
						</Card>
					</Form>
					<Row>
						<Col span={24}>
							<Popconfirm
                                placement="topRight"
                                title="Do you want to delete this customer?"
                                onConfirm={() => axios.delete('/clientes',{
                                	params: {
                                		cliente_id: this.props.params?.cliente_id
                                	}
                                }).then(() => {
                                    this.props.navigate("/customer/customers")
                                    message.success('Customer deleted')
                                }).catch(error => console.log(error))}
                                okText="Si"
                                cancelText="No"
                            >
                                <Button
                                   danger
                                >
                                	Delete Customer
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

	return <Clientes {...props} navigate={navigate} params={useParams()}/>
}
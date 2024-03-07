import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Layout, Card, Row, Col, Button, Typography, Form, Input, Divider, Space, Select, Switch, Popconfirm, message } from 'antd';
import axios from "axios";
import dayjs from "dayjs";

//componentes
import FormTrailer from "./layouts/FormTrailer"

const {  Content } = Layout;
const { Title, Text } = Typography;

/**
 * 
 * @export
 * @function EditTrailer
 * @description Vista principal para editar un trailer
 */
class EditTrailer extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			loading: false,
		}
	}

	fomrRef = React.createRef();

	componentDidMount(){
		if(this.props.params?.trailer_id){
			this.getTrailer()
		}
	}

	/**
	 * 
	 * @method onFinish
	 * @description Se ejecuta al hacer submit al formulario  
	 * */
	onFinish = (values) => {
		if(this.props.params?.trailer_id){
			this.updateTrailer(values)
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
	getTrailer = () => {
		this.setState({ loading: true })
		axios.get('/trailers/'+this.props.params.trailer_id)
		.then(response => {
			console.log("response", response.data);
			let trailer = response.data;

			this.fomrRef.current.setFieldsValue({
				...trailer,
			})
		}).catch(error => {
			console.log(error)
			message.error("Error obtaining trailer information")
		}).finally(()=>{
			this.setState({loading: false})
		})
	}

	/**
	 * 
	 * @method onfinish
	 * @description Actualiza la informacion de un cliente
	 * */
	updateTrailer = (values) => {
		this.setState({ loading: true })
		axios.put('/trailers',{
			...values,
			trailer_id: this.props.params.trailer_id
		}).then(response => {
			message.success("Updated trailer")
			this.props.navigate("/customer/trailers")
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
							items={[
								{
									title: "Trailers"
								},
								{
									title: "Edit Trailer"
								}
							]}
						/>
					</Col>
					<Col span={12} className="flex-right">
						<Space>
							<Button onClick={()=>this.props.navigate("/customer/trailers")}>Cancel</Button>
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
							<FormTrailer pais_id={this.state.pais_id}/>
						</Card>
					</Form>
					<Row>
						<Col span={24}>
							<Popconfirm
                                placement="topRight"
                                title="Do you want to delete this trailer?"
                                onConfirm={() => axios.delete('/trailers',{
                                	params: {
                                		trailer_id: this.props.params?.trailer_id
                                	}
                                }).then(() => {
                                    this.props.navigate("/customer/trailers")
                                    message.success('Trailer deleted')
                                }).catch(error => console.log(error))}
                                okText="Si"
                                cancelText="No"
                            >
                                <Button
                                   danger
                                >
                                	Delete Trailer
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

	return <EditTrailer {...props} navigate={navigate} params={useParams()}/>
}
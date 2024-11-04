import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Table, Row, Col, Button, Typography, message } from 'antd';

//Componentes
import ModalAccounts from "./ModalAccounts";

const {  Content } = Layout;
const { Text } = Typography;

/**
 * 
 * @export
 * @function Accounts
 * @description Vista principal de clientes
 */
class Accounts extends React.Component{


	constructor(props){
		super(props);
		this.state = {
			loading: false,
			clientes: {
                data: [],
                limit: 10,
                page: 1,
                total: 0,
                pages: 0,
            },
		}
	}

	componentDidMount(){
		axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
		this.getAccounts()
	}

	/**
	 * 
	 * @method getAccounts
	 * @description Obtiene la lista del clientes
	 * */
	getAccounts = ({
        page = this.state.clientes.page,
        limit = this.state.clientes.limit,
        search = this.props.search,
    } = this.state.clientes) => {

		this.setState({ loading: true })
		axios.get('/clientes',{
			params:{
				page,
				limit
			}
		}).then(response => {
			this.setState({
				clientes: response.data
			})
		}).catch(error => {
			console.log(error)
			message.error(error?.response?.data?.message ?? "Error getting clients")
		}).finally(()=>{
			this.setState({loading: false})
		})
	}

	render(){

		const columns = [
			{
			    title: 'Nombre',
			    dataIndex: 'nombre',
			    key: 'nombre',
			    render: (text, record) => (
			     	<Text>{record.nombre} {record.apellidos}</Text>
			    ),
			},
  			{
    			title: 'Terminación',
    			dataIndex: 'terminacion',
    			key: 'terminacion',
  			},
  			{
    			title: 'Saldo',
    			dataIndex: 'saldo',
    			key: 'saldo',
  			},
		];

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
									title: 'Cuentas',
								}
							]}
						/>
					</Col>
					<Col span={12} className="flex-right">
						<Button 
							type="primary" 
							onClick={()=>{this.setState({modal_visible: true})}}
						>Añadir Cuenta</Button>
					</Col>
				</Row>
				<Content className="content-main">
					<Table
						dataSource={this.state.clientes.data} 
						columns={columns}
						rowClassName="hover"
						rowKey="_id"
						onRow={(record, rowIndex) => {
						    return {
						      	onClick: (event) => {
						      		this.props.navigate('/customer/customers/edit/'+record._id)
						      	},
						    };
						}}
					/>
				</Content>
				<ModalAccounts
					visible={this.state.modal_visible}
					onClose={()=>this.setState({modal_visible: false})}
				/>
			</Layout>
		)
	}
}
export default function(props){

	const navigate = useNavigate()

	return <Accounts {...props} navigate={navigate}/>
}
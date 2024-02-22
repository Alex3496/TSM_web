import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Table, Row, Col, Button, Typography, message } from 'antd';

const {  Content } = Layout;
const { Text } = Typography;

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
		this.getClientes()
	}

	/**
	 * 
	 * @method getClientes
	 * @description Obtiene la lista del clientes
	 * */
	getClientes = ({
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
			    title: 'Name',
			    dataIndex: 'nombre',
			    key: 'nombre',
			    render: (text, record) => (
			     	<Text>{record.nombre} {record.apellidos}</Text>
			    ),
			},
  			{
    			title: 'Email',
    			dataIndex: 'email',
    			key: 'email',
  			},
  			{
    			title: 'Phone',
    			dataIndex: 'telefono',
    			key: 'telefono',
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
									title: 'Customers',
								}
							]}
						/>
					</Col>
					<Col span={12} className="flex-right">
						<Button 
							type="primary" 
							onClick={()=>{this.props.navigate('/customer/customers/new')}}
						>Add customer</Button>
					</Col>
				</Row>
				<Content className="content-main">
					<Table 
						dataSource={this.state.clientes.data} 
						columns={columns}
						rowClassName="hover"
						onRow={(record, rowIndex) => {
						    return {
						      	onClick: (event) => {
						      		this.props.navigate('/customer/customers/edit/'+record._id)
						      	},
						    };
						}}
					/>
				</Content>
			</Layout>
		)
	}
}
export default function(props){

	const navigate = useNavigate()

	return <Clientes {...props} navigate={navigate}/>
}
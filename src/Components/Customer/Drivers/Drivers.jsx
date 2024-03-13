import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Table, Row, Col, Button, Typography, message } from 'antd';

const {  Content } = Layout;
const { Text } = Typography;

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
			loading: false,
			drivers: {
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
		this.getDrivers()
	}

	/**
	 * 
	 * @method getDrivers
	 * @description Obtiene la lista del drivers
	 * */
	getDrivers = ({
        page = this.state.drivers.page,
        limit = this.state.drivers.limit,
        search = this.props.search,
    } = this.state.drivers) => {

		this.setState({ loading: true })
		axios.get('/drivers',{
			params:{
				page,
				limit
			}
		}).then(response => {
			this.setState({
				drivers: response.data
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
									title: 'Drivers',
								}
							]}
						/>
					</Col>
					<Col span={12} className="flex-right">
						<Button 
							type="primary" 
							onClick={()=>{this.props.navigate('/customer/drivers/new')}}
						>Add driver</Button>
					</Col>
				</Row>
				<Content className="content-main">
					<Table 
						dataSource={this.state.drivers.data} 
						columns={columns}
						rowClassName="hover"
						onRow={(record, rowIndex) => {
						    return {
						      	onClick: (event) => {
						      		this.props.navigate('/customer/drivers/edit/'+record._id)
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

	return <Drivers {...props} navigate={navigate}/>
}
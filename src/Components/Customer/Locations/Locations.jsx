import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Table, Row, Col, Button, Typography, message } from 'antd';

const {  Content } = Layout;
const { Text } = Typography;

/**
 * 
 * @export
 * @function Locations
 * @description Vista principal de locations
 */
class Locations extends React.Component{


	constructor(props){
		super(props);
		this.state = {
			loading: false,
			locations: {
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
		this.getLocations()
	}

	/**
	 * 
	 * @method getLocations
	 * @description Obtiene la lista de ubicaciones
	 * */
	getLocations = ({
        page = this.state.locations.page,
        limit = this.state.locations.limit,
        search = this.props.search,
    } = this.state.locations) => {

		this.setState({ loading: true })
		axios.get('/locations',{
			params:{
				page,
				limit
			}
		}).then(response => {
			this.setState({
				locations: response.data
			})
		}).catch(error => {
			console.log(error)
			message.error(error?.response?.data?.message ?? "Error getting locations")
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
    			title: 'Address',
    			dataIndex: 'Address',
    			key: 'address',
    			render: (text, record) => (
			     	<Text>{record.direccion1} {record.direccion2}, {record.ciudad}, {record?.estado_id?.nombre}, {record?.pais_id?.codigo_3}, {record?.codigo_postal}</Text>
			    ),
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
									title: 'Locations',
								}
							]}
						/>
					</Col>
					<Col span={12} className="flex-right">
						<Button 
							type="primary" 
							onClick={()=>{this.props.navigate('/customer/locations/new')}}
						>Add location</Button>
					</Col>
				</Row>
				<Content className="content-main">
					<Table 
						dataSource={this.state.locations.data} 
						columns={columns}
						rowClassName="hover"
						onRow={(record, rowIndex) => {
						    return {
						      	onClick: (event) => {
						      		this.props.navigate('/customer/locations/edit/'+record._id)
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

	return <Locations {...props} navigate={navigate}/>
}
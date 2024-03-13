import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Table, Row, Col, Button, Typography, message } from 'antd';

const {  Content } = Layout;
const { Text } = Typography;

/**
 * 
 * @export
 * @function Trailers
 * @description Vista principal de trailers
 */
class Trailers extends React.Component{


	constructor(props){
		super(props);
		this.state = {
			loading: false,
			trailers: {
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
		this.getTrailers()
	}

	/**
	 * 
	 * @method getTrailers
	 * @description Obtiene la lista de ubicaciones
	 * */
	getTrailers = ({
        page = this.state.trailers.page,
        limit = this.state.trailers.limit,
        search = this.props.search,
    } = this.state.trailers) => {

		this.setState({ loading: true })
		axios.get('/trailers',{
			params:{
				page,
				limit
			}
		}).then(response => {
			this.setState({
				trailers: response.data
			})
		}).catch(error => {
			console.log(error)
			message.error(error?.response?.data?.message ?? "Error getting trailers")
		}).finally(()=>{
			this.setState({loading: false})
		})
	}

	render(){

		const columns = [
			{
			    title: 'Model',
			    dataIndex: 'model',
			    key: 'model',
			    render: (text, record) => (
			     	<Text>{record.model}</Text>
			    ),
			},
  			{
    			title: 'Brand',
    			dataIndex: 'Brand',
    			key: 'brand',
    			render: (text, record) => (
			     	<Text>{record.brand}</Text>
			    ),
  			},
  			{
    			title: 'Length',
    			dataIndex: 'length',
    			key: 'length',
  			},
  			{
    			title: 'Width',
    			dataIndex: 'width',
    			key: 'width',
  			},
  			{
    			title: 'Hength',
    			dataIndex: 'height',
    			key: 'height',
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
									title: 'Trailers',
								}
							]}
						/>
					</Col>
					<Col span={12} className="flex-right">
						<Button 
							type="primary" 
							onClick={()=>{this.props.navigate('/customer/trailers/new')}}
						>Add trailer</Button>
					</Col>
				</Row>
				<Content className="content-main">
					<Table 
						dataSource={this.state.trailers.data} 
						columns={columns}
						rowClassName="hover"
						onRow={(record, rowIndex) => {
						    return {
						      	onClick: (event) => {
						      		this.props.navigate('/customer/trailers/edit/'+record._id)
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

	return <Trailers {...props} navigate={navigate}/>
}
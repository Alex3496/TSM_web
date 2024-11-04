import React, { Component } from "react";
import { Button, Form, Input, message, Modal, Spin, Typography, List, Row, Col, Select, InputNumber } from 'antd';
import axios from "axios";



const { Title } = Typography;
const { TextArea } = Input;

/**
 *
 *
 * @class ModalAccounts
 * @extends {React.Component}
 * @description Formulario de cuentas
 */
class ModalAccounts extends Component {


    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }


    /**
     * @methodOf ModalAccounts
     *
     * @function componentDidUpdate
     * @description Se ejecuta cuando se inicia el component, declara en el header el session storage
     *
     * */
    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        if (this.props.cuenta_id) {
            this.getCuenta()
        }
    }




    /**
    * @memberof ModalAccounts
    * @method getCuenta
    * @description  Obtiene la informacion de una cuenta
    *
    **/
    getCuenta = (values) => {
        this.setState({ loading: true })
        axios.get('/cuenta/'+this.props.cuenta_id)
        .then(({data}) => {
            

        }).catch(error => {
            message.error('Error al obtener la informacion')
            
        }).finally(() => this.setState({ loading: false }))
    }


    /**
    * @memberof ModalAccounts
    * @method updateCuenta
    * @description  Actualiza la informacion de una cuenta
    *
    **/
    updateCuenta = (values) => {
        this.setState({ loading: true })
        axios.put('/cuenta', {
            cuenta_id: this.props.cuenta_id,
            ...values
        })
        .then((response) => {
            message.success("Cuenta Actualizada");
            this.props.onClose()
        })
        .catch((error) => {
            message.error(error?.response?.data?.message ?? 'Error al actualizar la informacion')
        }).finally(() => this.setState({ loading: false }))
    }

    /**
    * @memberof ModalAccounts
    *
    * @method addCuenta
    * @description  Añade una cuenta
    **/
    addCuenta = (values) => {
        this.setState({ loading: true })
        axios.post('/cuenta', {
            ...values
        })
        .then((response) => {
            message.success("Cuenta creada");
            this.props.onClose();
        })
        .catch((error) => {
            
            message.error(error?.response?.data?.message ?? 'Error al actualizar la informacion')
        }).finally(() => this.setState({ loading: false }))
    }


    /**
    *
    *
    * @memberof ModalAccounts
    * 
    * @method onFinish
    * @description Cuando se guarda eltamano
    */
    onFinish = (values) => {
        if(this.props.cuenta_id){
            this.updateCuenta(values)
        }else {
            this.addCuenta(values)
        }
    } 

    render() {

        const { loading } = this.state;

        return (
            <Spin spinning={loading}>
                <Title level={3} className="text-center">  {`${this.props.id ? 'Editar' : 'Nueva'}  Cuenta`}</Title>
                <Form  
                	layout="vertical" 
                	ref={this.formRef} 
                	onFinish={this.onFinish}
                	initialValues={{
                		saldo: 0,
                		limite: 0,
                	}}
                >	
                	<Row gutter={[12,0]}>
                		<Col span={12}>
		                    <Form.Item
		                        label="Nombre"
		                        name="nombre"
		                        rules={[{ 
		                        	required: true, 
		                        	message: "Por favor, ingrese el nombre" 
		                        }]}
		                    >
		                        <Input placeholder="Nombre" maxLength={50}></Input>
		                    </Form.Item>
                		</Col>
                		<Col span={12}>
		                    <Form.Item
		                        label="Banco"
		                        name="banco"
		                        rules={[{ 
		                        	required: true, 
		                        	message: "Por favor, ingrese el Banco" 
		                        }]}
		                    >
		                        <Input placeholder="Banco" maxLength={50}></Input>
		                    </Form.Item>
                		</Col>
                		<Col span={12}>
		                    <Form.Item
		                        label="Terminación"
		                        name="terminacion"
		                        rules={[{ 
		                        	required: true, 
		                        	message: "Por favor, ingrese la terminación de la cuenta" 
		                        }]}
		                    >
		                        <Input placeholder="Terminación" maxLength={50}></Input>
		                    </Form.Item>
                		</Col>
                		<Col span={12}>
		                    <Form.Item
		                        label="Tipo de Cuenta"
		                        name="tipo"
		                        rules={[{ 
		                        	required: true, 
		                        	message: "Por favor, seleccione el tipo" 
		                        }]}
		                    >
		                        <Select
		                        	placeholder="Tipo"
		                        	options={[
		                        		{ value: 1, label: "Débito" },
		                        		{ value: 2, label: "Crédito" },
		                        	]}
		                        />
		                    </Form.Item>
                		</Col>
                		<Col span={12}>
		                    <Form.Item
		                        label="Saldo"
		                        name="saldo"
		                        rules={[{ 
		                        	required: true, 
		                        	message: "Por favor, ingrese el saldo" 
		                        }]}
		                    >
		                        <InputNumber className="width-100"/>
		                    </Form.Item>
                		</Col>
                		<Col span={12}>
		                    <Form.Item
		                        label="Limite de Cuenta"
		                        name="limite"
		                    >
		                        <InputNumber className="width-100"/>
		                    </Form.Item>
                		</Col>
                	</Row>

                    <Form.Item className="text-center">
                        <Button htmlType="submit" type="primary">
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>

        )
    }
}


export default function (props) {

    let { visible, onClose } = props

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            title={null}
            footer={null}
            maskClosable={true}
            destroyOnClose={true}
            zIndex={1000}
        >
            <ModalAccounts {...props} />
        </Modal>
    )
}
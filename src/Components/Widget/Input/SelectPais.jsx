import React, { useState, useEffect } from 'react';
import { Select, message } from 'antd'
import axios from "axios"

const { Option } = Select 

/**
 * @const SelectPais
 * @description Select para los paises registrados en el sistema
 */
const SelectPais = (props) => {

    const { 
        value, 
        onChange, 
        placeholder = "Select the country", 
        onSelect = () => {}, 
        disabled = false, 
        className = "", 
        params = {}, 
        bordered, 
        allowClear = true, 
        onClear = () => {},
        mode = null
    } = props

    const [ paises, setPaises ] = useState({
        data: [],
        page: 1,
        limit: 200,
        total: 0,
        search: null,
    })


    /**
     * @const getPaises
     * @description Obitiene los usaurios
     */
    const getPaises = ({
        page, 
        limit = paises.limit, 
        search, 
    } = paises) => {

        axios.get('/paises', {
            params: {
                page,
                limit,
                search,
                ...params,
            },
            headers: { Authorization: sessionStorage.getItem('token') }
        }).then(({ data }) => {
            setPaises(data)
        }).catch(error => {
            console.log("ERR, error",error)
            message.error(error?.response?.data?.message ?? 'Error al obtener los paises')
        })
    }

    //componentDidMount
    useEffect(() => {
        getPaises()
    }, [])

    useEffect(() => {
        if(value)
            onChange(value?.value ?? value)
    }, [value])


    return (
        <Select
            bordered={bordered}
            className={className}
            disabled={disabled}
            placeholder={placeholder}
            allowClear={allowClear}
            showSearch
            filterOption={false}
            labelInValue
            mode={mode}
            onSearch={(search)=> getPaises({search})}
            onSelect={(usuario)=> {
                if(mode === null){
                    onChange(usuario.value)
                    onSelect(usuario.value)
                }
            }}
            onChange={(values)=>{
                if(mode === "multiple"){
                    let arr = values.map(e => e.value)
                    onChange(arr)
                    onSelect(arr)
                }
            }}
            value={value}
            onClear={()=>{
                onClear()
                onChange(undefined)
                onSelect(undefined)
            }}
        >
            {
                paises?.data?.map(({ _id, nombre, apellidos }) => <Option value={_id} key={_id}>{nombre ?? ""} {apellidos ?? ""}</Option>)
            }
        </Select>
    );
}



export default SelectPais;
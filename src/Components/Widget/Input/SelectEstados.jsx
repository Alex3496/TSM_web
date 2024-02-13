import React, { useState, useEffect } from 'react';
import { Select, message } from 'antd'
import axios from "axios"

const { Option } = Select

/**
 * @const SelectEstado
 * @description Select para los estados registrados en el sistema
 */
const SelectEstado = (props) => {

    const {
        value,
        onChange,
        placeholder = "Select state",
        onSelect = () => { },
        disabled = false,
        className = "",
        params = {},
        bordered,
        allowClear = true,
        onClear = () => { },
        mode = null,

        pais_id = null
    } = props

    const [estados, setEstados] = useState({
        data: [],
        page: 1,
        limit: 50,
        total: 0,
        search: null,
        pais_id: undefined
    })


    /**
     * @const getEstados
     * @description Obitiene los usaurios
     */
    const getEstados = ({
        page,
        limit = estados.limit,
        search,
        pais_id = props.pais_id
    } = estados) => {

        axios.get('/estados', {
            params: {
                page,
                limit,
                search,
                pais_id,
                ...params,
            },
            headers: { Authorization: sessionStorage.getItem('token') }
        }).then(({ data }) => {
            setEstados(data)
        }).catch(error => {
            console.log("ERR, error", error)
            message.error(error?.response?.data?.message ?? 'Error al obtener los estados')
        })
    }
  
    //componentDidMount
    useEffect(() => {
        if (pais_id)
            getEstados()
    }, [pais_id])

    useEffect(() => {
        if (value)
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
            onSearch={(search) => getEstados({ search })}
            onSelect={(usuario) => {
                if (mode === null) {
                    onChange(usuario.value)
                    onSelect(usuario.value)
                }
            }}
            onChange={(values) => {
                if (mode === "multiple") {
                    let arr = values.map(e => e.value)
                    onChange(arr)
                    onSelect(arr)
                }
            }}
            value={value}
            onClear={() => {
                onClear()
                onChange(undefined)
                onSelect(undefined)
            }}
        >
            {
                estados?.data?.map(({ _id, nombre }) => <Option value={_id} key={_id}>{nombre ?? ""} </Option>)
            }
        </Select>
    );
}



export default SelectEstado;
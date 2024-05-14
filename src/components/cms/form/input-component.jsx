import { useEffect, useState } from "react"
import { Form, InputGroup } from "react-bootstrap"
import { Controller, set, useController } from "react-hook-form"

import Select from "react-select"

export const TextInput = ({ type = 'text', name, defaultValue = "", id = "text", required = false, placeholder = "Enter your text", errMsg = "", control, maxLength, }) => {
    const { field } = useController({
        control: control,
        name: name,
        defaultValue: defaultValue
    })
    return (
        <>
            <Form.Control
                type={type}
                size="sm"
                required={required}
                id={id}
                {...field}
                maxLength={maxLength}
                placeholder={placeholder}
            >

            </Form.Control>
            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}

export const SelectionButton=({name,id="select",options=[],defaultValue=null,errMsg=null,control,multiple=false})=>{
    const {field}=useController({
        name:name,
        control:control,
        defaultValue:defaultValue
    })
    return(
        <>
        <Select
            {...field}
            options={options}
            id={id}
            isMulti={multiple}
            isClearable={true}
        />
        <span className="text-danger">
            {errMsg}
        </span>
        </>
    )
}

export const SwitchCase=({name,control,defaultValue=false,id="switchcase",errMsg=""})=>{
    const {field}=useController({
        name:name,
        control:control
    })
    const [checked,setChecked]=useState()

    useEffect(()=>{
        setChecked(defaultValue)
    },[defaultValue])

    return(
        <>
            <Form.Check
                type="switch"
                defaultChecked={checked}
                id={id}
                label={"Yes"}
                onChange={(e)=>{
                    const isChecked=e.target.checked
                    
                    setChecked(isChecked)
                    field.onChange(isChecked)
                }}
            />
            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}
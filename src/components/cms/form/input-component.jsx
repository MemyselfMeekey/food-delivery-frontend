import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useController } from "react-hook-form"
import Select from "react-select"

export const TextAreaInput = ({ name, defaultValue = "", id = "text", required = false, placeholder = "Enter your text", errMsg = "", control }) => {
    const { field } = useController({
        control: control,
        name: name,
        defaultValue: defaultValue
    })
    return (
        <>
            <Form.Control
                as={'textarea'}
                size="sm"
                rows={5}
                style={{ resize: 'none' }}
                required={required}
                id={id}
                {...field}
                placeholder={placeholder}
            >

            </Form.Control>
            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}




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
                className="my-2"
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



export const TimeInput = ({ type = 'date', name, id = "time", required = true, errMsg = "", control }) => {
    const { field } = useController({
        control: control,
        name: name,
    })
    return (
        <>
            <Form.Control
                type={type}
                className="my-2"
                size="sm"
                required={required}
                id={id}
                {...field}
                placeholder={type === 'time' ? 'HH:MM' : 'YYYY-MM-DD'}
            >

            </Form.Control>
            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}


export const PassInput = ({ type = 'password', name, defaultValue = "", id = "password", required = false, placeholder = "Enter your password", errMsg = "", control, maxLength, }) => {
    const { field } = useController({
        control: control,
        name: name,
        defaultValue: defaultValue
    })
    return (
        <>
    
            <Form.Control
           
                type={type}
                className="my-2"
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

export const SelectionButton=({name,id="select",options=[],errMsg=null,control,multiple=false})=>{
    const {field}=useController({
        name:name,
        control:control,
     
    })
    return(
        <>
        <Select
            {...field}
            options={options}
            // isClearable={true}
            isClearable={true}
            id={id}
            isMulti={multiple}
        />
        <span className="text-danger">
            {errMsg}
        </span>
        </>
    )
}

export const DropDownInput = ({ name, id = "text", options = [], control, defaultValue = "", errMsg = null }) => {
    const { field } = useController({
        control: control,
        name: name,
        defaultValue: ""
    })
    return (
        <>
           
                <Form.Select
                    id={id}
                    size="sm"
                    {...field}>
                    <option value="">---SELECT ANY ONE---</option>
                    {
                        options && options.map((item, key) => (
                            <option key={key} value={item.value}>
                                {item.label}
                            </option>
                        ))
                    }

                </Form.Select>
            
            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}

export const SwitchCase=({name,control,defaultValue=false,id="switchcase",errMsg=""})=>{
    const {field}=useController({
        name:name,
        control:control,
        
    })
 
    const [checked,setChecked]=useState()

    useEffect(()=>{
        setChecked(defaultValue)
    },[defaultValue])
   
    return(
        <>
            <Form.Check
                type="switch"
                className="ml-4"
                defaultChecked={checked}
                id={id}
                label={checked===true ?"Yes":"No"}
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


export const MultipleFileUpload = ({ name, setValue, setError, errMsg, setThumb, allowed = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'bmp'], required = false }) => {
    return (
        <>
            <Form.Control
                type="file"
                size="sm"
                required={required}
                multiple={true}
                onChange={(e) => {
                    const images = Object.values(e.target.files)

                    let uploadableImages = []
                    if (images) {
                        images.map((image) => {
                            const ext = image.name.split(".").pop()
                            if (allowed.includes(ext.toLowerCase())) {
                                if (image.size <= 3000000) {
                                    uploadableImages.push(image)
                                }
                                else {
                                    setError([name], "File size should be less than 3MB")
                                }
                            }
                            else {
                                setError([name], "Invalid file format")
                            }
                        })
                        setValue(name, uploadableImages)
                        setThumb(uploadableImages)
                    }

                }}

            />
            <span className="text-danger">
                {errMsg}
            </span>
        </>

    )
}
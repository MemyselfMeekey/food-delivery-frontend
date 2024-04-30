import { Form, InputGroup } from "react-bootstrap"
import { Controller, useController } from "react-hook-form"
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
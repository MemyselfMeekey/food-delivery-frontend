import { Col, Form, Row, Container } from "react-bootstrap"
import { PassInput, TextInput } from "../../cms/form/input-component"
import { useForm } from "react-hook-form"
import { FormActionButtons } from "../../cms/form/form-action-buttons"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import AuthSvc from "./auth.service"
import { useNavigate } from "react-router-dom"

const ForgetPassword=()=>{

    const navigate=useNavigate()

   const{handleSubmit,control,formState:{errors}}= useForm()


    const submitForgetPass=async(data)=>{
        try{
            const response=await AuthSvc.forgetPass(data)
            toast.success(response.message)
            navigate("/")
        }
        catch(exception){
           toast.warn(exception.message)
           console.log(exception)
        }
    }

    return(
        <>
  
        <Container className="bg-light my-3 p-3">
            <Row>
                <Col>
                    <h1 className="text-center">Forget Password</h1>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm={12} md={{ offset: 1, span: 10 }} lg={{ offset: 2, span: 8 }}>

                    <Form onSubmit={handleSubmit(submitForgetPass)}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3 my-2" >Email</Form.Label>
                            <Col sm={9}>
                                <TextInput
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required={true}
                                    control={control}
                                    errMsg={errors?.email?.message}

                                />

                            </Col>
                            
                            <FormActionButtons
                                resetLabel="Reset"
                                submitLabel="Submit"
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

        </Container>


    </>)
}

export default ForgetPassword
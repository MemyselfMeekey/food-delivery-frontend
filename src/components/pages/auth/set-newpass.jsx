import { useNavigate, useParams } from "react-router-dom"
import { Col,Form,Row,Container, } from "react-bootstrap"
import { PassInput, TextInput } from "../../cms/form/input-component"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormActionButtons } from "../../cms/form/form-action-buttons"
import { useEffect } from "react"
import AuthSvc from "./auth.service"



const ForgetPassTokenVerfication=()=>{

    const navigate=useNavigate()

    const params=useParams()

    const rules=Yup.object({
        password:Yup.string().min(8).required(),
        confirmPassword:Yup.string().min(8).oneOf([Yup.ref("password"),null]).required()
    })


    const {handleSubmit,control,formState:{errors}}=useForm({
        resolver:yupResolver(rules)
    })

    const submitPasswords=async(data)=>{
        try{    
            const response=await AuthSvc.setForgetPass(data,params.token)
            toast.success(response.message)
            navigate("/")
        }
        catch(exception){
           toast.warn(exception.message)
           console.log(exception)
        }
    }

    const tokenVerification=async()=>{
        try{
            const response=await AuthSvc.forgetPassTokenVerify(params.token)
        }
        catch(exception){
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    useEffect(()=>{
        tokenVerification()
    },[])


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

                    <Form onSubmit={handleSubmit(submitPasswords)}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3 my-2" >New Password:</Form.Label>
                            <Col sm={9}>
                                <PassInput
                                    name="password"
                                    type="text"
                                    id="password"
                                    placeholder="Enter your password"
                                    required={true}
                                    control={control}
                                    errMsg={errors?.password?.message}

                                />

                            </Col>
                            <Form.Label className="col-sm-3 my-2" >Confirm Password:</Form.Label>
                            <Col sm={9}>
                                <PassInput
                                    name="confirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Re-enter your new password"
                                    required={true}
                                    control={control}
                                    errMsg={errors?.confirmPassword?.message}

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
        
        </>
    )
}
export default ForgetPassTokenVerfication
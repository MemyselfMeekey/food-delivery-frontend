import { useEffect, useState } from "react"
import { Col, Container, Form, Row, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { TextInput } from "../../cms/form/input-component"
import { FormActionButtons } from "../../cms/form/form-action-buttons"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import AuthSvc from "./auth.service"
import { toast } from "react-toastify"


const ActivateRegistration = () => {
    const navigate = useNavigate()
    const params = useParams()
    console.log(params.token)
    const [detail, setDetail] = useState()
    const [loading, setLoading] = useState(true)

    const rules = Yup.object({
        password: Yup.string().min(8).max(25).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password and confirm password doesnot match")
    })

    const { formState: { errors }, handleSubmit, control } = useForm({
        resolver: yupResolver(rules)
    })

    const getUserByToken=async()=>{
        try{
           console.log("hello i am in token verification")
            const response=await AuthSvc.tokenVerification(params.token)
            setDetail(response.result)
            setLoading(false)
        }
        catch(exception){
            if (exception.status===400 && exception.data.message==="Token has already been expired"){
                Swal.fire({
                    title: "<strong> Token has expired </strong>",
                    icon: "warning",
                    html:`Your link seems to be expired, Please <a href="/resendverification">Click here</a> to resend verification`,
                    showCancelButton: false,
               
        
                    
                    allowOutsideClick:false,
                    focusConfirm:false,
                    confirmButtonText:
                    `<i className="fa fa-thumbs-up"></i> Great!`
                    ,
                    confirmButtonAriaLabel: "Thumbs up, great!",
                    cancelButtonText: `
                      <i className="fa fa-thumbs-down"></i>
                    `,
                    cancelButtonAriaLabel: "Thumbs down"

                  })
            }
        }
    }



    useEffect(()=>{
        getUserByToken()
    },[])

    const submitAct=async(data)=>{
        try{
            setLoading(true)
            const response=await AuthSvc.userActivation(data,params.token)
            toast.success("Your account has been successfully activated. Please login ")
            navigate("/")
        }
        catch(exception){
            toast.error(exception.data.message)
        }
        finally{
            setLoading(false)
        }
    }
    
    console.log(errors)
    return (
        <>
            <Container className="my-5 bg-light">
                <Row>
                    <Col sm={12}>
                        <h1 className="text-center">Activate your account</h1>
                        <hr />
                    </Col>
                </Row>
                {
                    loading ? <>
                        <Row>
                            <Col sm={12} className="text-center my-3">
                                <Spinner variant="success" />
                            </Col>
                        </Row>
                    </> : <>
                        <Row>
                            <Col sm={{ offset: 1, span: 10 }}>
                                <Form onSubmit={handleSubmit(submitAct)}>
                                    <Form.Group className="row mb-3">
                                        <Form.Label className="col-sm-3">Password</Form.Label>
                                        <Col sm={9}>
                                            <TextInput
                                                type="password"
                                                id="Password"
                                                placeholder="Enter your password"
                                                name="password"
                                                required={true}
                                                control={control}
                                                errMsg={errors?.password?.message}
                                            />

                                        </Col>
                                    </Form.Group>
                                    <Form.Group className="row mb-3">
                                        <Form.Label className="col-sm-3">Confirm Password</Form.Label>
                                        <Col sm={9}>
                                            <TextInput
                                                type="password"
                                                id="confirmPassword"
                                                placeholder="Enter your password"
                                                name="confirmPassword"
                                                required={true}
                                                control={control}
                                                errMsg={errors?.confirmPassword?.message}
                                            />

                                        </Col>
                                    </Form.Group>
                                    <FormActionButtons
                                        resetLabel="Reset"
                                        submitLabel="Submit"
                                    />


                                </Form>
                            
                            </Col>
                        </Row>
                    </>
                }

            </Container>
        </>
    )

}
export default ActivateRegistration
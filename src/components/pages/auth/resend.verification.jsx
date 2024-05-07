import { Col, Container, Form, Row } from "react-bootstrap"
import { TextInput } from "../../cms/form/input-component"
import { FormActionButtons } from "../../cms/form/form-action-buttons"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AuthSvc from "./auth.service"


const ResendVerificationToken = () => {
    const navigate=useNavigate()
    const loginSchema=Yup.object({
        email:Yup.string().email().required(),
    })
    const {formState:{errors},handleSubmit,control}=useForm({
        resolver: yupResolver(loginSchema)
    })
    const submitEvent=async(data)=>{
        try{
           const response=await AuthSvc.resendVerification(data)
           console.log("Check your emial")
        }
        catch(exception){
            throw exception
        }
    }
    return (
        <>
            <Container className="bg-light my-3 p-3">
                <Row>
                    <Col>
                        <h4 className="text-center my=3">Resend Activation</h4>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col sm={12} md={{ offset: 1, span: 10 }} lg={{ offset: 2, span: 8 }}>
                        <Form onSubmit={handleSubmit(submitEvent)}>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Username</Form.Label>
                                <Col sm={9}>
                                    <TextInput
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        required={true}
                                        control={control}
                                        errMsg={errors?.email?.message}
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

            </Container>
        </>
    )
}
export default ResendVerificationToken
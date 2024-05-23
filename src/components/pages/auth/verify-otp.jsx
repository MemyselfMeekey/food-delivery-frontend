import { Container, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { FormActionButtons } from "../../cms/form/form-action-buttons";
import { useForm } from "react-hook-form";
import { TextInput } from "../../cms/form/input-component";
import { toast } from "react-toastify";
import AuthSvc from "./auth.service";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
    const navigate=useNavigate()


    const { formState: errors, handleSubmit, control } = useForm();

    const submitOtp = async (otp) => {
        try {
        
            const email=localStorage.getItem("_usr")
            
            const newData={
                email:email,
                ...otp
            }
          
            const response = await AuthSvc.otpRequest(newData)
            toast.success(response.message)
            navigate("/"+response.result.userDetail.role)

        }
        catch (exception) {
            toast.warn("Otp doesnot match")
            console.log("exception", exception)
        }
    };
    console.log(errors)
    return (
        <Container className="text-center">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <Form onSubmit={handleSubmit(submitOtp)}>
                        <Form.Group style={{ border: "2px solid grey", borderRadius: "10px", padding: "5px 7px 0 7px", backgroundColor: "aliceblue", marginTop: "30%" }}>
                            <h1 style={{ color: "tomato" }}>Otp Verification</h1>
                            <small><em>Please verify the 4-digit OTP provided to your email account</em></small>

                            <TextInput
                                type="text"
                                id="otp"
                                name="otp"
                                placeholder="Enter your otp"
                                required={true}
                                control={control}
                                errMsg={errors?.email?.message}
                                maxLength={4}

                            />

                            {/* <input
                                type="text"
                                id="otp"
                                name="otp"
                                placeholder="Enter your otp"
                                required={true}
                                control={control}
                                // errMsg={errors?.otp?.message}
                                maxLength={4}
                                // pattern="[0-9]{4}" // Pattern to match exactly 4 numeric digits
                            ></input> */}

                            <FormActionButtons
                                resetLabel="Reset"
                                submitLabel="Submit"
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default VerifyOtp;

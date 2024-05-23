import { Col, Form, Row, Container } from "react-bootstrap"
import { PassInput, TextInput } from "../../cms/form/input-component"
import { useForm } from "react-hook-form"
import { FormActionButtons } from "../../cms/form/form-action-buttons"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import AuthSvc from "./auth.service"
import { useNavigate } from "react-router-dom"

const ChangePassword = () => {

    const navigate=useNavigate()

    const rules = Yup.object({
        oldPassword: Yup.string().min(8).required(),
        newPassword: Yup.string().min(8).required(),
        confirmPassword: Yup.string().min(8).oneOf([Yup.ref('newPassword'), null]).required(),
    })

    const loggedInUser=JSON.parse(localStorage.getItem("_user"))

    const { formState: {errors}, handleSubmit, control } = useForm({
        resolver: yupResolver(rules)
    })

    const changepassSubmit=async(data)=>{
        try{
         
            const response=await AuthSvc.changePassword(data)
            toast.success(response.message)
            navigate('/'+loggedInUser.role)
        }
        catch(exception){
            toast.warn(exception.message)
            console.log(exception)
        }
    }
    console.log(errors)

    return (<>
        <Container className="bg-light my-3 p-3">
            <Row>
                <Col>
                    <h1 className="text-center">Change Password</h1>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm={12} md={{ offset: 1, span: 10 }} lg={{ offset: 2, span: 8 }}>

                    <Form onSubmit={handleSubmit(changepassSubmit)}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3 my-2" >Current-Password</Form.Label>
                            <Col sm={9}>
                                <TextInput
                                    name="oldPassword"
                                    id="oldpassword"
                                    placeholder="Enter your current password"
                                    required={true}
                                    control={control}
                                    errMsg={errors?.oldPassword?.message}

                                />

                            </Col>
                            <Form.Label className="col-sm-3 my-2" >New-Password</Form.Label>
                            <Col sm={9}>
                                <TextInput
                                    name="newPassword"
                                    id="newPassword"

                                    placeholder="Enter your new password"
                                    required={true}
                                    control={control}
                                    errMsg={errors?.newPassword?.message}

                                />

                            </Col>
                            <Form.Label className="col-sm-3 my-2" >Confirm-Password</Form.Label>
                            <Col sm={9}>
                                <PassInput
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Re-enter new passsword"
                                    
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


    </>)
}
export default ChangePassword
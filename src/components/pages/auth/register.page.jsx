import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap"
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { TextInput } from "../../cms/form/input-component";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormActionButtons } from "../../cms/form/form-action-buttons";
import AuthSvc from "./auth.service";
import { toast } from "react-toastify";

const RegisterComponent = () => {
    const navigate = useNavigate()
    const registerSchema = Yup.object({
        name: Yup.string().min(5).max(50).required(),
        email: Yup.string().email().required(),
        role: Yup.string().matches(/^(customer)$/).required(),
        phone: Yup.string().nullable().optional().default(null)
    })


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { handleSubmit, register, setValue, setError, control,formState: { errors } } = useForm({
        resolver:yupResolver(registerSchema)
    })

    const submitRegister=async(data)=>{
        try{
        const response=await AuthSvc.register(data)
        toast.success("You have been successfully registered. Please check your email")
        navigate("/")
        }
        catch(exception){
            toast.warn("Submitting the data couldnot be possible")
            console.log(exception)
        }
    }
    console.log(errors)
    useEffect(()=>{
       const token=localStorage.getItem('_act')||null 
       const userDetail=JSON.parse(localStorage.getItem("_au"))||null
       if(token && userDetail){
        toast.info("You are already logged in")
       }
    },[])
    

    const LoginCheck = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });
    
    const { handleSubmit:handleSubmit2, control:controls,formState: { error } } = useForm({
        resolver: yupResolver(LoginCheck),
    })
    const submitLogin=async(data)=>{
        try {
            // Simulate login
            const response=await AuthSvc.loginRequest(data)
        
            toast.success("Please chcek your email for otp verification")
            navigate('/verify-otp');
            // console.log("Login data:", data);
          } catch (exception) {
            toast.warn("Server call failed");
            console.log("exception", exception);
          }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col mx-4" style={{ fontFamily: "sans-serif", fontSize: "30px", }}>
                        <div style={{ color: "tomato", marginTop: "50%", fontSize: "50px" }}>
                            Bhokmandu<br />
                        </div>


                        <small style={{ textDecoration: "underline" }}><em>Eating is the way</em></small>
                    </div>
                    <div className="col" style={{ border: "1px solid", marginTop: "14%", borderRadius: "15px", padding: "5px 5px 5px 10px" }} >
                        <h1 className="text-center">Register</h1>
                        <Form style={{ backgroundColor: "whitesmoke", padding: "7px 7px 7px 7px" }} onSubmit={handleSubmit(submitRegister)}>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    {/* <Form.Control type="email" placeholder="Enter your email" name="email" /> */}
                                    <TextInput
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required={true}
                                        control={control}
                                        errMsg={errors?.email?.message}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Username
                                </Form.Label>
                                <Col sm="10">
                                <TextInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        required={true}
                                        control={control}
                                        errMsg={errors?.name?.message}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Role
                                </Form.Label>
                                <Col sm="10">
                                   <Form.Select
                                    {...register('role',{required:true})}
                                   >
                                    <option value="customer">customer</option>

                                   </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Phone
                                </Form.Label>
                                <Col sm="10">
                                <TextInput
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        required={true}
                                        control={control}
                                        errMsg={errors?.phone?.message}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Image
                                </Form.Label>
                                <Col sm="10">
                               <Form.Control
                                type="file"
                                name="image"
                                onChange={(e)=>{
                                    const image=e.target.files[0]
                                    const ext=image.name.split(".").pop()
                                    const allowed=['jpg','png','svg','jpeg','webpg','bmp']
                                    if(allowed.includes(ext.toLowerCase())){
                                        if(image.size<=3000000){
                                            setValue("image",image)
                                        }
                                        else{
                                            setError("image",{message:"File size is not allowed"})
                                        }
                                    }
                                    else{
                                        setError("image",{message:"File format not supported"})
                                    }
                                }}
                               
                               />
                               <span className="text-danger">{errors?.image?.message}</span>
                               
                               
                                </Col>
                            </Form.Group>
                            <FormActionButtons
                            resetLabel="Reset"
                            submitLabel="Register"
                            />
                        </Form>
                        <Button className="btn btn-warning mx-5" onClick={handleShow}>
                            <i className="fa-solid fa-user"></i> Already an user?
                        </Button>
                        <Modal show={show} onHide={handleClose} className="text-center">
                            <Modal.Header closeButton className="text-center">
                                <h1 className="text-center">Login</h1>
                                `` </Modal.Header>
                            <Modal.Body>
                                <Form onClick={handleSubmit2(submitLogin)}>
                                    <Form.Group className="row mb-3">
                                        <Form.Label className="col-sm-3" htmlFor="email">Username:</Form.Label>
                                        <Col sm={9}>
                                        <TextInput
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email "
                                        required={true}
                                        control={controls}
                                        errMsg={errors?.email?.message}
                                    />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3" htmlFor="password">Password:</Form.Label>
                                        <Col sm={9}>
                                        <TextInput
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password "
                                        required={true}
                                        control={controls}
                                        errMsg={errors?.password?.message}
                                    />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group className="row mb-3">
                                        <Col >
                                            <NavLink to={'/forgetpassword'} className={"btn btn-info"}>Forget Password</NavLink>

                                        </Col>
                                        <Col>
                                            <NavLink to='/' className={"btn btn-success"}>Login</NavLink>
                                        </Col>

                                    </Form.Group>
                                </Form>
                            </Modal.Body>

                        </Modal>
                       
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegisterComponent
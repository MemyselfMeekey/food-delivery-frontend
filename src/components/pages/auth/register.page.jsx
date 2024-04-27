import { Button, Col, Container, Form, Row,Modal } from "react-bootstrap"
import { useState } from "react";
import { NavLink } from "react-router-dom";

const RegisterComponent = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col mx-4" style={{fontFamily:"sans-serif", fontSize:"20px"}}>
                        <div style={{color:"tomato", marginTop:"50%" }}>
                        Bhokmandu<br/>
                        </div>
                        
                    
                        <small><em>Eating is the way</em></small>
                    </div>
                    <div className="col" style={{border:"1px solid",marginTop:"14%",borderRadius:"15px", padding:"5px 5px 5px 10px"}} >
                       <h1 className="text-center">Register</h1>
                        <Form style={{backgroundColor:"whitesmoke",padding:"7px 7px 7px 7px" }}>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="email" placeholder="Enter your email" name="email" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Username
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" placeholder="Enter your username" name="name" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Role
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Select>
                                        <option value="customer">Customer</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Phone
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="tel" placeholder="Enter your phonenumber" name="phone" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Image
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="file" size="sm" name="image"/>
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button className="btn btn-warning mx-4" onClick={handleShow}>
                            <i className="fa-solid fa-user"></i> Already an user?
                        </Button>
                        <Modal show={show} onHide={handleClose} className="text-center">
                                        <Modal.Header closeButton className="text-center">
                                            <h1 className="text-center">Login</h1>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group className="row mb-3">
                                                    <Form.Label className="col-sm-3" htmlFor="email">Username:</Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control
                                                            size:sm
                                                            placeholder="Enter your email"
                                                            id="email"
                                                            name="email"
                                                        />
                                                        <span className="text-danger">

                                                        </span>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group className="row mb-3">
                                                    <Form.Label className="col-sm-3" htmlFor="password">Password:</Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control
                                                            size:sm
                                                            placeholder="Enter your password"
                                                            id="password"
                                                            name="password"
                                                        />
                                                        <span className="text-danger">

                                                        </span>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group className="row mb-3">
                                                    <Col >
                                                        <NavLink to={'/forgetpassword'} className={"btn btn-info"}>ForgetPassword</NavLink>     
                                                        
                                                    </Col>
                                                    <Col>
                                                    <NavLink to={'/'} className={"btn btn-success"}>Login</NavLink>  
                                                    </Col>
                                                    
                                                </Form.Group>
                                            </Form>
                                            </Modal.Body>

                                    </Modal>
                        <Button className="btn btn-danger mx-4 my-4"><i className="fa-solid fa-rotate-right"></i> Reset</Button>
                        <NavLink className={"btn btn-success"} to="/"><i className="fa-regular fa-paper-plane"></i> Register</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegisterComponent
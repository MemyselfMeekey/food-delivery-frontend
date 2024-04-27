import { useState } from "react"
import Banner4 from "../../../../assets/images/banner4.jpeg"
import { Button, Form, Modal, Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"


const HomeHeader = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const LoginCheck=Yup.object({
        email:Yup.string().email().required(),
        password:Yup.string().required()
    })
    const {formState:{errors},handleSubmit,control}=useForm({
        resolver:yupResolver(LoginCheck)
    })
    console.log(errors)
    

    return (
        <>
            {/* d-md-flex justify-content-md-end" try this with the mennu button when its small one*/}
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "tomato", color: "white" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={Banner4} alt="Bhokmandu Logo" width="45" height="40" /> Bhokmandu</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ marginLeft: "40px" }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="d-flex justify-content-end">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent" >


                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Categories
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Breakfast</a></li>
                                        <li><a className="dropdown-item" href="#">Lunch</a></li>
                                        <li><a className="dropdown-item" href="#">Dinner</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="#">Contact Us</a>
                                </li>
                            </ul>
                            {/* <button className="btn btn-outline-success mx-2">Login</button>
                            <button className="btn btn-outline-success mx-2">Register</button> */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className={"btn btn-sm btn-outline-success me-3"} to="/register">Register</NavLink>
                                    
                                </li>
                                <li className="nav-item">
                                    <NavLink className={"btn btn-sm btn-outline-success me-3"} onClick={handleShow}>Login</NavLink>

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
                                                    <Col sm={{ offset: 3, span: 9 }}>
                                                        <NavLink to={'/forgetpassword'}>ForgetPassword</NavLink>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group className="row mb-3">

                                                    <Col sm={{ offset: 2, span: 7 }}>
                                                        <Button type="reset" variant="danger" size="sm" className="me-3"><i className="fa fa-undo"> Reset</i></Button>
                                                        <Button type="submit" variant="success" size="sm" className="me-3"><i className="fa fa-paper-plane"></i> Register</Button>

                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                            or &nbsp;
                                            <NavLink to="" >Create Account</NavLink>
                                            </Modal.Body>

                                    </Modal>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit" style={{ color: "black" }}>Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default HomeHeader
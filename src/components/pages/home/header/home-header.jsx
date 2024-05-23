import { useState } from "react";
import Banner4 from "../../../../assets/images/banner4.jpeg";
import { Button, Form, Modal, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "../../../cms/form/input-component";
import { FormActionButtons } from "../../../cms/form/form-action-buttons";
import { toast } from "react-toastify";
import "./hom-header.css"
import AuthSvc from "../../auth/auth.service";

const HomeHeader = () => {
  const nav = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const LoginCheck = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const { formState: { errors }, handleSubmit, control } = useForm({
    resolver: yupResolver(LoginCheck),
  });

  const submitlogin = async (data) => {
    try {
      // Simulate login
      const response = await AuthSvc.loginRequest(data)

      toast.success("Please chcek your email for otp verification")
      handleClose()
      nav('/verify-otp');
      // console.log("Login data:", data);
    } catch (exception) {
      toast.warn("Server call failed");
      console.log("exception", exception);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "tomato", color: "white" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={Banner4} alt="Bhokmandu Logo" width="45" height="40" /> Bhokmandu
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ marginLeft: "40px" }}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
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
                <a className="nav-link" href="#">Contact Us</a>
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className={"btn btn-sm btn-outline-success mx-2"} to="/register">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={"btn btn-sm btn-outline-success btn-custom mx-2"} onClick={handleShow}>Login</NavLink>
                <Modal show={show} onHide={handleClose} className="text-center">
                  <Modal.Header closeButton className="text-center">
                    <h1 className="text-center">Login</h1>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit(submitlogin)}>
                      <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-3" htmlFor="email">Username:</Form.Label>
                        <Col sm={9}>
                          <TextInput
                            type="email"
                            id="Username"
                            name="email"
                            placeholder="Enter your username"
                            required={true}
                            control={control}
                            errMsg={errors?.email?.message}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-3" htmlFor="password">Password:</Form.Label>
                        <Col sm={9}>
                          <TextInput
                            type="password"
                            id="Password"
                            name="password"
                            placeholder="Enter your password"
                            required={true}
                            control={control}
                            errMsg={errors?.password?.message}
                          />
                        </Col>
                      </Form.Group>
                      <FormActionButtons
                        resetLabel="Reset"
                        submitLabel="Login"
                      />
                    </Form>

                    <Col sm={{ offset: 2, span: 8 }}>
                      <NavLink className={"me-2"} onClick={(e)=>{
                        e.preventDefault()
                        handleClose()
                        nav("/forgetpass")
                      }} >Forgot Password</NavLink>
                      or &nbsp;
                      <NavLink to="/register">Create Account</NavLink>

                    </Col>




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
      </nav>
    </>
  );
};

export default HomeHeader;

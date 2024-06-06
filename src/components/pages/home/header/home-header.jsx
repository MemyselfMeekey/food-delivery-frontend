import { useEffect, useState } from "react";
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
import CategorySvc from "../../admin/category/category.service";
import OrderSvc from "../../admin/order/order-service";

const HomeHeader = () => {
  const nav = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("_user"))

  const [categories,setCategories]=useState()

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
  }

  const LoadCategories=async()=>{
    try{
      const response=await CategorySvc.homeList()
      setCategories(response.result)
    }
    catch(exception){
      toast.warn(exception.message)
      console.log("exception",exception)
    }
  }

  const [quantity,setquantity]=useState()

  const LoadQuantity=async()=>{
    try{
      const response=await OrderSvc.getMyCart()
      let number=0
      console.log(response.result[0].quantity)
      if(response.result){
        setquantity(response.result[0].quantity)
      }
      else{
        setquantity(number)
      }
    }
    catch(exception){
      toast.warn(exception.message)
      console.log("exception",exception)
    }
  }
  
  console.log("quantity",quantity)

  useEffect(()=>{
    LoadCategories(),
    LoadQuantity()
  },[])

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
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                <ul className="dropdown-menu">
                  {
                    categories && categories.map((cat,inx)=>(
                      <li  key={inx}><a className="dropdown-item" href="#">{cat.name}</a></li>
                    ))
                  }
                </ul>
              </li>
            </ul>

            <ul className="navbar-nav">

              {
                loggedInUser ? <>

                <li className="nav-item">
                <a className="nav-link mx-2"  aria-current="page"  href={loggedInUser.role === 'admin' ? `/${loggedInUser.role}` : "/"}><i class="fa-solid fa-user"></i> {loggedInUser.name}</a>
                </li>
                <li className="nav-item">
                <NavLink className="btn btn-warning mx-2" to="/customer/cart" ><i class="fa-solid fa-cart-shopping" ></i>Cart <sup style={{color:"blue"}}>{quantity}</sup></NavLink>
                </li>
               
                </> : <>
                  <li className="nav-item">
                    <NavLink className={"btn btn-sm btn-outline-success mx-2"} to="/register">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={"btn btn-sm btn-outline-success mx-2"} onClick={handleShow}>Login</NavLink>
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
                          <NavLink className={"me-2"} onClick={(e) => {
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
                </>
              }

            </ul>

            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit" style={{ color: "black" }}>Search</button>
            </form>
          
                  <Button className="mx-2" style={{background:"none",border:"none"}}><i class="fa-solid fa-right-from-bracket"></i>Logout</Button>
                  

          </div>
        </div>
      </nav>
    </>
  );
};

export default HomeHeader;

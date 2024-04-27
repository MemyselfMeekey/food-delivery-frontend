import { Container, Row, Col, Form, Button } from "react-bootstrap"


const HomeFooter = () => {
    return (
        <>


            <div className="mt-5 py-3" style={{ backgroundColor: "tomato", fontFamily: "sans-serif" }}>
                <div className="container">

                    <div className="row">

                        <div className="col-sm-4">
                            <h4>Stay Connected</h4>
                            <p>Signup for our offer updates</p>
                        </div>
                        <div className="col-sm-8">
                            <Form>
                                <Form.Control type="email" required name="Subscription" placeholder="Enter your email" className="btn btn-lg " style={{ backgroundColor: "orange", color: "indigo", width: "70%" }} />
                                <Button className="mx-4 btn-md px-3" style={{ backgroundColor: "red", color: "indigo", border: "none" }}>Subscribe</Button>
                            </Form>
                        </div>
                    </div>
                    <hr />
                    <div className="row fw-bold" >
                        <div className="col text-center">
                            <h4 style={{ textDecoration: "underline" }}>BhokMandu</h4><br />
                            <p>BhokMandu Office</p>
                            <small>
                                Baneshwor-16,Kathmandu
                            </small>
                            <br />
                            <small>
                                BhokMandu@gmail.com.np
                            </small>
                            <br />
                            <div className="" style={{ fontSize: "22px" }}>
                                <a href="#" style={{ color: "inherit", textDecoration: "none", }} className="mx-2"><i className="fa-brands fa-facebook"></i></a>
                                <a href="#" style={{ color: "inherit", textDecoration: "none" }} className="mx-2"><i className="fa-brands fa-twitter"></i></a>
                                <a href="#" style={{ color: "inherit", textDecoration: "none" }} className="mx-2"><i className="fa-brands fa-instagram"></i></a>
                                <a href="#" style={{ color: "inherit", textDecoration: "none" }} className="mx-2"><i className="fa-brands fa-youtube"></i></a>
                            </div>


                        </div>
                        <div className="col text-center ">
                            <h4 style={{ textDecoration: "underline" }}>About Us</h4><br />
                                <p style={{textAlign:"justify-content"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi similique laborum quibusdam voluptas deserunt ad? Modi asperiores itaque vel in, nisi, consequatur mollitia debitis commodi laudantium expedita officia est atque!</p>

                        </div>
                        <div className="col">
                            <h4 style={{ textDecoration: "underline" }}>Contact Us</h4><br />
                            <p>
                                Feel free to contact us through our email or telephone number
                            </p>
                            <p>Phone: <a href="tel:+01-252826" style={{textDecoration:"none",color:"black"}}>01-252826</a></p>
                            <p>Email: <a href="mailTo:bhokmandu@gmail.com.np"style={{textDecoration:"none",color:"black"}}>bhokmandu@gmail.com.np</a></p>
                        </div>
                        <div className="col">
                            <h4 style={{ textDecoration: "underline" }}>Privacy and Setting</h4><br />
                        </div>
                    </div>
                    <hr />
                    <div className="text-center">
                        Copyright Claim blah blah blah
                    </div>

                </div>



            </div>

        </>
    )
}
export default HomeFooter
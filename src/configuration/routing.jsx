import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Container,Row,Col } from "react-bootstrap"
import LandingPage from "../components/pages/landing-page/landing.page"
import MainLayout from "../components/pages/layout/main-Layout"
import RegisterComponent from "../components/pages/auth/register.page"
import VerifyOtp from "../components/pages/auth/verify-otp"


const ErrorPage=()=>{
    return(
        <>
        <Container className="my-3">
            <Row>
                <Col>
                    <p className="text-danger text-center">
                        Oops!! This page doesnot exists
                    </p>
                </Col>
            </Row>
        </Container>
        </>
    )
}

const RouterComponent=()=>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                    <Route index element={<LandingPage/>}></Route>
                    
                    </Route>
                    <Route path="/register" element={<RegisterComponent/>}></Route>
                    <Route path="/verify-otp" element={<VerifyOtp/>}></Route>
                    <Route path="*" element={<ErrorPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default RouterComponent
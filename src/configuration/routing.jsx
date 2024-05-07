import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Container,Row,Col } from "react-bootstrap"
import LandingPage from "../components/pages/landing-page/landing.page"
import MainLayout from "../components/pages/layout/main-Layout"
import RegisterComponent from "../components/pages/auth/register.page"
import VerifyOtp from "../components/pages/auth/verify-otp"
import ActivateRegistration from "../components/pages/auth/user.activation"
import ResendVerificationToken from "../components/pages/auth/resend.verification"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import AdminDashboard from "../components/pages/admin/dashboard/admin-dashboard"
import AuthComponent from "../components/auth/auth.component"
import AdminMain from "../components/pages/admin/admin-main"

import { BannerCreate,BannerMain } from "../components/pages/admin/banner"

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
        <ToastContainer/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                    <Route index element={<LandingPage/>}></Route>
                    <Route path="activation/:token" element={<ActivateRegistration/>}></Route>
                    <Route path="resendverifcation" element={<ResendVerificationToken/>}></Route>
                    </Route>
                    <Route path="/register" element={<RegisterComponent/>}></Route>
                    <Route path="/verify-otp" element={<VerifyOtp/>}></Route>
                    <Route path="*" element={<ErrorPage/>}></Route>
                    

                    <Route path="/admin" element={<AuthComponent role={"admin"}>
                           <AdminDashboard/>
                           </AuthComponent>}>
                        <Route index element={<AdminMain/>}></Route>
                        <Route path="/admin/banner" element={<BannerMain/>}></Route>
                        <Route path="/admin/banner/create" element={<BannerCreate/>}></Route>
                    </Route>


                 
                </Routes>
            </BrowserRouter>
            
        </>
    )
}
export default RouterComponent
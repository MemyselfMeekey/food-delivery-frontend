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

import { BannerCreate,BannerMain, EditBanner } from "../components/pages/admin/banner"
import { CategoryMain, CreateCategory } from "../components/pages/admin/category"
import ChangePassword from "../components/pages/auth/change-password"
import ForgetPassword from "../components/pages/auth/forget-password"
import ForgetPassTokenVerfication from "../components/pages/auth/set-newpass"

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
                    <Route path="/verify-otp" element={<VerifyOtp/>}></Route>
                    <Route path="/change-pass" element={<ChangePassword/>}></Route>
                    <Route path="/forgetpass" element={<ForgetPassword/>}></Route>
                    <Route path="/forgetpass/:token/verification" element={<ForgetPassTokenVerfication/>}></Route>
                    </Route>
                    <Route path="/register" element={<RegisterComponent/>}></Route>
                    
                    <Route path="*" element={<ErrorPage/>}></Route>
                    

                    <Route path="/admin" element={<AuthComponent role={"admin"}>
                           <AdminDashboard/>
                           </AuthComponent>}>
                        <Route index element={<AdminMain/>}></Route>

                        <Route path="/admin/banner" element={<BannerMain/>}></Route>
                        <Route path="/admin/banner/create" element={<BannerCreate/>}></Route>
                        <Route path="/admin/banner/:id/edit" element={<EditBanner/>}></Route>

                        <Route path="/admin/category" element={<CategoryMain/>}></Route>
                        <Route path="/admin/category/create" element={<CreateCategory/>}></Route>
                        <Route path="/admin/category/create" element={<CreateCategory/>}></Route>
                    
                    
                    </Route>
                </Routes>
            </BrowserRouter>
            
        </>
    )
}
export default RouterComponent
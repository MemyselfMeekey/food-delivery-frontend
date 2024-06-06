import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"

import LandingPage from "../components/pages/landing-page/landing.page"
import MainLayout from "../components/pages/layout/main-Layout"
import AdminDashboard from "../components/pages/admin/dashboard/admin-dashboard"
import AuthComponent from "../components/auth/auth.component"
import AdminMain from "../components/pages/admin/admin-main"

import RegisterComponent from "../components/pages/auth/register.page"
import VerifyOtp from "../components/pages/auth/verify-otp"
import ActivateRegistration from "../components/pages/auth/user.activation"
import ResendVerificationToken from "../components/pages/auth/resend.verification"
import ChangePassword from "../components/pages/auth/change-password"
import ForgetPassword from "../components/pages/auth/forget-password"
import ForgetPassTokenVerfication from "../components/pages/auth/set-newpass"

import { BannerCreate, BannerMain, EditBanner } from "../components/pages/admin/banner"
import { CategoryMain, CreateCategory, EditCategory } from "../components/pages/admin/category"
import { UserMain, CreateUser, EditUser } from "../components/pages/admin/user-admin"
import { CreateMenu, EditMenu, MenuMain } from "../components/pages/admin/menu"
import { CreateOffer, EditOffer, OfferMain } from "../components/pages/admin/offer"
import { CreateOrder, EditOrder, OrderMain } from "../components/pages/admin/order"
import { CustomerCart, CustomerOrder } from "../components/pages/customer"
import CustomerDashboard from "../components/pages/customer/customer-dashboard"

const ErrorPage = () => {
    return (
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

const RouterComponent = () => {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<LandingPage />}></Route>
                        <Route path="activation/:token" element={<ActivateRegistration />}></Route>
                        <Route path="resendverifcation" element={<ResendVerificationToken />}></Route>
                        <Route path="/verify-otp" element={<VerifyOtp />}></Route>
                        <Route path="/change-pass" element={<ChangePassword />}></Route>
                        <Route path="/forgetpass" element={<ForgetPassword />}></Route>
                        <Route path="/forgetpass/:token/verification" element={<ForgetPassTokenVerfication />}></Route>
                    </Route>
                    <Route path="/register" element={<RegisterComponent />}></Route>

                    <Route path="*" element={<ErrorPage />}></Route>


                    <Route path="/admin" element={<AuthComponent role={"admin"}>
                        <AdminDashboard />
                    </AuthComponent>}>
                        <Route index element={<AdminMain />}></Route>

                        <Route path="/admin/banner" element={<BannerMain />}></Route>
                        <Route path="/admin/banner/create" element={<BannerCreate />}></Route>
                        <Route path="/admin/banner/:id/edit" element={<EditBanner />}></Route>

                        <Route path="/admin/category" element={<CategoryMain />}></Route>
                        <Route path="/admin/category/create" element={<CreateCategory />}></Route>
                        <Route path="/admin/category/:id/edit" element={<EditCategory />}></Route>

                        <Route path="/admin/menu" element={<MenuMain />}></Route>
                        <Route path="/admin/menu/create" element={<CreateMenu />}></Route>
                        <Route path="/admin/menu/:id/edit" element={<EditMenu />}></Route>

                        <Route path="/admin/user" element={<UserMain />}></Route>
                        <Route path="/admin/user/create" element={<CreateUser />}></Route>
                        <Route path="/admin/user/:id/edit" element={<EditUser />}></Route>

                        <Route path="/admin/offer" element={<OfferMain />}></Route>
                        <Route path="/admin/offer/create" element={<CreateOffer />}></Route>
                        <Route path="/admin/offer/:id/edit" element={<EditOffer />}></Route>


                        <Route path="/admin/order" element={<OrderMain />}></Route>
                        <Route path="/admin/order/create" element={<CreateOrder />}></Route>
                        <Route path="/admin/order/:id/edit" element={<EditOrder />}></Route>

                    </Route>

                    <Route path="/customer" element={<AuthComponent role={"customer"}>
                        <CustomerDashboard/>
                    </AuthComponent>}>

                            <Route path="/customer/cart" element={<CustomerCart/>}></Route>
                            <Route path="/customer/order" element={<CustomerOrder/>}></Route>

                    </Route>

                </Routes>
            </BrowserRouter>

        </>
    )
}
export default RouterComponent
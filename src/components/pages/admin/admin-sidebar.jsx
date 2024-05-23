import { useState } from "react"
import AuthSvc from "../auth/auth.service"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AdminSidebar = () => {

    const navigate=useNavigate()

    const [loading,setLoading]=useState(true)

    const Logout=async(e)=>{
            e.preventDefault()
            const response=await AuthSvc.logout()
            localStorage.removeItem("_act")
            localStorage.removeItem("_rft")
            localStorage.removeItem("_user")
           
            toast.success("Logged Out successfully")

            navigate("/")
   
        
    }

    return (
        <>
            <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style={{ backgroundColor: "tomato" }}>
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Dashboard</div>
                </a>
                <hr className="sidebar-divider my-0" />
                <li className="nav-item active" >
                    <a className="nav-link" href="/">
                        <i className="fas fa-home"></i>
                        <span style={{fontSize:"13px"}}>HomePage</span></a>
                </li>
                <li className="nav-item active" >
                    <a className="nav-link" href="/admin">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{fontSize:"13px"}}>Management</span></a>
                </li>
                <hr className="sidebar-divider" />
                <div className="sidebar-heading" style={{fontSize:"13px"}}>
                    Interface
                </div>
                <li className="nav-item" style={{fontSize:"18px"}}>
                    <a className="nav-link collapsed" href="/admin/banner" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Banner Management</span>
                    </a>
                </li>

                <li className="nav-item" style={{fontSize:"18px"}}>
                    <a className="nav-link collapsed" href="/admin/category" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-solid fa-list"></i>
                        <span>Category Management</span>
                    </a>
                </li>

                <li className="nav-item" style={{fontSize:"18px"}}>
                    <a className="nav-link collapsed" href="/admin/menu" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-solid fa-bowl-food"></i>
                        <span>Menu Management</span>
                    </a>
                </li>
                <li className="nav-item" style={{fontSize:"18px"}}>
                    <a className="nav-link collapsed" href="/admin/offer" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Offer Management</span>
                    </a>
                </li>
                
                <li className="nav-item" style={{fontSize:"18px"}}>
                    <a className="nav-link collapsed" href="/admin/order" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-brands fa-first-order"></i>
                        <span>Order Management</span>
                    </a>
                </li>
                <hr className="sidebar-divider" />
                <li className="nav-item" style={{fontSize:"18px"}}>
                    <a className="nav-link collapsed" onClick={Logout} data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Logout</span>
                    </a>
                    <a className="nav-link collapsed" onClick data-toggle="collapse" href="/change-pass"data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                       <i class="fa-solid fa-key"></i>
                        <span>Change Password</span>
                    </a>
                </li>
            </ul>
        </>
    )
}
export default AdminSidebar
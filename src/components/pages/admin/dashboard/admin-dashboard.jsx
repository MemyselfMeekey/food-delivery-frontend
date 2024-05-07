import { Outlet } from "react-router-dom"
import AdminFooter from "../admin-footer"
import "./admin-dashboard.css"
import AdminSidebar from "../admin-sidebar"

const AdminDashboard = () => {
  
    return (
        <>
            <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <Outlet />
                    <AdminFooter />
                </div>
            </div>



        </>
    )
}
export default AdminDashboard
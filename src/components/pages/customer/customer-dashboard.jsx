import { Outlet } from "react-router-dom"

const CustomerDashboard = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("_user"))
    return (
        <>
            
                {/* <!-- Topbar --> */}
                <nav className="navbar navbar-expand navbar-lighttopbar shadow d-flex justify-content-end" style={{ backgroundColor: "orange" }}>

                    {/* <!-- Sidebar Toggle (Topbar) --> */}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>


                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline" style={{ fontFamily: "sans-serif", fontSize: "20px" }}>{loggedInUser.name}</span>
                                <i className="fa-solid fa-user "></i>
                                {/* <img className="img-profile rounded-circle"
                src="img/undraw_profile.svg" /> */}
                            </a>
                        </li>

                    </ul>

                </nav>
                <div id="content-wrapper" className="d-flex flex-column">
                    <Outlet />
                </div>
       

        </>
    )
}
export default CustomerDashboard
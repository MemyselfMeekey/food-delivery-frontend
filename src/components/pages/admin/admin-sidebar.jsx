const AdminSidebar = () => {
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
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-solid fa-bowl-food"></i>
                        <span>Menu Management</span>
                    </a>
                </li>
                <li className="nav-item" style={{fontSize:"18px"}}>
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Offer Management</span>
                    </a>
                </li>
                <li className="nav-item" style={{fontSize:"18px"}}>
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-solid fa-list"></i>
                        <span>Category Management</span>
                    </a>
                </li>
                <li className="nav-item" style={{fontSize:"18px"}}>
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-brands fa-first-order"></i>
                        <span>Order Management</span>
                    </a>
                </li>
                <hr className="sidebar-divider" />
            </ul>
        </>
    )
}
export default AdminSidebar
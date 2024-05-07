import AdminNavBar from "./admin.navbar"

const AdminMain = () => {
   
    return (
        <>
            <div id="content">

                
                <AdminNavBar/>


                <div className="container-fluid">

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800 border-bottom border-secondary">Dashboard</h1>


                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-success mb-4">
                                <div className="card-body">Customer</div>
                                <div className="card-footer d-flex align-items-center justify-content-between ">
                                    <a className="small stretched-link " href="#">View Details</a>
                                    <div className="small "><i className="fa-solid fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-info  mb-4">
                                <div className="card-body">Products</div>
                                <div className="card-footer d-flex align-items-center justify-content-between ">
                                    <a className="small stretched-link " href="#">View Details</a>
                                    <div className="small "><i className="fa-solid fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger  mb-4">
                                <div className="card-body">Products</div>
                                <div className="card-footer d-flex align-items-center justify-content-between ">
                                    <a className="small stretched-link " href="#">View Details</a>
                                    <div className="small "><i className="fa-solid fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-dark  mb-4">
                                <div className="card-body text-white">Products</div>
                                <div className="card-footer d-flex align-items-center justify-content-between ">
                                    <a className="small stretched-link " href="#">View Details</a>
                                    <div className="small  "><i className="fa-solid fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row my-3 mx-3">
                    <div className="col-12 ">
                        <h4><ins>New Orders</ins></h4>
                        <hr></hr>
                        <table className="table table-sm table-borderd">
                            <thead className="table-success table-striped">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminMain
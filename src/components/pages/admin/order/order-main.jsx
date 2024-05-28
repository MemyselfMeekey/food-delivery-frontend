import AdminBreadCrumb from "../admin-breadcrumb"
import AdminNavBar from "../admin.navbar"

const OrderMain = () => {
    return (
        <>
            <div className="content">
                <AdminNavBar />
                <div className="container-fluid">
                    <AdminBreadCrumb
                        pageTitle={"Order Management"}
                        actionUrl={"/order/create"}
                        buttonLabel={"Add Order"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "List Orderr", url: null }
                        ]}
                    />
                    <div className="row">
                        <div className="col-12">
                            <h4>Order Lists</h4>
                            <hr />
                            <table className="table table-sm table-borderd">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Offer On</th>
                                        <th>Start On</th>
                                        <th>End On</th>
                                        <th>Show In Home</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}
export default OrderMain
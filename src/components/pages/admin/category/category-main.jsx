import AdminBreadCrumb from "../admin-breadcrumb"

const CategoryMain = () => {
    return (
        <>
            <div className="container-fluid px-4">
                <AdminBreadCrumb
                    pageTitle={"Category"}
                    actionUrl={"/category/create"}
                    buttonLabel={"Add Category"}
                    breadCrumbData={[
                        { label: "Dashboard", url: "/admin" },
                        { label: "List Category", url: null }
                    ]}
                />
                <div className="row my-3 mx-3">
                    <div className="col-12">
                        <h4>Category List</h4>
                        <hr></hr>
                        <table className="table table-sm table-borderd">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Sub-Category Of</th>
                                    <th>Status</th>
                                    <th>ShowInHome</th>
                                    <th>Image</th>
                                    <th>#</th>

                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CategoryMain
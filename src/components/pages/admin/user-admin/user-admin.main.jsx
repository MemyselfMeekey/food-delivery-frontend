import AdminNavBar from "../admin.navbar"
import AdminBreadCrumb from "../admin-breadcrumb"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import AuthSvc from "../../auth/auth.service"
import { Spinner } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

const UserMain = () => {

    const [users, setUserList] = useState()
    const [pagination, setPagination] = useState()
    const [loading, setLoading] = useState(false)

    const LoadUsers = async () => {
        try {
            setLoading(true)
            const response = await AuthSvc.listAllUsers({ page: 1, limit: 1000 })

            setUserList(response.result)
            const totalPages = Math.ceil(response.meta.count / response.meta.limit)
            setPagination({
                page: +response.meta.page,
                limit: +response.meta.limit,
                count: totalPages,
            })

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log(exception)
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        LoadUsers()
    }, [])

    const confirmDelete = (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((event) => {
                if (event.isConfirmed) {
                    deleteUser(id)
                }
            });

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    const deleteUser = async (id) => {
        try {
            setLoading(true)
            const response = await AuthSvc.deleteUser(id)
            toast.success(response.message)
            LoadUsers({ limit: 10, page: 1 })
        }
        catch (exception) {
            toast.error(exception.message)
            console.log(exception)
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <>
            <div className="content">
                <AdminNavBar />
                
                    <div className="container-fluid px-4">
                        <AdminBreadCrumb
                            pageTitle={"User Management"}
                            actionUrl={"/user/create"}
                            buttonLabel={"Add User"}
                            breadCrumbData={[
                                { label: "Dashboard", url: "/admin" },
                                { label: "List User", url: null }
                            ]}
                        />
                        <div className="row">
                            <div className="col-12">
                                <h4>User List</h4>
                                <hr></hr>
                                <table className="table table-sm table-borderd">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Phone</th>
                                            <th>#</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        loading ? <>
                                            <tr>
                                                <td colSpan={5}>
                                                    <div className="my-3 text-center">
                                                        <Spinner variant="danger" size="lg" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </> : <>
                                            {
                                                users && users.map((allUsers, ind) => (
                                                    <tr key={ind}>

                                                        <td>
                                                            {allUsers.name}
                                                        </td>
                                                        <td>
                                                            {allUsers.email}
                                                        </td>
                                                        <td>
                                                            {allUsers.role}
                                                        </td>
                                                        <td>
                                                            {allUsers.status}
                                                        </td>
                                                        <td>
                                                            {allUsers.phone}
                                                        </td>
                                                        <td>
                                                            <NavLink onClick={(e) => {
                                                                e.preventDefault()
                                                                confirmDelete(allUsers._id)
                                                            }} className={"mx-3 btn btn-danger rounded-circle"} >
                                                                <i className="fa fa-trash"></i>
                                                            </NavLink>
                                                            <NavLink to={"/admin/user/" + allUsers._id + "/edit"} className={"btn btn-danger rounded-circle"}>
                                                                <i className="fa fa-pen"></i>
                                                            </NavLink>
                                                        </td>

                                                    </tr>
                                                ))
                                            }

                                        </>
                                    }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

        </>
    )
}
export default UserMain
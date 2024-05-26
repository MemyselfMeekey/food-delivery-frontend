import AdminNavBar from "../admin.navbar"
import AdminBreadCrumb from "../admin-breadcrumb"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import MenuSvc from "./menu-service"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"
import { Image, Spinner } from "react-bootstrap"


const MenuMain = () => {

    const [loading, setLoading] = useState(false)
    const [menuList, setMenuList] = useState()

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        count: 10
    })


    const LoadMenus = async () => {
        try {
            const response = await MenuSvc.getAllData({ page: 1, limit: 10 })

            setMenuList(response.result)
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
    }

    useEffect(() => {
        LoadMenus()
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
                    deleteMenu(id)
                }
            });

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    const deleteMenu = async (id) => {
        try {
            setLoading(true)
            const response = await MenuSvc.deleteMenu(id)
            toast.success(response.message)
            LoadMenus({ limit: 10, page: 1 })
        }
        catch (exception) {
            toast.error(exception.message)
            console.log(exception)
        }
        finally {
            setLoading(false)
        }
    }

    console.log("menuList", menuList)

    return (
        <>

            <div className="content">
                <AdminNavBar />
                <div className="container">
                    <AdminBreadCrumb
                        pageTitle={"Menu Management"}
                        actionUrl={"/menu/create"}
                        buttonLabel={"Add User"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "List Menu", url: null }
                        ]}
                    />
                    <div className="row">
                        <div className="col-12">
                            <h4>Menu List</h4>
                            <hr></hr>
                            <table className="table table-sm table-borderd">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Discount</th>
                                        <th>Images</th>
                                        <th>ShowInHome</th>
                                        <th>Status</th>
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
                                                menuList && menuList.map((menus, inx) => (
                                                    <tr key={inx}>
                                                        <td>
                                                            {menus.name}
                                                        </td>
                                                        <td>
                                                            {menus.description}
                                                        </td>
                                                        <td>
                                                            {menus.price}
                                                        </td>
                                                        <td>
                                                            {menus.categories ? menus.categories.map(category => category.name).join(', ') : 'No categories'}
                                                        </td>
                                                        <td>
                                                            {menus.discount}%
                                                        </td>
                                                        <td>
                                                            {console.log("menus.images",menus.images)}
                                                        {
                                                            
                                                            <Image
                                                            onError={(e) => {
                                                                e.target.src = "https://dummyimage.com/100/40/d4d4d4/7d7d7d&text=Menu+Image"
                                                            }} src={import.meta.env.VITE_IMAGE_URL + "menu/" + menus.images} alt="" style={{ width: "90px" }} fluid sizes="sm"
                                                            
                                                            />
                                                        }

                                                        
                                                        </td>


                                                        <td>
                                                            <span className={`badge text-bg-${menus.showInHome === true ? 'success' : 'danger'}`}>
                                                                {menus.showInHome === true ? "Yes" : "No"}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <span className={`badge text-bg-${menus.status === 'active' ? 'success' : 'danger'}`}>
                                                                {menus.status === "active" ? "Published" : "Un-Published"}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <NavLink onClick={(e) => {
                                                                e.preventDefault()
                                                                confirmDelete(menus._id)
                                                            }} className={"mx-2 btn btn-danger rounded-circle"} >
                                                                <i className="fa fa-trash"></i>
                                                            </NavLink>
                                                            <NavLink to={"/admin/menu/" + menus._id + "/edit"} className={"btn btn-danger rounded-circle"}>
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
export default MenuMain
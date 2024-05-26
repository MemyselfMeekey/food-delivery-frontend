import { useEffect, useState } from "react"
import AdminBreadCrumb from "../admin-breadcrumb"
import {Row,Col,Image,Pagination} from "react-bootstrap"
import React from "react"
import CategorySvc from "./category.service"
import { Spinner } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import AdminSidebar from "../admin-sidebar"
import AdminNavBar from "../admin.navbar"



const CategoryMain = () => {

    const [categoryList, setCategoryList] = useState()

    const [loading, setLoading] = useState(true)

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
        count: 10
    })

    const LoadCategoryList = async ({ page = 1, limit = 10 }) => {
        try {
            setLoading(true)

            const response = await CategorySvc.listAll({ page, limit})      
           
            setCategoryList(response.result)
            const totalPages = Math.ceil(response.meta.count / response.meta.limit)
            setPagination({
                page: +response.meta.page,
                limit: +response.meta.limit,
                count: totalPages,
            })
        }
        catch (exception) {
            toast.warn(exception.message)
            console.log("exception", exception)
        }
        finally {
            setLoading(false)
        }
    }

    
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
                    deleteCategory(id)
                }
            });

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    const deleteCategory = async (id) => {
        try {
            setLoading(true)
            const response = await CategorySvc.deleteData(id)
            toast.success(response.message)
            LoadCategoryList({ limit: 10, page: 1 })
        }
        catch (exception) {
            toast.error(exception.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        LoadCategoryList({ page: 1, limit: 10 })
    }, [])


    return (
        <>
        <div className="content">
           <AdminNavBar/>
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
                <div className="row">
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

                                            categoryList && categoryList.map((categories, inx) => (

                                                
                                                <tr key={inx}>
                                                    <td>
                                                        {categories.name}
                                                    </td>
                                                    <td>
                                                       {categories.parentId?.name}
                                                    </td>
                                                    <td>
                                                        <span className={`badge text-bg-${categories.status === 'active' ? 'success' : 'danger'}`}>
                                                            {categories.status === 'active' ? "Published" : "Un-Published"}

                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`badge text-bg-${categories.showInHome === true ? 'success' : 'danger'}`}>
                                                            {categories.showInHome === true ? "Yes" : "No"}

                                                        </span>

                                                    </td>
                                                    
                                                    <td>
                                                        <Image onError={(e) => {
                                                            e.target.src = "https://dummyimage.com/100/40/d4d4d4/7d7d7d&text=Banner+Image"
                                                        }} src={import.meta.env.VITE_IMAGE_URL + "cat/" + categories.image} alt="" style={{ width: "90px" }} fluid sizes="sm" />
                                                    </td>
                                                
                                                    <td style={{ width: "50px" }}>
                                                        <NavLink onClick={(e) => {
                                                            e.preventDefault()
                                                            confirmDelete(categories._id)
                                                        }} className={'btn btn-danger rounded-circle my-2'}>
                                                            <i className="fa fa-trash"></i>
                                                        </NavLink>
                                                       
                                                       <NavLink to={'/admin/category/'+categories._id+'/edit'} className={'btn btn-danger rounded-circle my-2'}>
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
                        {
                            loading ? <></> : <>
                                <Row>
                                    <Col sm={12} >
                                        <Pagination className="float-end" size="sm">
                                            <Pagination.First disabled={pagination.page === 1 ? true : false} onClick={(e) => {

                                                getBannerList({ limit: 151, page: 1 })
                                            }} />
                                            <Pagination.Prev disabled={pagination.page === 1 ? true : false} onClick={(e) => {

                                                getBannerList({ limit: 15, page: (pagination.page - 1) })
                                            }} />
                                            {
                                                [...Array(pagination.totalPages)].map((item, inx) => (
                                                    <React.Fragment key={inx}>




                                                        <Pagination.Item onClick={(e) => {

                                                            getBannerList({ limit: 15, page: inx + 1 })
                                                        }} key={inx}>{inx + 1}</Pagination.Item>

                                                    </React.Fragment>
                                                ))
                                            }

                                            <Pagination.Next disabled={
                                                (pagination.page === 1 && pagination.count > 1)
                                                    || pagination.count !== pagination.page ? false : true} onClick={(e) => {

                                                        getBannerList({ limit: 15, page: (pagination.page + 1) })
                                                    }} />
                                            <Pagination.Last disabled={(pagination.page === 1 && pagination.count > 1) || pagination.count !== pagination.page ? false : true} onClick={(e) => {

                                                getBannerList({ limit: 15, page: (pagination.count) })
                                            }} />

                                        </Pagination>;
                                    </Col>
                                </Row>
                            </>

                        }
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
export default CategoryMain
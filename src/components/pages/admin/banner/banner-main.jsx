
import AdminBreadCrumb from "../admin-breadcrumb"
import AdminNavBar from "../admin.navbar"
import { useEffect, useState } from "react"
import { Image, Row, Col, Pagination } from "react-bootstrap"
import BannerSvc from "./bannerSvc"
import LoadingComponent from "../../../loading/loading-component"
import { toast } from "react-toastify"
import { NavLink } from "react-router-dom"
import React from "react"
import Swal from "sweetalert2"



const BannerMain = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
        count: 10
    })

    const getBannerList = async ({ limit = 10, page = 1 }) => {

        try {

            setLoading(true)
            const bannerList = await BannerSvc.listBanner({ limit: limit, page: page })

            setData(bannerList.result)
            const totalPages = Math.ceil(bannerList.meta.count / bannerList.meta.limit)
            setPagination({
                page: +bannerList.meta.page,
                limit: +bannerList.meta.limit,
                count: totalPages,
            })


        }
        catch (exception) {
            console.log("exception in getbannerlist", exception)
            toast.warning("Error loading banner data .....")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBannerList({ limit: 10, page: 1 })
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
                    deleteBanner(id)
                }
            });

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    const deleteBanner = async (id) => {
        try {
            setLoading(true)
            const response = await BannerSvc.deleteData(id)
            toast.success(response.message)
            getBannerList({ limit: 10, page: 1 })
        }
        catch (exception) {
            toast.error(exception.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>

            <div id="content">
                <AdminNavBar />
                <div className="container-fluid px-4">
                    <AdminBreadCrumb
                        pageTitle={"Banner List"}
                        actionUrl={"/banner/create"}
                        buttonLabel={"Add Banner"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "List Banner", url: null },
                        ]}
                    />
                </div>

                <div className="row my-3 mx-3">
                    <div className="col-12">
                        <h4>Banner List</h4>
                        <hr></hr>
                        <table className="table table-sm table-borderd">
                            <thead className="table-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Link</th>
                                    <th>Status</th>
                                    <th>Image</th>
                                    <th>#</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>Title</td>
                                    <td>www.google.com</td>
                                    <td>
                                        <span>Un-pulished</span>
                                    </td>
                                </tr> */}
                                {
                                    loading ? <>
                                        <tr>
                                            <td colSpan={5}>
                                                <LoadingComponent />
                                            </td>
                                        </tr>
                                    </> : <>
                                        {

                                            data && data.map((banners, ind) => (

                                                <tr key={ind}>
                                                    <td>{banners.title}</td>
                                                    <td style={{ width: "20px" }}>{banners.url}</td>
                                                    <td>
                                                        <span className={`badge text-bg-${banners.status === 'active' ? 'success' : 'danger'}`}>
                                                            {banners.status === 'active' ? "Published" : "Un-Published"}

                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Image onError={(e) => {
                                                            e.target.src = "https://dummyimage.com/100/40/d4d4d4/7d7d7d&text=Banner+Image"
                                                        }} src={import.meta.env.VITE_IMAGE_URL + "banner/" + banners.image} alt="" style={{ width: "90px" }} fluid sizes="sm" />
                                                    </td>
                                                    <td style={{ width: "50px" }}>
                                                        <NavLink onClick={(e) => {
                                                            e.preventDefault()
                                                            confirmDelete(banners._id)
                                                        }} className={'btn btn-danger rounded-circle my-2'}>
                                                            <i className="fa fa-trash"></i>
                                                        </NavLink>
                                                       
                                                       <NavLink to={'/admin/banner/'+banners._id+'/edit'} className={'btn btn-danger rounded-circle my-2'}>
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


        </>

    )
}
export default BannerMain
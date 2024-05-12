import { NavLink } from "react-router-dom"
import AdminBreadCrumb from "../admin-breadcrumb"
import AdminNavBar from "../admin.navbar"
import { useEffect, useState } from "react"
import BannerSvc from "./bannerSvc"
import LoadingComponent from "../../../loading/loading-component"
import { toast } from "react-toastify"

const BannerMain = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    const getBannerList = async ({limit=10,page=1}) => {
        console.log("i m hr1")
        try {
            
            setLoading(true)
            const bannerList = await BannerSvc.listBanner({limit:limit,page:page})

            setData(bannerList.result)

        }
        catch (exception) {
            console.log("exception in getbannerlist",exception)
            toast.warning("Error loading banner data .....")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBannerList({limit:1,page:1})
    })
   
    return (
        <>

            <div id="content">
                <AdminNavBar />
                <div className="container-fluid px-4">
                    <AdminBreadCrumb
                        pageTitle={"Banner List"}
                        actionUrl={"/admin/banner/create"}
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
                                                    <td>{banners.url}</td>
                                                    <td>
                                                        <span className={`badge text-bg-${banners.status === 'active' ? 'success' : 'danger'}`}>
                                                            {banners.status === 'active' ? "Published" : "Un-Published"}

                                                        </span>
                                                    </td>
                                                    <td>{banners.image}</td>
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


        </>

    )
}
export default BannerMain
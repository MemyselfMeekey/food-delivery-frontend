import AdminNavBar from "../admin.navbar"
import AdminBreadCrumb from "../admin-breadcrumb"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Spinner } from "react-bootstrap"
import OfferSvc from "./offer-service"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

const OfferMain = () => {

    const [loading, setLoading] = useState(false)

    const [offerList, setOfferList] = useState()


    const LoadOfferList = async () => {
        try {
            setLoading(true)
            const response = await OfferSvc.getAllOffer({ page: 1, limit: 10 })
            
            setOfferList(response.result)
        }
        catch (exception) {
            toast.warn(exception.message)
            console.log("exception", exception)
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        LoadOfferList()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };


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
                    deleteOffer(id)
                }
            });

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    const deleteOffer = async (id) => {
        try {
            setLoading(true)
            const response = await OfferSvc.deleteOffer(id)
            toast.success(response.message)
            LoadOfferList({ page: 1, limit: 10 })
        }
        catch (exception) {
            toast.warn(exception.message)
            console.log("Exception", exception)
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <>
            <div className="content">
                <AdminNavBar />
                <div className="container">
                    <AdminBreadCrumb
                        pageTitle={"Offer Management"}
                        actionUrl={"/offer/create"}
                        buttonLabel={"Add Offer"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "List Offer", url: null }
                        ]}
                    />
                    <div className="row">
                        <div className="col-12">
                            <h4>Offer List</h4>
                            <hr></hr>
                            <table className="table table-sm table-borderd">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Offer On</th>
                                        <th>Start On</th>
                                        <th>End On</th>
                                        <th>Show In Home</th>
                                        <th>Discount</th>
                                        <th>Final Price</th>
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
                                                offerList && offerList.map((offer, inx) => (
                                                    <tr key={inx}>
                                                        <td>
                                                            {offer.description}
                                                        </td>

                                                        <td>
                                                        {offer.menu.map(menuItem => menuItem.menuId.name).join(' , ')}
                                                        </td>

                                                        <td>
                                                            {formatDate(offer.startDate)}
                                                        </td>
                                                        <td>
                                                            {formatDate(offer.endDate)}
                                                        </td>
                                                        <td>
                                                            <span className={`badge text-bg-${offer.showInHome === true ? 'success' : 'danger'}`}>
                                                                {offer.showInHome === true ? "Yes" : "No"}
                                                            </span>

                                                        </td>

                                                        <td>
                                                            {offer.menu.map(menuItem=>menuItem.offerDiscount ).join(' % | ')} %
                                                        </td>

                                                        <td>
                                                        {offer.menu.map(menuItem=>menuItem.offerPrice).join(' | ')}
                                                        </td>
                                                        <td>
                                                            <NavLink onClick={(e) => {
                                                                e.preventDefault()
                                                                confirmDelete(offer._id)
                                                            }} className={"mx-2 btn btn-danger rounded-circle"} >
                                                                <i className="fa fa-trash"></i>
                                                            </NavLink>
                                                            <NavLink to={"/admin/offer/" + offer._id + "/edit"} className={"btn btn-danger rounded-circle"}>
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

export default OfferMain
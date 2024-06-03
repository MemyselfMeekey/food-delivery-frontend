import { useEffect, useState } from "react"
import AdminBreadCrumb from "../admin-breadcrumb"
import AdminNavBar from "../admin.navbar"
import { toast } from "react-toastify"
import OrderSvc from "./order-service"
import { Spinner } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

const OrderMain = () => {

    const [loading,setLoading]=useState(false)
    const [cartList,setCartList]=useState()

    const LoadCart=async()=>{
        try{
            setLoading(true)
            const response=await OrderSvc.getOrderList()
         
            setCartList(response.result)
        }
        catch(exception){
            toast.exception(exception.message)
            console.log(exception)
        }
        finally{
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        LoadCart()
    },[])

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
                    deleteCart(id)
                }
            });

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    const deleteCart=async(id)=>{
        try{
            const response=await OrderSvc.deleteOrder(id)
            toast.success(response.message)
            LoadCart()
        }
        catch(exception){
            toast.warn(exception.message)
            console.log(exception)
        }
    }


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
                                        <th>Cart Order</th>
                                        <th>Quantity</th>
                                        <th>Buyer Email</th>
                                        <th>Cart Creator</th>
                                        <th>Total Amount</th>
                                        <th>Is Paid</th>
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
                                            cartList && cartList.map((carts,inx)=>(
                                                <tr key={inx}>
                                                    <td>
                                                    {carts.menuDetail.name}
                                                    </td>
                                                    <td>
                                                        {carts.quantity}
                                                    </td>
                                                    <td>
                                                        {carts.buyerId.email}
                                                    </td>
                                                    <td>
                                                        {carts.createdBy.email}
                                                    </td>
                                                    <td>
                                                        {carts.amount}
                                                    </td>
                                                    <td>
                                                        {carts.isPaid==='null'?'No':'Yes'}
                                                    </td>
                                                    <td>
                                                        {carts.status}
                                                    </td>
                                                    <td>
                                                    <NavLink onClick={(e) => {
                                                                e.preventDefault()
                                                                confirmDelete(carts._id)
                                                            }} className={"mx-2 btn btn-danger rounded-circle"} >
                                                                <i className="fa fa-trash"></i>
                                                            </NavLink>
                                                            <NavLink to={"/admin/order/" + carts._id + "/edit"} className={"btn btn-danger rounded-circle"}>
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
export default OrderMain
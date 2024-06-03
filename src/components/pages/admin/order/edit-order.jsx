import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import OrderSvc from "./order-service"
import { useEffect } from "react"
import AdminNavBar from "../admin.navbar"
import AdminBreadCrumb from "../admin-breadcrumb"
import { FormActionButtons } from "../../../cms/form/form-action-buttons"
import { SelectionButton, TextInput } from "../../../cms/form/input-component"
import {Form,Row,Col} from "react-bootstrap"
import { useForm } from "react-hook-form"

const EditOrder = () => {

    const params = useParams()

    const {formState:{errors},handleSubmit,control,setValue}=useForm()

    const OrderList = async () => {
        try {
            const response = await OrderSvc.getOrderById(params.id)
            // console.log("response.result", response.result)

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log("exception", exception)
        }
    }

    useEffect(() => {
        OrderList()
    }, [])


    return (
        <>
            <div className="content">
                <AdminNavBar />
                <div className="container-fluid px-4">
                <AdminBreadCrumb
                    pageTitle={"Order Management"}
                    breadCrumbData={[
                        { label: "Dashboard", url: "/admin" },
                        { label: "List order", url: "/admin/order" },
                        { label: "Edit order", url: null }
                    ]}
                />
                <div className="row my-3">
                    <div className="col-12">
                        <hr />
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label className="col-sm-3" htmlFor="menuId">
                                    Cart Name
                                </Form.Label>
                                <Col sm={9}>
                                    <SelectionButton
                                        name={"menuId"}
                                        control={control}
                                        options={[]}
                                        multiple={false}
                                        errMsg={errors?.menuId?.message}
                                    />
                                </Col>
                                <Form.Label className="col-sm-3" htmlFor="quantity">
                                    Quantity
                                </Form.Label>
                                <Col sm={9}>
                                    <TextInput
                                        name={"quantity"}
                                        control={control}
                                        placeholder="Enter the quantity"
                                        type="number"
                                        errMsg={errors?.quantity?.message}
                                    />
                                </Col>
                                <Col sm={{ span: 9, offset: 3 }}>
                                    <FormActionButtons
                                        resetLabel="Reset"
                                        submitLabel="Submit"
                                        loading={false}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                </div>
            </div>

        </>
    )
}
export default EditOrder
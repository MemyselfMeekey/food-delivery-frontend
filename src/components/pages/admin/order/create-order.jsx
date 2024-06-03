import { Row, Col, Form } from "react-bootstrap";
import AdminBreadCrumb from "../admin-breadcrumb";
import AdminNavBar from "../admin.navbar";
import { SelectionButton, TextInput } from "../../../cms/form/input-component";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MenuSvc from "../menu/menu-service";
import { useEffect, useState } from "react";
import { FormActionButtons } from "../../../cms/form/form-action-buttons";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import OrderSvc from "./order-service";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {

    const navigate=useNavigate()

    const rules = Yup.object({
        menuId:  Yup.object({
            label: Yup.string().nullable().optional(),
            value: Yup.string().nullable().optional(),
        }),
        quantity: Yup.number().required("Quantity is required").min(1, "Quantity must be at least 1"),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(rules),
        defaultValues: {
            menuId: "",
            quantity: 1
        }
    });

    const [menuList, setMenuList] = useState([]);

    const ListMenus = async () => {
        try {
            const response = await MenuSvc.getAllData({ page: 1, limit: 1000 });
            const options = response.result.map((menus) => ({
                label: menus.name,
                value: menus._id
            }));
            setMenuList(options);
        } catch (exception) {
            toast.warn(exception.message);
            console.log("exception", exception);
        }
    };

    useEffect(() => {
        ListMenus();
    }, []);

    const submitOrder = async (data) => {
        try {
            let payload=data
            payload.menuId=data.menuId.value
            // Add your submission logic here
            console.log("Order payload",payload)
            const response=await OrderSvc.create(payload)
            toast.success(response.message);
            navigate('/admin/order')
        } catch (exception) {
            toast.warn(exception.message);
            console.log(exception);
        }
    };

    return (
        <>
            <div className="content">
                <AdminNavBar />
                <div className="container-fluid">
                    <AdminBreadCrumb
                        pageTitle={"Order Management"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "List order", url: "/admin/order" },
                            { label: "Create order", url: null }
                        ]}
                    />
                    <div className="row my-3">
                        <div className="col-12">
                            <hr />
                            <Form onSubmit={handleSubmit(submitOrder)}>
                                <Form.Group as={Row}>
                                    <Form.Label className="col-sm-3" htmlFor="menuId">
                                        Cart Name
                                    </Form.Label>
                                    <Col sm={9}>
                                        <SelectionButton
                                            name={"menuId"}
                                            control={control}
                                            options={menuList}
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
    );
}

export default CreateOrder;

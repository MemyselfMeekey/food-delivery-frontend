import { toast } from "react-toastify";
import OrderSvc from "../admin/order/order-service";
import { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { SelectionButton, TextInput } from "../../cms/form/input-component";
import { FormActionButtons } from "../../cms/form/form-action-buttons";
import { useForm } from "react-hook-form";
import MenuSvc from "../admin/menu/menu-service";
import HomeSlider from "../home/slider/home-slider";
import { NavLink } from "react-router-dom";

const CustomerCart = () => {
    const [myCart, setMyCart] = useState([]);
    const { formState: { errors }, handleSubmit, control, setValue } = useForm();

    const LoadMyCart = async () => {
        try {
            const response = await OrderSvc.getMyCart();
            console.log("response.result", response.result);
            response.result.forEach((item, index) => {
                setValue(`menuId`, item.menuDetail.name); // Assuming the menuDetail has an _id property
                setValue(`quantity`, item.quantity); // Assuming there's a quantity property
                setValue(`amount`, item.amount); // Assuming there's a quantity property
            });
            setMyCart(response.result);
        } catch (exception) {
            toast.warn(exception.message);
            console.log("exception", exception);
        }
    };

    const [menuList, setMenuList] = useState([]);

    const ListMenus = async () => {
        try {
            const response = await MenuSvc.homeList({ page: 1, limit: 1000 });
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
        LoadMyCart();
        ListMenus();
    }, []);

    const submitCart=(data)=>{
        try{
            console.log(data)
        }
        catch(exception){
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 my-4">
                        <Form onSubmit={handleSubmit(submitCart)}>
                            {myCart.map((item, index) => (
                                <Form.Group as={Row} key={index}>
                                    <Form.Label className="col-sm-3" htmlFor={`menuId`}>
                                        Cart Name
                                    </Form.Label>
                                    <Col sm={9}>
                                        <SelectionButton
                                            name={`menuId`}
                                            control={control}
                                            options={menuList}
                                            multiple={false}
                                            placeholder={`${myCart[0].menuDetail.name}`}
                                            errMsg={errors?.[`menuId`]?.message}
                                        />
                                    </Col>
                                    <Form.Label className="col-sm-3" htmlFor={`quantity`}>
                                        Quantity
                                    </Form.Label>
                                    <Col sm={9}>
                                        <TextInput
                                            name={`quantity`}
                                            control={control}
                                            placeholder="Enter the quantity"
                                            type="number"
                                            defaultValue={item.quantity}
                                            errMsg={errors?.[`quantity`]?.message}
                                        />
                                    </Col>
                                    <Form.Label className="col-sm-3" htmlFor={`amount`}>
                                        Totalprice
                                    </Form.Label>
                                    <Col sm={9}>
                                        <TextInput
                                            name={`amount`}
                                            control={control}
                                            type="number"
                                            defaultValue={item.amount}
                                            readOnly={true}
                                            errMsg={errors?.[`amount`]?.message}
                                        />
                                    </Col>
                                </Form.Group>
                            ))}
                            <Col sm={{ span: 9, offset: 3 }}>
                              <NavLink className="btn btn-success" to="/customer/order">Place Order</NavLink>
                              <NavLink className="btn btn-danger mx-4">Cancel Cart</NavLink>
                            </Col>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="mx-2">
                <HomeSlider />
            </div>
        </>
    );
};

export default CustomerCart;

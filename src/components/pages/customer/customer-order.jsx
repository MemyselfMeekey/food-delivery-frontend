import { toast } from "react-toastify";
import OrderSvc from "../admin/order/order-service";
import { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { TextInput } from "../../cms/form/input-component";
import { FormActionButtons } from "../../cms/form/form-action-buttons";
import { useForm } from "react-hook-form";
import MenuSvc from "../admin/menu/menu-service";
import HomeSlider from "../home/slider/home-slider";
import { useNavigate } from "react-router-dom"

const CustomerOrder = () => {
    const navigate=useNavigate()
    const [myCart, setMyCart] = useState([]);
    const { formState: { errors }, handleSubmit, control, setValue } = useForm();

    const LoadMyCart = async () => {
        try {
            const response = await OrderSvc.getMyCart();
            console.log("response.result", response.result);
            response.result.forEach((item) => {
                setValue(`quantity-${item._id}`, item.quantity); // Assuming there's a quantity property
            });
            setMyCart(response.result);
        } catch (exception) {
            toast.warn(exception.message);
            console.log("exception", exception);
        }
    };

    useEffect(() => {
        LoadMyCart();
    }, []);

    const submitCart = async () => {
        try {
            const cartData={
                cartId:myCart._id,
                discount:0,
                deliveryCharge:150
            }

            // Assuming there's an OrderSvc.createOrder method to handle the submission
            const response = await OrderSvc.createOrder(cartData);
            toast.success(response.message);
            navigate('/')
        } catch (exception) {
            toast.warn(exception.message);
            console.log(exception);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 my-4">
                        <Form onSubmit={handleSubmit(submitCart)}>
                            {myCart.map((item) => (
                                <Form.Group as={Row} key={item._id}>
                                    <Form.Label className="col-sm-3">
                                        Cart Name
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={item.menuDetail.name}
                                        />
                                    </Col>
                                    <Form.Label className="col-sm-3">
                                        Quantity
                                    </Form.Label>
                                    <Col sm={9}>
                                        <TextInput
                                            name={`quantity-${item._id}`}
                                            control={control}
                                            type="number"
                                            defaultValue={item.quantity}
                                            readOnly={true}
                                            errMsg={errors?.[`quantity-${item._id}`]?.message}
                                        />
                                    </Col>
                                </Form.Group>
                            ))}
                            <Col sm={{ span: 9, offset: 3 }}>
                                <FormActionButtons
                                    resetLabel="Cancel"
                                    submitLabel="Purchase"
                                />
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

export default CustomerOrder;

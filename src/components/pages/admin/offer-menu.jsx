import { useEffect, useState } from "react";
import { Row, Button, Col, Form } from "react-bootstrap";
import Select from "react-select";

export const MenuSelectorComponent = ({ menuOffer, setMenuOffer, selectionMenu }) => {
    const [menuAttrs, setMenuAttrs] = useState([]);

    useEffect(() => {
        if (menuOffer) {
            setMenuAttrs(menuOffer);
        }
    }, [menuOffer]);

    const addMoreOffer = () => {
        setMenuAttrs([...menuAttrs, { menuId: "", offerDiscount: "" }]);
    };

    const handleMenuIdChange = (index, selectedOption) => {
        const updatedMenuAttrs = [...menuAttrs];
        updatedMenuAttrs[index].menuId = selectedOption;
        setMenuAttrs(updatedMenuAttrs);
        setMenuOffer(updatedMenuAttrs);
    };

    const handleOfferDiscountChange = (index, event) => {
        const updatedMenuAttrs = [...menuAttrs];
        updatedMenuAttrs[index].offerDiscount = event.target.value;
        setMenuAttrs(updatedMenuAttrs);
        setMenuOffer(updatedMenuAttrs);
    };

    const handleRemoveOffer = (index) => {
        const updatedMenuAttrs = menuAttrs.filter((_, i) => i !== index);
        setMenuAttrs(updatedMenuAttrs);
        setMenuOffer(updatedMenuAttrs);
    };

    return (
        <>
            {menuAttrs.map((attr, ind) => (
                <Row className="mb-3" key={ind}>
                    <Col sm={5} md={4}>
                        <Select
                            options={selectionMenu}
                            value={attr.menuId}
                            onChange={(selectedOption) => handleMenuIdChange(ind, selectedOption)}
                            isClearable={true}
                        />
                    </Col>
                    <Col sm={5} md={6}>
                        <Form.Control
                            type="number"
                            value={attr.offerDiscount}
                            onChange={(e) => handleOfferDiscountChange(ind, e)}
                            size="sm"
                            placeholder="Offer in %"
                        />
                    </Col>
                    <Col sm={2} md={2}>
                        <Button type="button" size="sm" variant="danger" className="me-3" onClick={() => handleRemoveOffer(ind)}>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Col>
                </Row>
            ))}
            <hr />
            <Button type="button" size="sm" variant="success" className="float-end" onClick={addMoreOffer}>
                Add Offer In Items
            </Button>
        </>
    );
};

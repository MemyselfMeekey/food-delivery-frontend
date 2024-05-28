import { useEffect, useState } from "react"
import { Row, Button, Col,Form } from "react-bootstrap"
import Select from "react-select"

export const MenuSelectorComponent = ({ menuOffer, setMenuOffer, selectionMenu }) => {

    let [menuAttrs, setMenuAttrs] = useState(null)

    useEffect(() => {
        setMenuAttrs(menuOffer)
    }, [menuOffer])

    const addMoreOffer=()=>{
        try{
            let oldAttrs=[]
            if(menuAttrs){
                oldAttrs=[...menuAttrs,{menuId:"",offerDiscount:""}]
            }else{
                oldAttrs=[{menuId:"",offerDiscount:""}]
            }
            setMenuAttrs([...oldAttrs])
        }
        catch(exception){
            console.log("exception",exception)
        }
    }

    return (
        <>
            {
                menuAttrs && menuAttrs.map((attr, ind) => (
                    <Row className="mb-3" key={ind}>
                        <Col sm={5} md={4}>
                          <Select
                            size="sm"
                            options={selectionMenu}
                            isClearable={true}
                            // isMulti={true}
                            // placeholder="MenuItem"
                            // onChange={(e)=>{
                            //     const val=e.target.value
                            // }}
                          />

                        </Col>
                        <Col sm={5} md={6}>
                            <Form.Control

                                type="number"

                                size="sm"
                                className="mb-3"
                                placeholder="Offer in %"
                                onChange={(e)=>{
                                    const val=e.target.value
                                }}
                            />
                        </Col>
                        <Col sm={2} md={2}>
                            <Button type="button" size="sm" variant="danger" className="me-3" onClick={(e)=>{
                                
                            }}>
                                <i className="fa fa-trash"></i>
                            </Button>
                        </Col>
                    </Row>
                ))
            }
            <hr />

            <Button type="button" size="sm" variant="success" className="float-end" onClick={addMoreOffer}>
                Add Offer In Items
            </Button>

        </>
    )
}
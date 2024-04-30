import { Button, Col, Form } from "react-bootstrap"

export const FormActionButtons=({resetLabel="",submitLabel=""})=>{
    return(
        <>
        <Form.Group className="row mb-3 py-4">
            <Col sm={{offset:2,span:8}}>
                <Button variant="danger" type="reset" className="me-3" size="sm" >
                    <i className="fa fa-undo"></i> {resetLabel}
                </Button>
                
                <Button variant="success" type="submit" size="sm">
                    <i className="fa fa-paper-plane"></i> {submitLabel}
                </Button>
            </Col>


        </Form.Group>
        
        </>
    )
}
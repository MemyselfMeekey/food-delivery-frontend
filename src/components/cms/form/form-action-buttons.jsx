import { Button, Col, Form } from "react-bootstrap"

export const FormActionButtons=({resetLabel="Reset",submitLabel="Submit",loading=false})=>{
    return(
        <>
        <Form.Group className="row mb-3 py-2">
            <Col sm={{offset:2,span:8}}>
                <Button disabled={loading} variant="danger" type="reset" className="me-3" size="sm" >
                    <i className="fa fa-undo"></i> {resetLabel}
                </Button>
                
                <Button disabled={loading} variant="success" type="submit" size="sm">
                    <i className="fa fa-paper-plane"></i> {submitLabel}
                </Button>
            </Col>


        </Form.Group>
        
        </>
    )
}
import { Row,Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const AdminPageTitle = ({ children }) => {
    return (<>
        <h1 className="">
            {children}
        </h1>
    </>)
}


const AdminBreadCrumb = ({ pageTitle, breadCrumbData, actionUrl = null, buttonLabel = null }) => {

    return (
        <>
            <Row>
                <Col sm={12} md={6}>
                    <AdminPageTitle>
                        {pageTitle}
                    </AdminPageTitle>
                </Col>
                <Col sm={12} md={6}>
                    {
                        actionUrl && <>
                            <NavLink className={'btn btn-sm btn-success mt-5 mb-2 float-end'} to={`/admin${actionUrl}`}><i className="fa fa-plus"></i> {buttonLabel}
                            </NavLink>
                        </>
                    }
                </Col>
            </Row>

            <ol className="breadcrumb mb-4">
                {

                    breadCrumbData && breadCrumbData.map((item, ind) => (

                        <li className={`breadcrumb-item ${item.url ? '' : 'active'}`} key={ind}>
                            {
                                item.url ? <>
                                    <NavLink to={item.url}>
                                        {item.label}
                                    </NavLink>
                                </> : <>
                                {item.label}
                                </>
                            }

                        </li>
                    ))
                }
            </ol>
        </>
    )
}
export default AdminBreadCrumb
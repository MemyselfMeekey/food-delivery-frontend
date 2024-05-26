import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavBar from '../admin.navbar';
import AdminBreadCrumb from '../admin-breadcrumb';
import { Col, Form, Row } from 'react-bootstrap';
import { DropDownInput, SelectionButton, TextInput } from '../../../cms/form/input-component';
import { FormActionButtons } from '../../../cms/form/form-action-buttons';
import AuthSvc from '../../auth/auth.service';

const CreateUser = () => {
    const navigate = useNavigate();

    const rules = Yup.object({
        name: Yup.string().min(5).max(50).required(),
        email: Yup.string().email().required(),
        role: Yup.string().matches(/^(customer)$/).default('customer').required(),
        phone: Yup.string().nullable().optional().default(null)
    });

    const { formState: { errors }, control, handleSubmit } = useForm({
        resolver: yupResolver(rules)
    });

    const submitUser = async (data) => {
        try {
            const respons=await AuthSvc.register(data)
            toast.success(respons.message)
            navigate("/admin/user")
        } catch (exception) {
            toast.warn(exception.message);
            console.log(exception);
        }
    }
    console.log("errors",errors)

    return (
        <>
            <div className="content">
                <AdminNavBar />
                <div className="container-fluid px-4">
                    <AdminBreadCrumb
                        pageTitle={"User Management"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "List Category", url: "/admin/user" },
                            { label: "Create User", url: null }
                        ]}
                    />
                    <div className="row my-3">
                        <div className="col-12">
                            <hr />
                            <Form onSubmit={handleSubmit(submitUser)}>
                                <Form.Group as={Row}>
                                    <Form.Label className="col-sm-3" htmlFor="email">
                                        Email:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <TextInput
                                            name="email"
                                            type="email"
                                            id="email"
                                            placeholder="Enter user email"
                                            errMsg={errors.email?.message}
                                            control={control}
                                        />
                                    </Col>
                                    <hr />
                                    <Form.Label className="col-sm-3" htmlFor="username">
                                        Username:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <TextInput
                                            name="name"
                                            type="text"
                                            id="username"
                                            placeholder="Enter user name"
                                            errMsg={errors.name?.message}
                                            control={control}
                                        />
                                    </Col>
                                    <hr />
                                    <Form.Label className="col-sm-3" htmlFor="phone">
                                        Phone Number:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <TextInput
                                            name="phone"
                                            type="text"
                                            id="phone"
                                            placeholder="Enter phone number"
                                            errMsg={errors.phone?.message}
                                            control={control}
                                        />
                                    </Col>
                                    <hr />
                                    <Form.Label className="col-sm-3" htmlFor="role">
                                        Role:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <DropDownInput
                                            name={"role"}
                                            options={[
                                                {label:"Customer",value:"customer" },
                                                // { label:"Admin",value:"admin" }
                                            ]}
                                            multiple={false}
                                            errMsg={errors.role?.message}
                                            control={control}
                                        />
                                    </Col>
                                    <hr />
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

export default CreateUser;

import React from 'react';
import { useForm } from 'react-hook-form';
import {useEffect} from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavBar from '../admin.navbar';
import AdminBreadCrumb from '../admin-breadcrumb';
import { Col, Form, Row } from 'react-bootstrap';
import { DropDownInput, SelectionButton, TextInput } from '../../../cms/form/input-component';
import { FormActionButtons } from '../../../cms/form/form-action-buttons';
import AuthSvc from '../../auth/auth.service';




const EditUser=()=>{

    const params=useParams()

    const {formState:errors,handleSubmit,control,setValue} =useForm()

    const navigate = useNavigate();

    const rules = Yup.object({
        name: Yup.string().min(5).max(50).required(),
        email: Yup.string().email().required(),
        role: Yup.string().matches(/^(customer)$/).default('customer').required(),
        phone: Yup.string().nullable().optional().default(null)
    });

    const LoadUserById=async()=>{
        try{
            const response=await AuthSvc.getUserById(params.id)
            // console.log("response.result",response.result)
            setValue('name',response.result.name)
            setValue('email',response.result.email)
            setValue('phone',response.result.phone)
            setValue('role',response.result.role)
        }
        catch(exception){
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    useEffect(()=>{
        LoadUserById()
    },[])

    const submitEditUser=async(data)=>{
        try{
            const response=await AuthSvc.updateId(params.id,data)
            toast.success(response.message)
            navigate('/admin/user')
        }
        catch(exception){
            toast.warn(exception.message)
            console.log(exception)
        }
    }

    
    return(
        <>
        <div className="content">
            <AdminNavBar/>
            <div className="container-fluid">
                <AdminBreadCrumb
                    pageTitle={"User Management"}
                    breadCrumbData={[
                        { label: "Dashboard", url: "/admin" },
                        { label: "List User", url: "/admin/user" },
                        { label: "Edit User", url: null }
                    ]}
                />
                 <div className="row">
                    <div className="col-sm-9 col-md-12">
                    <hr />
                            <Form onSubmit={handleSubmit(submitEditUser)} >
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
    )
}
export default EditUser
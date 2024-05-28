import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavBar from '../admin.navbar';
import AdminBreadCrumb from '../admin-breadcrumb';
import { Col, Form, Row } from 'react-bootstrap';
import { SelectionButton, TextInput, SwitchCase, TextAreaInput, MultipleFileUpload } from '../../../cms/form/input-component';
import { FormActionButtons } from '../../../cms/form/form-action-buttons';
import CategorySvc from '../category/category.service';
import MenuSvc from './menu-service';
import { InlineMultipleFormUploadElem } from '../../../cms/form/form-grid';

const EditMenu = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [checked, setChecked] = useState(false)

    const [thumb,setThumb]=useState()

    const [catOptions,setCatOptions]=useState()
    
    const [loading,setLoading]=useState(false)

    const rules = Yup.object({
        name: Yup.string().min(2).required(),
        description: Yup.string().optional(),
        price: Yup.number().min(1).required(),
        categories: Yup.array(Yup.object({
            label: Yup.string().nullable().optional(),
            value: Yup.string().nullable().optional()
        }
        )).notRequired(),
        discount: Yup.number().min(0).max(100).default(0).nullable(),
        status: Yup.object({
            label: Yup.string().matches(/^(Publish|Unpublish)$/).required(),
            value: Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        showInHome: Yup.boolean().default(false),

    })



    const { control, handleSubmit, setValue, formState: { errors }, getValues,setError } = useForm()

    const LoadCategories=async()=>{
        try{    
            const response=await CategorySvc.listAll({page:1,limit:1000})
            const options=response.result.map((cat)=>{
                return{
                    label:cat.name,
                    value:cat.id
                }
            })
            setCatOptions(options)
        }
        catch(exception){
            console.log(exception)

        }
    }

    const submitEvent = async (data) => {
        try {
           setLoading(true)
            
           let formData = new FormData()

            formData.append('name', data.name)
            formData.append('description', data.description)
            if (data.categories) {
                data.categories.map((cat, ind) => {
                    formData.append(`categories[${ind}]`, cat.value)
                })
            }
            formData.append("price", (data.price))
            formData.append("discount", (data.discount))
            formData.append("showInHome", data.showInHome ? true : false)
            formData.append("status", data.status.value || 'inactive')
            if (thumb) {
                thumb.map((image) => {
                    formData.append('images', image, image.name)
                })
            }
            const status = await MenuSvc.update(formData, params.id)
       
            toast.success(status.message)
            navigate('/admin/menu')
        }
        catch (exception) {
            toast.error(exception.message)
            console.log("exception", exception)
        }
        finally {
            setLoading(false)
        }
    }

    const getMenuDetail = async () => {
        try {
            setLoading(true)
            const response = await MenuSvc.getDataById(params.id)
       
            if (response.result) {
                setValue("name", response.result.name)
                setValue("description",response.result.description)
                setValue("status", {
                    label: response.result.status === 'active' ? 'Publish' : 'Unpublish',
                    value: response.result.status
                })

                if (response.result.categories) {
                    const categoryOptions = response.result.categories.map(cat => ({
                        label: cat.name,
                        value: cat._id
                    }));
                    setValue("categories", categoryOptions);
                }

                setValue("price",response.result.price)
                setValue("discount",response.result.discount)
               
                setValue('showInHome', response.result.showInHome)
                setValue('images', response.result.images)
             
                setChecked(response.result.showInHome)
             

            }
        }
        catch (exception) {
            toast.error(exception.message)
            console.log("exception",exception)

            navigate('/admin/product')
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getMenuDetail(),
        LoadCategories()
    }, [])

//     console.log("errors",errors)
    console.log("catOpts",checked)

    return (
        <>
       <AdminNavBar/>
             <div className="container-fluid px-4">

                 <AdminBreadCrumb
                     pageTitle={"Menu Management"}
                     breadCrumbData={[
                         { label: "Dashboard", url: "/admin" },
                         { label: "List Menu", url: "/admin/menu" },
                         { label: "Edit Menu", url: null }
                     ]}
                 />
                 <div className="row my-3">
                     <div className="col-12">
                         <h4>Menu edit</h4>
                         <hr></hr>

                         <Form onSubmit={handleSubmit(submitEvent)} >
                                 <Form.Group as={Row}>
                                     <Form.Label className="col-sm-3" htmlFor="name">
                                         Item Name:
                                     </Form.Label>
                                     <Col sm={9}>
                                         <TextInput
                                             name="name"
                                             type="name"
                                             id="name"
                                             placeholder="Enter item name"
                                             errMsg={errors.name?.message}
                                             control={control}
                                         />
                                     </Col>
                                     <hr />

                                     <Form.Label className="col-sm-3" htmlFor="description">
                                         Item Description:
                                     </Form.Label>
                                     <Col sm={9}>
                                         <TextAreaInput
                                             name={"description"}
                                             control={control}
                                             placeholder="Enter product description"

                                             multiple={false}
                                             errMsg={errors?.parentId?.message}

                                         />
                                     </Col>
                                     <hr />

                                     <Form.Label className="col-sm-3" htmlFor="itemcategory">
                                         Item Category:
                                     </Form.Label>
                                     <Col sm={9}>

                                         <SelectionButton
                                             name={"categories"}
                                             control={control}
                                             options={catOptions}
                                             multiple={true}
                                             errMsg={errors?.categories?.message}
                                         />
                                     </Col>
                                     <hr />


                                     <Form.Label className="col-sm-3" htmlFor="price">
                                         Item Price:
                                     </Form.Label>
                                     <Col sm={9}>
                                         <TextInput
                                             name="price"
                                             type="number"
                                             id="price"
                                             placeholder="Enter price in Npr."
                                             errMsg={errors.price?.message}
                                             control={control}
                                         />
                                     </Col>
                                     <hr />

                                     <Form.Label className="col-sm-3" htmlFor="discount">
                                         Item Discount %:
                                     </Form.Label>
                                     <Col sm={9}>
                                         <TextInput
                                             name="discount"
                                             type="number"
                                             id="discount"
                                             placeholder="Enter discount in percentage"
                                             errMsg={errors.discount?.message}
                                             control={control}
                                         />
                                     </Col>
                                     <hr />

                                     <Form.Label className="col-sm-3" htmlFor="showInHome">
                                         Show In Home:
                                     </Form.Label>
                                     <Col sm={9} >
                                         <SwitchCase
                                             name="showInHome"
                                             control={control}
                                             defaultValue={checked}
                                             errMsg={errors?.showInHome?.message}
                                         />
                                     </Col>
                                     <hr />
                                     <Form.Label className="col-sm-3" htmlFor="itemStatus">
                                         Item Status:
                                     </Form.Label>
                                     <Col sm={9} >
                                         <SelectionButton
                                             name={"status"}
                                             control={control}
                                             default={checked}
                                             options={[
                                                 { label: "Publish", value: "active" },
                                                 { label: "Unpublish", value: "inactive" }
                                             ]}
                                             multiple={false}
                                             errMsg={errors?.status?.message}
                                         />
                                     </Col>
                                     <hr />

                                     <InlineMultipleFormUploadElem label={"Menu Image"} thumb={thumb} baseUrl={import.meta.env.VITE_IMAGE_URL}>
                                         <MultipleFileUpload
                                             name={"images"}
                                             setThumb={setThumb}
                                             setValue={setValue}
                                             setError={setError}
                                             errMsg={errors?.images?.message}

                                         />

                                     </InlineMultipleFormUploadElem>

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
        </>
    )
}

export default EditMenu
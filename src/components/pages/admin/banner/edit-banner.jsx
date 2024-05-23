import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BannerSvc from "./bannerSvc"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import AdminNavBar from "../admin.navbar"
import AdminBreadCrumb from "../admin-breadcrumb"
import { Form,Row,Col } from "react-bootstrap"
import { SelectionButton, TextInput } from "../../../cms/form/input-component"
import { FormActionButtons } from "../../../cms/form/form-action-buttons"
import { toast } from "react-toastify"

const EditBanner=()=>{
    const navigate=useNavigate()
    const params=useParams()    
    const [loading,setLoading]=useState(false)

    const rules=Yup.object({
        title:Yup.string().min(3).required(),
        status:Yup.object({
            label:Yup.string().matches(/^(Publish|Unpublish)$/).required(),
            value:Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        url:Yup.string().url().nullable().optional()
    })


    const {control,formState:errors,handleSubmit,setValue}=useForm({
        resolver:yupResolver(rules)
    })




    const getBannerDetail=async()=>{

        try{
            const response=await BannerSvc.getDataById(params.id)
            console.log("response",response)
            if(response.result){
                setValue('title',response.result.title)
                setValue('status',{
                    label:response.result.status==='active'?'Publish':"UnPublish",
                    value:response.result.status
                })
            }
            setValue("url",response.result.url)
            setValue("image",response.result.image)

        }
        catch(exception){
            toast.warn(exception.message)
            navigate('/admin/banner')
        }
    }

    useEffect(()=>{
        getBannerDetail()
    },)

    const submitBannerEdit=async(data)=>{
        try{    
            setLoading(true)
            console.log(data)
            let payload=data
            payload.status=data.status.value
            const status=await BannerSvc.update(payload,params.id)
            toast.success(status.message)
            navigate('/admin/banner')

        }
        catch(exception){
            toast.warn(exception.message)
            console.log("exception",exception)
        }
        finally{
            setLoading(false)

        }

    }
    console.log(errors)


    return(
        <>
            <div className="content">
                <AdminNavBar/>
                <div className="container-fluid px-4">
                    <AdminBreadCrumb
                        pageTitle={"Banner Edit"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "ListBanner", url: "/admin/banner" },
                            { label: "Edit Banner", url: null }
                        ]}

                    />
                    <div className="row my-3">
                        <div className="col-12">
                            <br />
                            <hr />
                            <Form onSubmit={handleSubmit(submitBannerEdit)}>
                                <Form.Group as={Row} className="mx-3 mb-3" >
                                    <Form.Label className="col-sm-3" htmlFor="bannertitle">
                                        Banner Title:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <TextInput
                                            name={"title"}
                                            placeholder="Enter Banner title"
                                            errMsg={errors?.title?.message}
                                            defaultValue=""
                                            control={control}
                                        />
                                    </Col>
                                    <hr />
                                    <Form.Label className="col-sm-3" htmlFor="bannerUrl">
                                        Banner Url:
                                    </Form.Label>
                                    <Col sm={9} >
                                        <TextInput
                                            name={"url"}
                                            type="url"
                                            placeholder="Enter Banner Url"
                                            errMsg={errors?.url?.message}
                                            defaultValue=""
                                            control={control}
                                        />
                                    </Col>
                                    <hr />
                                    <Form.Label className="col-sm-3" htmlFor="bannerstatus">
                                        Banner Status:
                                    </Form.Label>
                                    <Col sm={9} >
                                        <SelectionButton
                                            name={"status"}
                                            control={control}
                                            options={[
                                                { label: "Publish", value: "active" },
                                                { label: "Unpublish", value: "inactive" }
                                            ]}
                                            multiple={false}
                                            errMsg={errors?.status?.message}
                                        />
                                    </Col>
                                    <hr />
                                    <Form.Label className="col-sm-3" htmlFor="bannerimage">
                                        Banner Image:
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control
                                            type="file"
                                            name="image"
                                            size="sm"
                                           onChange={(e)=>{
                                                const image=e.target.files[0]
                                                //size and type
                                                const ext=image.name.split(".").pop()
                                                const allowed=['jpg','png','svg','jpeg','webp','bmp']
                                                if(allowed.includes(ext.toLowerCase())){
                                                        if(image.size<=3000000){
                                                            //allowed sixze
                                                            setValue("image",image)
                                                        }
                                                        else{
                                                            setError("image", {message:"File size not allowed"})
                                                        }
                                                }
                                                else{
                                                    setError("image", {message:"File format not suported"})
                                                }
                                               
                                           }}
                                        />
                                              
                                        <span className="text-danger">{errors?.image?.message}</span>
                                    </Col>

                                </Form.Group>
                                <FormActionButtons
                                    resetLabel="Reset"
                                    submitLabel="Submit"
                                    loading={loading}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditBanner
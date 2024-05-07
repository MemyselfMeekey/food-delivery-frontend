import { Col, Form, Row } from "react-bootstrap"
import AdminBreadCrumb from "../admin-breadcrumb"
import AdminNavBar from "../admin.navbar"
import { SelectionButton, TextInput } from "../../../cms/form/input-component"
import { useForm } from "react-hook-form"
import { FormActionButtons } from "../../../cms/form/form-action-buttons"
import * as Yup from "yup"
import BannerSvc from "./bannerSvc"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"


const BannerCreate = () => {
    const navigate=useNavigate()

    const [loading,setLoading]=useState(false)

    const BannerRule=Yup.object({
        title:Yup.string().min(3).required(),
        status:Yup.object({
            label:Yup.string().matches(/^(Publish|Unpublish)$/).required(),
            value:Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        url:Yup.string().url().nullable().optional()
    
    })


    const { formState: { errors },setValue,setError, control,handleSubmit } = useForm({
        resolver:yupResolver(BannerRule)
    })

    const submitBannerCreate=async(data)=>{
        try{
            setLoading(true)
            let payload=data
            payload.status=data.status.value
            const status=await BannerSvc.bannerCreate(payload)
            toast.success(status.message)
            navigate("/admin/banner")
        }
        catch(exception){
            toast.warn("Banner couldnot be created")
            console.log (exception)
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <>
            <div className="content">
                <AdminNavBar />
                <div className="container-fluid px-4">
                    <AdminBreadCrumb
                        pageTitle={"Banner Create"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "ListBanner", url: "/admin/banner" },
                            { label: "Create Banner", url: null }
                        ]}

                    />
                    <div className="row my-3">
                        <div className="col-12">
                            <br />
                            <hr />
                            <Form onSubmit={handleSubmit(submitBannerCreate)}>
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
                                    <Form.Label className="col-sm-3" htmlFor="bannerUrl">
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
                                    <Form.Label className="col-sm-3" htmlFor="bannerUrl">
                                        Banner Image:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            size="sm"
                                            onChange={(e) => {
                                                const image = e.target.files[0]
                                                //size and type
                                                const ext = image.name.split(".").pop()
                                                const allowed = ['jpg', 'png', 'svg', 'jpeg', 'webp', 'bmp']
                                                if (allowed.includes(ext.toLowerCase())) {
                                                    if (image.size <= 3000000) {
                                                        //allowed sixze
                                                        setValue("image", image)
                                                    }
                                                    else {
                                                        setError("image", { message: "File size not allowed" })
                                                    }
                                                }
                                                else {
                                                    setError("image", { message: "File format not suported" })
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
export default BannerCreate
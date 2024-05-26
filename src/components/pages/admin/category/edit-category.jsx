import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import AdminNavBar from "../admin.navbar"
import AdminBreadCrumb from "../admin-breadcrumb"
import { Form, Row, Col } from "react-bootstrap"
import { SelectionButton, TextInput, SwitchCase } from "../../../cms/form/input-component"
import { FormActionButtons } from "../../../cms/form/form-action-buttons"
import { toast } from "react-toastify"
import CategorySvc from "./category.service"

const EditCategory = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false)
    const [catOpts, setCatOpts] = useState()

    const rules = Yup.object({
        name: Yup.string().min(3).required(),
        status: Yup.object({
            label: Yup.string().matches(/^(Publish|Unpublish)$/).required(),
            value: Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        showInHome: Yup.boolean().default(false),
        parentId: Yup.object({
            label: Yup.string().nullable().optional(),
            value: Yup.string().nullable().optional()
        })
    })


    const { control, formState: errors, handleSubmit, setValue } = useForm({
        resolver: yupResolver(rules)
    })

    const LoadCategories = async () => {
        try {
            const response = await CategorySvc.listAll({ page: 1, limit: 100 })

            const options = response.result.map((cat) => {
                return {
                    label: cat.name,
                    value: cat._id
                }
            })
            setCatOpts(options)
        }
        catch (exception) {
            console.log("Cannot fetch categories")
            toast.warn(exception.message)
        }


    }


    const getCategoryDetail = async () => {

        try {
            const response = await CategorySvc.getDataById(params.id)
            console.log("response", response.result.name)
            if (response.result) {
                setValue('name', response.result.name)
                setValue('status', {
                    label: response.result.status === 'active' ? 'Publish' : "UnPublish",
                    value: response.result.status
                })
                setValue('showInHome', response.result.showInHome)

                setChecked(response.result.showInHome)
                if (response.result.parentId) {
                    setValue('parentId', {
                        label: response.result.parentId.name,
                        value: response.result.parentId._id || null
                    })
                }
            }

            setValue("image", response.result.image)

        }
        catch (exception) {
            toast.warn(exception.message)
            navigate('/admin/category')
        }
    }

    useEffect(() => {
        getCategoryDetail(),
            LoadCategories()
    }, [])

    const submitCategoryEdit = async (data) => {
        try {
            setLoading(true)
            console.log(data)
            let payload = data
            payload.status = data.status.value
            payload.parentId = data.parentId?.value || null
            const status = await CategorySvc.update(payload, params.id)
            toast.success(status.message)
            navigate('/admin/category')

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log("exception", exception)
        }
        finally {
            setLoading(false)

        }

    }
    console.log(errors)
    console.log("catOpts", catOpts)

    return (
        <>
            <div className="content">
                <AdminNavBar />
                <div className="container-fluid px-4">
                    <AdminBreadCrumb
                        pageTitle={"Category Edit"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "ListCategory", url: "/admin/category" },
                            { label: "Edit Category", url: null }
                        ]}

                    />
                    <div className="row my-3">
                        <div className="col-12">
                            <br />
                            <hr />
                            <Form onSubmit={handleSubmit(submitCategoryEdit)}>
                                <Form.Group as={Row} className="mx-3 mb-3" >
                                    <Form.Label className="col-sm-3" htmlFor="category name">
                                        Category name:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <TextInput
                                            name="name"
                                            placeholder="Enter Category name"
                                            errMsg={errors?.name?.message}
                                            control={control}
                                        />
                                    </Col>
                                    <hr />

                                    <Form.Label className="col-sm-3" htmlFor="sub-categoryof">
                                        Sub-Category Of:
                                    </Form.Label>
                                    <Col sm={9}>

                                        <SelectionButton
                                            name={"parentId"}
                                            control={control}
                                            options={catOpts}
                                            multiple={false}
                                            errMsg={errors?.parentId?.message}
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
                                    <Form.Label className="col-sm-3" htmlFor="categoryStatus">
                                        Category Status:
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
                                    <Form.Label className="col-sm-3" htmlFor="categoryImage">
                                        Category Image:
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
export default EditCategory
import AdminBreadCrumb from "../admin-breadcrumb"
import AdminNavBar from "../admin.navbar"
import { Form, Row, Col } from "react-bootstrap"
import { FormActionButtons } from "../../../cms/form/form-action-buttons"
import { set, useForm } from "react-hook-form"
import { SelectionButton, SwitchCase, TextInput, TimeInput } from "../../../cms/form/input-component"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import MenuSvc from "../menu/menu-service"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { MenuSelectorComponent } from "../offer-menu"



const CreateOffer = () => {


    const [menuList, setMenuList] = useState()
    let [menuOffer, setMenuOffer] = useState(null)

    const rules = Yup.object({
        description: Yup.string().min(2).max(50).required(),
        startDate: Yup.date().required(),
        endDate: Yup.date().required(),
        menu: Yup.array(
            Yup.object({
                menuId: Yup.object({
                    label: Yup.string().nullable().optional(),
                    value: Yup.string().nullable().optional(),
                }),
                offerDiscount: Yup.number().required().min(1).max(100).default(1)
            })
        ).required(),
        showInHome: Yup.boolean().default(false)
    });


    const { control, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(rules)
    })

    const FetchMenuList = async () => {
        try {
            const response = await MenuSvc.getAllData({ page: 1, limit: 1000 })
            const options = response.result.map((menus) => {
                return {
                    label: menus.name,
                    value: menus._id

                }
            })
            setMenuList(options)
        }
        catch (exception) {
            toast.warn(exception.message)
            console.log("exception", exception)
        }
    }

    useEffect(() => {
        FetchMenuList()
    }, [])

    const submitOffer = async (data) => {
        try {
            console.log("data",data)
            // console.log("data", data.menu)

            // const menuIds = data.menu.map(item => item.menuId.value);
            // console.log("menuIds", menuIds)
        }
        catch (exception) {
            toast.warn(exception.message)
            console.log(exception)
        }
    }



    return (
        <>
            <div className="content">
                <AdminNavBar />
                <div className="container-fluid px-4">
                    <AdminBreadCrumb
                        pageTitle={"Offer Management"}
                        breadCrumbData={[
                            { label: "Dashboard", url: "/admin" },
                            { label: "List offer", url: "/admin/offer" },
                            { label: "Create offer", url: null }
                        ]}
                    />
                    <div className="row my-3">
                        <div className="col-12">
                            <hr />
                            <Form onSubmit={handleSubmit(submitOffer)}>

                                <Form.Group as={Row}>

                                    <Form.Label className="col-sm-3" htmlFor="offername">
                                        Offer name:
                                    </Form.Label>
                                    <Col sm={9}>

                                        <TextInput

                                            name={"description"}
                                            control={control}
                                            placeholder="Enter offer name"
                                            errMsg={errors?.description?.message}

                                        />

                                    </Col>

                                    <Form.Label className="col-sm-3" htmlFor="endDate">
                                        Start Date:
                                    </Form.Label>

                                    <Col sm={9}>

                                        <TimeInput
                                            name={"startDate"}
                                            control={control}
                                            errMsg={errors?.startDate?.message}
                                        />

                                    </Col>


                                    <Form.Label className="col-sm-3" htmlFor="endDate">
                                        End Date:
                                    </Form.Label>

                                    <Col sm={9}>

                                        <TimeInput
                                            name={"endDate"}
                                            control={control}
                                            errMsg={errors?.endDate?.message}
                                        />

                                    </Col>

                                    <Form.Label className="col-sm-3" htmlFor="endDate">
                                        Set Menu's Offer:
                                    </Form.Label>

                                    <Col sm={9}>
                                        <MenuSelectorComponent
                                            selectionMenu={menuList}
                                            menuOffer={menuOffer}
                                            setMenuOffer={setMenuOffer}

                                        />


                                    </Col>



                                    <Form.Label className="col-sm-3" htmlFor="showInHome">
                                        Show In Home:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <SwitchCase
                                            name={"showInHome"}
                                            control={control}
                                            defaultValue={false}
                                            errMsg={errors?.showInHome?.message}
                                        />
                                    </Col>



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

export default CreateOffer
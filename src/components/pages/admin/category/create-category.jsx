import { Col, Form, Row } from "react-bootstrap";
import AdminBreadCrumb from "../admin-breadcrumb";
import AdminNavBar from "../admin.navbar";
import { SelectionButton, SwitchCase, TextInput } from "../../../cms/form/input-component";
import { useForm } from "react-hook-form";
import { FormActionButtons } from "../../../cms/form/form-action-buttons";
import * as Yup from "yup";
import CategorySvc from "./category.service";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryCreate = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const [listofCat, setCategoryOptions] = useState();

	const CategoryRule = Yup.object({
		name: Yup.string().min(3).required(),
		status: Yup.object({
			label: Yup.string()
				.matches(/^(Publish|Unpublish)$/)
				.required(),
			value: Yup.string()
				.matches(/^(active|inactive)$/)
				.required(),
		}).required(),
		showInHome: Yup.boolean().default(false),
		parentId: Yup.object({
			label: Yup.string().nullable().optional(),
			value: Yup.string().nullable().optional(),
		})
        .notRequired().optional(),
	});

	const {
		formState: { errors },
		setValue,
		setError,
		control,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(CategoryRule),
	});

	const submitCategoryCreate = async (data) => {
		try {
			console.log("I am hre");
			setLoading(true);
			console.log("catdata", data);
			let payload = data;
			payload.status = data.status.value;
            // parentId mapping required
			const status = await CategorySvc.categoryCreate(payload);
			toast.success(status.message);
			navigate("/admin/category");
		} catch (exception) {
			toast.warn("Category couldnot be created");
			console.log(exception);
		} finally {
			setLoading(false);
		}
	};

	const LoadCategories = async () => {
		try {
			const response = await CategorySvc.listAll({ page: 1, limit: 100 });

			const options = response.result.map((cat) => {
				return {
					label: cat.name,
					value: cat.id,
				};
			});
			setCategoryOptions(options);
		} catch (exception) {
			console.log("Cannot fetch categories");
			toast.warn(exception.message);
		}
	};

	useEffect(() => {
		LoadCategories();
	}, []);

    console.log(errors)
	return (
		<>
			<div className="content">
				<AdminNavBar />
				<div className="container-fluid px-4">
					<AdminBreadCrumb
						pageTitle={"Category Create"}
						breadCrumbData={[
							{ label: "Dashboard", url: "/admin" },
							{ label: "List Category", url: "/admin/Category" },
							{ label: "Create Category", url: null },
						]}
					/>
					<div className="row my-3">
						<div className="col-12">
							<br />
							<hr />
							<Form onSubmit={handleSubmit(submitCategoryCreate)}>
								<Form.Group as={Row} className="mx-3 mb-3">
									<Form.Label className="col-sm-3" htmlFor="categorytitle">
										Category Title:
									</Form.Label>
									<Col sm={9}>
										<TextInput
											name={"name"}
											placeholder="Enter Category title"
											errMsg={errors?.name?.message}
											defaultValue=""
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
											options={listofCat}
											multiple={false}
                                            defaultValue={null}
											errMsg={errors?.parentId?.message}
										/>
									</Col>
									<hr />
									<Form.Label className="col-sm-3" htmlFor="showInHome">
										Show In Home:
									</Form.Label>
									<Col sm={9}>
										<SwitchCase
											name="showInHome"
											control={control}
											defaultValue={false}
											errMsg={errors?.showInHome?.message}
										/>
									</Col>

									<hr />
									<Form.Label className="col-sm-3" htmlFor="categoryStatus">
										Category Status:
									</Form.Label>
									<Col sm={9}>
										<SelectionButton
											name={"status"}
											control={control}
											options={[
												{ label: "Publish", value: "active" },
												{ label: "Unpublish", value: "inactive" },
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
												const image = e.target.files[0];
												//size and type
												const ext = image.name.split(".").pop();
												const allowed = ["jpg", "png", "svg", "jpeg", "webp", "bmp"];
												if (allowed.includes(ext.toLowerCase())) {
													if (image.size <= 3000000) {
														//allowed sixze
														setValue("image", image);
													} else {
														setError("image", { message: "File size not allowed" });
													}
												} else {
													setError("image", { message: "File format not suported" });
												}
											}}
										/>
										<span className="text-danger">{errors?.image?.message}</span>
									</Col>
								</Form.Group>
								<FormActionButtons resetLabel="Reset" submitLabel="Submit" loading={loading} />
							</Form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default CategoryCreate;

import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Media, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router";
import { OPEN_SUCCESS_ALERT, OPEN_WARNING_ALERT } from "src/redux/User/Alerts/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PRODUCT_GENERAL, UPLOAD_IMG } from "src/redux/Admin/ManageProducts/actionTypes";
import { Rating } from "@mui/material";
import axios from "axios";
import { SERVICE_URL_ADMIN } from "src/constant/config";
import { getToken } from "src/utils/token";

const AddProductGeneral = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const img_temp = useSelector((props) => props.manageProduct.img_temp);
    const product_temp = useSelector((props) => props.manageProduct.product_new);
    const [test_img, setTest_img] = useState();
    const [categories, setCategories] = useState();
    const [name, setName] = useState();
    const [sale, setSale] = useState();
    const [soldQuantity, setSoldQuantity] = useState(0);
    const [rate, setRate] = useState(0);
    const [brand, setBrand] = useState();
    const [category_id, setCategoryID] = useState();
    const [description, setDescription] = useState();
    let bodyFormData = new FormData();

    useEffect(() => {
        axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/categories`,
            headers: {
                "Content-Type": "application/json",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            setCategories(res.data);
            setCategoryID(res.data[0].id);
            console.log(res.data);
        });
    }, []);
    // useEffect(() => {
    //     if (product_temp?.id) {
    //         navigate("detail");
    //     }
    // }, [product_temp]);

    const handleSubmit = () => {
        bodyFormData.append("product_name", name);
        bodyFormData.append("sale", sale);
        bodyFormData.append("sold_quantity", soldQuantity);
        bodyFormData.append("rating", rate);
        bodyFormData.append("rating_quantity", 0);
        bodyFormData.append("brand", brand);
        bodyFormData.append("category_id", category_id);
        bodyFormData.append("description", description);
        bodyFormData.append("images", test_img);

        dispatch({
            type: ADD_PRODUCT_GENERAL,
            payload: bodyFormData,
        });
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Please wait!" } });

        navigate("detail");
    };
    function uploadImg(e) {
        bodyFormData.append("images", e.target.files[0]);
        const file = e.target.files[0];
        setTest_img(file);
        let reader = new FileReader();
        reader.onload = function (ee) {
            dispatch({ type: UPLOAD_IMG, payload: file });
            // ee.target.result
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        dispatch({
            type: OPEN_WARNING_ALERT,
            payload: {
                message: "Request is being processed",
            },
        });
    }

    return (
        <Fragment>
            <Container fluid={true}>
                <div className="edit-profile">
                    <Row>
                        <Col xl="12">
                            <Form className="card">
                                <CardHeader>
                                    <h4 className="card-title mb-0">{"Add New Product (General)"}</h4>
                                    <div className="card-options">
                                        <a className="card-options-collapse" href="#javascript">
                                            <i className="fe fe-chevron-up"></i>
                                        </a>
                                        <a className="card-options-remove" href="#javascript">
                                            <i className="fe fe-x"></i>
                                        </a>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col sm="8" md="8">
                                            <FormGroup>
                                                <Label className="form-label">{"Name "}</Label>
                                                <Input className="form-control" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                            </FormGroup>
                                        </Col>

                                        <Col sm="6" md="6">
                                            <FormGroup>
                                                <Label className="form-label">{"Sold Quantity"}</Label>
                                                <Input disabled value={0} className="form-control" type="number" placeholder="Sold Quantity" onChange={(e) => setSoldQuantity(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6" md="4">
                                            <div>
                                                <Label className="form-label">{"Rating"}</Label>
                                                <br />
                                                <Rating name="half-rating-read" defaultValue={0} precision={0.5} readOnly />{" "}
                                            </div>
                                        </Col>
                                        <Col sm="6" md="6">
                                            <FormGroup>
                                                <Label className="form-label">{"Brand"}</Label>
                                                <Input className="form-control" type="text" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="5">
                                            <FormGroup>
                                                <Label className="form-label">{"Category"}</Label>
                                                <Input type="select" name="select" className="form-control btn-square" onChange={(e) => setCategoryID(e.target.value)}>
                                                    {categories?.map((category, key) => {
                                                        return <option value={category.id}>{category.category_name}</option>;
                                                    })}
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col md="12">
                                            <div className="form-group mb-0">
                                                <Label className="form-label">{"Descriptions"}</Label>
                                                <Input type="textarea" className="form-control" rows="2" placeholder="Enter About your description" onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                        </Col>
                                        <br />
                                        <br />
                                        <Col md="12">
                                            <Label className="form-label mt-3">{"Image"}</Label>
                                            <br />
                                            <div style={{ display: "inline-block", height: "200px", overflow: "hidden", position: "relative" }}>
                                                <Input onChange={uploadImg} type="file" id="drop_zone" />
                                                <br />
                                                {img_temp ? <Media alt="" src={img_temp} style={{ width: "inherit", height: "inherit" }} /> : ""}
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter className="text-right" style={{ background: "inherit" }}>
                                    <Button color="primary" className="btn btn-primary" onClick={() => handleSubmit()}>
                                        {"Continue"}
                                    </Button>
                                </CardFooter>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    );
};

export default AddProductGeneral;

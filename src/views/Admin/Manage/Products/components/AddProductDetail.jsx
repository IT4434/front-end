import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Media, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../index.scss";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import { ADD_PRODUCT_DETAIL } from "src/redux/Admin/ManageProducts/actionTypes";

const AddProductDetail = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.manageProduct.product_new);
    const [sale, setSale] = useState();
    const [images, setImages] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState();
    const [color, setColor] = useState();
    let bodyFormData = new FormData();

    console.log(product);
    const handleSubmit = () => {
        bodyFormData.append("product_id", product?.id);
        bodyFormData.append("price", price);
        bodyFormData.append("available_quantity", quantity);
        bodyFormData.append("sale", sale);
        bodyFormData.append("color", color);
        bodyFormData.append("images", images);
        bodyFormData.append("manufacturing_date", date);
        dispatch({
            type: ADD_PRODUCT_DETAIL,
            payload: bodyFormData,
        });
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Successful!" } });

        setTimeout(() => {
            navigate("/admin/manage/products");
        }, 1000);
    };

    return (
        <Fragment>
            <Container fluid={true}>
                <div className="edit-profile">
                    <Row>
                        <Col xl="12">
                            <Form className="card">
                                <CardHeader>
                                    <h4 className="card-title mb-0">{"Add New Product (Detail)"}</h4>
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
                                        <Col sm="5" md="5">
                                            <FormGroup>
                                                <Label className="form-label">{"Price "}</Label>
                                                <Input className="form-control" type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                                            </FormGroup>
                                        </Col>

                                        <Col sm="4" md="4">
                                            <FormGroup>
                                                <Label className="form-label">{"Available Quantity"}</Label>
                                                <Input className="form-control" type="number" placeholder="Available Quantity" onChange={(e) => setQuantity(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="5" md="5">
                                            <FormGroup>
                                                <Label className="form-label">{"Date of Manufacture"}</Label>
                                                <Input className="form-control" type="date" placeholder="Date of Manufacture" onChange={(e) => setDate(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4" md="4">
                                            <FormGroup>
                                                <Label className="form-label">{"Sale"}</Label>
                                                <Input className="form-control" type="number" placeholder="Sale" onChange={(e) => setSale(e.target.value)} />
                                            </FormGroup>
                                        </Col>

                                        <Col md="5">
                                            <FormGroup>
                                                <Label className="form-label">{"Color"}</Label>
                                                <br />
                                                <div className="color-radio">
                                                    <div className="radio radio-success">
                                                        <Input id="green" type="radio" name="red" value="green" onChange={(e) => setColor("green")} />
                                                        <Label for="green">Green</Label>
                                                    </div>
                                                    <div className="radio radio-danger">
                                                        <Input id="red" type="radio" name="red" value="red" onChange={(e) => setColor("red")} />
                                                        <Label for="red">Red</Label>
                                                    </div>
                                                    <div className="radio radio-dark">
                                                        <Input id="black" type="radio" name="red" value="black" onChange={(e) => setColor("black")} />
                                                        <Label for="black">Black</Label>
                                                    </div>
                                                    <div className="radio radio-dark">
                                                        <Input id="white" type="radio" name="red" value="white" onChange={(e) => setColor("white")} />
                                                        <Label for="white">White</Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md="12">
                                            <Label className="form-label mt-3">{"Image"}</Label>
                                            <br />
                                            <div style={{ display: "inline-block", height: "200px", overflow: "hidden", position: "relative" }}>
                                                <Input onChange={(e) => setImages(e.target.files[0])} type="file" id="drop_zone" />
                                            </div>
                                        </Col>

                                        <br />
                                        <br />
                                    </Row>
                                </CardBody>
                                <CardFooter className="text-right" style={{ background: "inherit" }}>
                                    <Button color="primary" className="btn btn-primary" onClick={() => handleSubmit()}>
                                        {"Submit"}
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

export default AddProductDetail;

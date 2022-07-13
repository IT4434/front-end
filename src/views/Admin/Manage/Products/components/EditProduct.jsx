import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Media, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../index.scss";
import { ADD_PRODUCT_DETAIL, EDIT_PRODUCT } from "src/redux/Admin/ManageProducts/actionTypes";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import axios from "axios";
import { SERVICE_URL_ADMIN } from "src/constant/config";
import { getToken } from "src/utils/token";
import { Trash } from "react-feather";
export default function EditProduct() {
    const navigate = useNavigate();
    const [detailProduct, setDetailProduct] = useState();
    const { product_id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.manageProduct.product_new);
    const [sale, setSale] = useState();
    const [images, setImages] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState();
    const [color, setColor] = useState();
    let bodyFormData = new FormData();

    async function getDetailProduct(payload) {
        const response = await axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/products/details/${payload}`,
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            data: payload,
            timeout: 30000,
        }).then((res) => setDetailProduct(res.data));
        return response;
    }
    useEffect(() => {
        getDetailProduct(product_id);
    }, []);

    const handleSubmit = () => {
        console.log(detailProduct);
        bodyFormData.append("_method", "PUT");
        bodyFormData.append("id", product_id);
        bodyFormData.append("price", !price ? detailProduct.price : price);
        bodyFormData.append("available_quantity", !quantity ? detailProduct.available_quantity : quantity);
        bodyFormData.append("sale", !sale ? detailProduct.sale : sale);
        bodyFormData.append("color", !color ? detailProduct.color : color);
        bodyFormData.append("images", !images ? detailProduct.images[0] : images);
        bodyFormData.append("product_id", product?.id);
        bodyFormData.append("manufacturing_date", !date ? detailProduct.manufacturing_date : date);
        dispatch({
            type: EDIT_PRODUCT,
            payload: bodyFormData,
        });
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Successful!" } });
        setTimeout(() => {
            navigate("/admin/manage/products");
        }, 1000);
    };

    const handleDelete = async (payload) => {
        await axios({
            method: "DELETE",
            url: `${SERVICE_URL_ADMIN}/products/details/${payload}`,
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        });
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Deleted!" } });
        setTimeout(() => {
            navigate("/admin/manage/products");
        }, 1000);
    };

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader style={{ display: "flex", justifyContent: "space-between" }}>
                                <h5>{"Edit Product"} </h5>
                                <Button onClick={() => handleDelete(product_id)} color="danger" style={{ fontWeight: "500", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Trash className="mr-2" />
                                    Delete
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <Row className="mb-2">
                                    <div className="col-auto">
                                        <Media
                                            className="img-70 rounded-circle"
                                            alt=""
                                            src={
                                                detailProduct?.images[0]
                                                    ? `https://project2storage.s3.ap-southeast-1.amazonaws.com/${detailProduct.images[0].image_path}`
                                                    : "https://storage.googleapis.com/hust-files/6359595131863040/images/logo_kikaitech-01_.1m.png"
                                            }
                                        />
                                    </div>
                                    <Col>
                                        <h3 className="mb-1">{product?.product_name}</h3>
                                        <p className="mb-4">{"User"}</p>
                                    </Col>
                                </Row>
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
                            <CardFooter style={{ display: "flex", justifyContent: "right", backgroundColor: "inherit" }}>
                                <Button color="primary" onClick={() => handleSubmit()}>
                                    Save
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

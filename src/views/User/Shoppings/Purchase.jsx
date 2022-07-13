import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Button, CardBody, CardFooter, CardHeader, Col, Input, Row } from "reactstrap";
import ShoppingBag_Cart from "./components/ShoppingBag_Cart";
import "./index.scss";
import { data } from "./components/data";
import { useSelector } from "react-redux";
import { getVisibleproducts } from "src/services/User/products";
import { useNavigate } from "react-router";
import Purchase_Cart from "./components/Purchase_Cart";
import axios from "axios";
import { SERVICE_URL_USER } from "src/constant/config";
import { getToken } from "src/utils/token";
import { useEffect } from "react";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import { useDispatch } from "react-redux";

export default function Purchase() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filters = useSelector((content) => content.filters);
    const [purchase, setPurchase] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const handleDetail = () => {
        navigate("/products/:product_id");
        localStorage.setItem("navbarActive", "detail");
    };
    async function getPurchase() {
        const response = await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/orders/list`,
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            setPurchase(res.data);
        });
        return response;
    }
    useEffect(() => {
        getPurchase();
    }, []);
    const handleSubmit = () => {
        dispatch({ typ: OPEN_SUCCESS_ALERT, payload: { message: "Processing!" } });
        setTimeout(() => {
            navigate("/products");
        }, 900);
    };

    return (
        <>
            <Card className="">
                <CardHeader style={{ padding: "20px !important" }}>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col sm={1} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}></Col>
                        {"   "}
                        <Col sm={3} md={3} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Product Name"}</h6>
                        </Col>
                        <Col sm={2} md={2}></Col>
                        <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Status"}</h6>
                        </Col>
                        <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Quantity"}</h6>
                        </Col>
                        <Col sm={1} md={1} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Total Price"}</h6>
                        </Col>
                        <Col sm={1} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}></Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {purchase?.map((product) => {
                        return (
                            <div>
                                {product?.order_detail?.map((item) => {
                                    return <Purchase_Cart item={item} status={product.order_status} />;
                                })}
                            </div>
                        );
                    })}
                </CardBody>
                <CardFooter style={{ padding: "20px !important", backgroundColor: "inherit" }}>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col sm={1} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}></Col>
                        <Col sm={2} md={2}></Col>
                        <Col sm={2} md={2}></Col>
                        <Col sm={4} md={4} style={{ display: "flex", justifyContent: "right", alignItems: "center" }}></Col>
                        <Col sm={3} md={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button color="danger" style={{ paddingLeft: "36px", paddingRight: "36px" }} onClick={() => handleSubmit()}>
                                Received All
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </>
    );
}

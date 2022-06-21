import React from "react";
import { Card } from "react-bootstrap";
import { Button, CardBody, CardFooter, CardHeader, Col, Input, Row } from "reactstrap";
import ShoppingBag_Cart from "./components/ShoppingBag_Cart";
import "./index.scss";
import { data } from "./components/data";
import { useSelector } from "react-redux";
import { getVisibleproducts } from "src/services/User/products";
import { useNavigate } from "react-router";
import Purchase_Cart from "./components/Purchase_Cart";

export default function Purchase() {
    const navigate = useNavigate();
    const filters = useSelector((content) => content.filters);
    const products = getVisibleproducts(data, filters);

    const handleDetail = () => {
        navigate("/products/:product_id");
        localStorage.setItem("navbarActive", "detail");
    };

    return (
        <>
            <Card className="">
                {/* <CardHeader style={{ padding: "20px !important" }}>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col sm={1} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}></Col>
                        {"   "}
                        <Col sm={3} md={3} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Product Name"}</h6>
                        </Col>
                        <Col sm={2} md={2}>
                            <h6>{"Classify"}</h6>
                        </Col>
                        <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Unit Price"}</h6>
                        </Col>
                        <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Quantity"}</h6>
                        </Col>
                        <Col sm={1} md={1} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Total Price"}</h6>
                        </Col>
                        <Col sm={1} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h6>{"Delete"}</h6>
                        </Col>
                    </Row>
                </CardHeader> */}
                <CardBody>
                    <Purchase_Cart />
                    <Purchase_Cart />
                </CardBody>
                <CardFooter style={{ padding: "20px !important", backgroundColor: "inherit" }}>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col sm={1} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {/* <Input type="checkbox" /> */}
                        </Col>
                        <Col sm={2} md={2}>
                            {/* <h6 className="mt-2">{`Select All (${1})`}</h6> */}
                        </Col>
                        <Col sm={2} md={2}>
                            {/* <Button color="danger" style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                                Delete All
                            </Button> */}
                        </Col>
                        <Col sm={4} md={4} style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                            <h6 className="mt-2">{`Total Payment (${1} Products): 500$`}</h6>
                        </Col>
                        <Col sm={3} md={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button color="danger" style={{ paddingLeft: "36px", paddingRight: "36px" }}>
                                Order Received
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </>
    );
}

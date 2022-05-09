import React from "react";
import { Card } from "react-bootstrap";
import { CardBody, CardHeader, Col, Row } from "reactstrap";
import ShoppingBag_Cart from "./components/ShoppingBag_Cart";
import "./index.scss";

export default function ShoppingBag() {
    return (
        <Card className="">
            <CardHeader style={{ padding: "20px !important" }}>
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
            </CardHeader>
            <CardBody>
                <ShoppingBag_Cart />
                <ShoppingBag_Cart />
                <ShoppingBag_Cart />
                <ShoppingBag_Cart />
            </CardBody>
        </Card>
    );
}

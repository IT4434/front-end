import React, { Fragment, useState } from "react";
import { Trash } from "react-feather";
import { useDispatch } from "react-redux";
import { Button, Col, Input, Media, Row } from "reactstrap";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import DialogSelectColor from "./DialogSelectColor";

export default function ShoppingBag_Cart({ item }) {
    const [number, setNumber] = useState(1);
    const dispatch = useDispatch();
    const handleDelete = () => {
        if (window.confirm("Do you want to delete this product?")) {
            dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Delete Successful!" } });
        }
    };

    return (
        <Fragment>
            <Row className="mb-3">
                <Col sm={1} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Input type="checkbox" />
                </Col>

                <Col sm={3} md={3} style={{ display: "flex", alignItems: "center" }}>
                    <Media style={{ height: "80px", width: "80px" }} src={"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"} />
                    <div className="ml-2">
                        <h6>V-Neck Shawl Collar Woman's Solid T-Shirt</h6>
                        <p>Yellow(#fcb102)</p>
                    </div>
                </Col>
                <Col sm={2} md={2}>
                    <DialogSelectColor />
                </Col>
                <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                    <del style={{ opacity: "0.5" }}>{"$100.00"}</del>
                    <h6 className="ml-2 mt-2">{"$50.00"}</h6>
                </Col>
                <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                    <Button color="" className="m-r-10 btn-add" onClick={() => setNumber(number - 1)} disabled={number < 2 ? true : false}>
                        {"-"}
                    </Button>
                    <span style={{ fontWeight: "500", marginLeft: "10px", marginRight: "20px" }}>{item.quantity}</span>
                    <Button color="" className="m-r-10 btn-add" onClick={() => setNumber(number + 1)}>
                        {"+"}
                    </Button>
                </Col>
                <Col sm={1} md={1} style={{ display: "flex", alignItems: "center" }}>
                    <h6 className="mt-2" style={{ color: "#7366ff" }}>
                        {"$50.00"}
                    </h6>
                </Col>
                <Col sm={1} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Trash style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete()} />
                </Col>
            </Row>
            <hr />
        </Fragment>
    );
}

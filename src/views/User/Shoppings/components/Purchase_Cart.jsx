import React, { Fragment, useState } from "react";
import { Trash } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Col, Input, Media, Row } from "reactstrap";
import { IMG_URL } from "src/constant/config";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import DialogSelectColor from "./DialogSelectColor";

export default function Purchase_Cart({ item, status }) {
    const [number, setNumber] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Fragment>
            <Row className="mb-3">
                <Col sm={1} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}></Col>

                <Col sm={3} md={3} onClick={() => navigate(`:purchase_id/detail`)} style={{ display: "flex", alignItems: "center" }}>
                    <Media
                        style={{ height: "80px", width: "80px" }}
                        src={
                            item.product_detail?.images[0]?.image_path
                                ? `${IMG_URL}/${item.product_detail?.images[0]?.image_path}`
                                : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"
                        }
                    />
                    <div className="ml-4">
                        <h6>{item.product_detail?.product?.product_name}</h6>
                        <p>{item.product_detail?.product?.description}</p>
                    </div>
                </Col>
                <Col sm={2} md={2}>
                    {/* <DialogSelectColor /> */}
                </Col>
                <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                    <h6 className="ml-2 mt-2">{status}</h6>
                </Col>
                <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                    <span>Quantity :</span>
                    <span style={{ fontWeight: "500", marginLeft: "10px", marginRight: "20px" }}>{item.quantity}</span>
                </Col>
                <Col sm={1} md={1} style={{ display: "flex", alignItems: "center" }}>
                    <h6 className="mt-2 pl-4" style={{ color: "#7366ff" }}>
                        {item.quantity * item.product_detail.price}$
                    </h6>
                </Col>
                <Col sm={1} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}></Col>
            </Row>
            <hr />
        </Fragment>
    );
}

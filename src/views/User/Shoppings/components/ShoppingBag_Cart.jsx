import axios from "axios";
import React, { Fragment, useState } from "react";
import { Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Input, Media, Row } from "reactstrap";
import { IMG_URL, SERVICE_URL_USER } from "src/constant/config";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import { SELECTED_CART } from "src/redux/User/Products/actionTypes";
import { deleteCart } from "src/services/User/products";
import { getToken } from "src/utils/token";
import DialogSelectColor from "./DialogSelectColor";

export default function ShoppingBag_Cart({ item }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const selectedCart = useSelector((state) => state.Product.selected_cart);
    const cart = useSelector((state) => state.Product.cart);
    const dispatch = useDispatch();
    const handleDelete = (item) => {
        if (window.confirm("Do you want to delete this product?")) {
            deleteCart(item.id);
            dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Delete Successful!" } });
            setTimeout(() => {
                window.location.reload();
            }, 900);
        }
    };
    const handleChangeCart = async (item, type) => {
        console.log(item);
        if (type === "-") {
            setQuantity(quantity - 1);
            await axios({
                method: "PUT",
                url: `${SERVICE_URL_USER}/carts/${item.id}`,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    type: "formData",
                    Authorization: getToken(),
                },
                data: { product_id: item.product_detail.id, quantity: quantity - 1 },
                timeout: 30000,
            });
        } else {
            setQuantity(quantity + 1);
            await axios({
                method: "PUT",
                url: `${SERVICE_URL_USER}/carts/${item.id}`,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    type: "formData",
                    Authorization: getToken(),
                },
                data: { product_id: item.product_detail.id, quantity: quantity + 1 },
                timeout: 30000,
            });
        }
    };

    return (
        <Fragment>
            <Row className="mb-3">
                {/* <Col sm={1} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Input type="checkbox" defaultChecked={false} onChange={(e) => handleSelectCart(e, item)} />
                </Col> */}

                <Col sm={4} md={4} style={{ display: "flex", alignItems: "center" }}>
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
                    <DialogSelectColor color={item.product_detail?.color} />
                </Col>
                <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                    <del style={{ opacity: "0.5" }}>{item.product_detail?.sale}%</del>
                    <h6 className="ml-2 mt-2">{item.product_detail?.price}$</h6>
                </Col>
                <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                    <Button color="" className="m-r-10 btn-add" onClick={() => handleChangeCart(item, "-")} disabled={quantity < 2 ? true : false}>
                        {"-"}
                    </Button>
                    <span style={{ fontWeight: "500", marginLeft: "10px", marginRight: "20px" }}>{quantity}</span>
                    <Button color="" className="m-r-10 btn-add" onClick={() => handleChangeCart(item, "+")}>
                        {"+"}
                    </Button>
                </Col>
                <Col sm={1} md={1} style={{ display: "flex", alignItems: "center" }}>
                    <h6 className="mt-2" style={{ color: "#7366ff" }}>
                        {item.product_detail?.price * quantity}$
                    </h6>
                </Col>
                <Col sm={1} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Trash style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(item)} />
                </Col>
            </Row>
            <hr />
        </Fragment>
    );
}

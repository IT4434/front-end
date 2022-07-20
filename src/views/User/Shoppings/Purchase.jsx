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
import TablePurchase from "./components/tablePurchase";

export default function Purchase() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filters = useSelector((content) => content.filters);
    const [purchase, setPurchase] = useState();
    const [totalPrice, setTotalPrice] = useState();

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
                <CardHeader style={{ padding: "20px !important" }}>Purchase</CardHeader>
                <CardBody>
                    <div className="table-responsive product-table">
                        <TablePurchase />
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

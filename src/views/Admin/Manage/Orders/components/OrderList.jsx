import React, { Fragment, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import { Plus } from "react-feather";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { SERVICE_URL_ADMIN } from "src/constant/config";
import { getToken } from "src/utils/token";
import { useDispatch } from "react-redux";
import { GET_PRODUCT_GENERAL } from "src/redux/Admin/ManageProducts/actionTypes";
import { useSelector } from "react-redux";
import CollapsibleTable from "./tableData";
import TableOrder from "./tableData";

const OrderList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.manageProduct.product_general);
    useEffect(() => {}, []);

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader style={{ display: "flex", justifyContent: "space-between" }}>
                                <h5>{"Order List"} </h5>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive product-table">
                                    <TableOrder />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default OrderList;

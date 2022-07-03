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

const ProductGeneralList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.manageProduct.product_general);
    useEffect(() => {
        getData();
    }, []);
    const handleAddProduct = () => {
        navigate("add_product");
    };
    const productData = [];
    data?.map((product) => {
        productData.push({
            image: <img src={product.images.length > 0 ? product.images[0].image_path : ""} style={{ width: 50, height: 50 }} alt="" />,
            product_name: <div onClick={(product) => console.log(product.name)}>{product.product_name}</div>,
            product_desc: product.description,

            start_date: product.created_at.slice(0, 10),
        });
    });
    const getData = async () => {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/products`,
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            console.log(res);
            dispatch({ type: GET_PRODUCT_GENERAL, payload: res.data });
        });
    };

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader style={{ display: "flex", justifyContent: "space-between" }}>
                                <h5>{"Products General List"} </h5>
                                <Button onClick={() => handleAddProduct()} color="primary" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Plus />
                                    Add Product
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive product-table">
                                    {/* <DataTable noHeader columns={productColumns} data={productData} /> */}
                                    <CollapsibleTable />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ProductGeneralList;

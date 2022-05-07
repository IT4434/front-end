import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import { productData, productColumns } from "./product-list";
import { Plus } from "react-feather";
import { useNavigate } from "react-router";

const Productlist = () => {
    const navigate = useNavigate();
    const handleAddProduct = () => {
        navigate("add_product");
    };

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader style={{ display: "flex", justifyContent: "space-between" }}>
                                <h5>{"Products List"} </h5>
                                <Button onClick={() => handleAddProduct()} color="primary" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Plus />
                                    Add Product
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive product-table">
                                    <DataTable noHeader columns={productColumns} data={productData} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Productlist;

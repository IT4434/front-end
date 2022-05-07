import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import { userData, userColumns } from "../components/Userdata.jsx";

const Userlist = () => {
    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>{"Customers List"} </h5>
                                {/* <span>{"ProductListDesc"}</span> */}
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive product-table">
                                    <DataTable noHeader columns={userColumns} data={userData} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Userlist;

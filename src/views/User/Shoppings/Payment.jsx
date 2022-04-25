import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button } from "reactstrap";
import img_card from "../../../assets/images/ecommerce/card.png";
const Payment = (props) => {
    return (
        <Fragment>
            <Container fluid={true} className="credit-card">
                <Row>
                    <Col xl="12" className="box-col-12 xl-100">
                        <Card className="height-equal credit-form" style={{ marginTop: "20px" }}>
                            <CardHeader className="py-4">
                                <h5>{"CreditCard"}</h5>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="7">
                                        <Form className="theme-form mega-form">
                                            <FormGroup>
                                                <Input className="form-control" type="text" placeholder="Card number" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input className="form-control" type="text" placeholder="First Name" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input className="form-control" type="date" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input className="form-control" type="text" placeholder="Full Name" />
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                    <Col md="5" className="text-center">
                                        <img className="img-fluid" src={img_card} alt="" />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Payment;

import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Input, Media, Form, FormGroup, Label } from "reactstrap";
import "../index.scss";
export default function EditProduct() {
    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>{"Edit Product"} </h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row className="mb-2">
                                        <div className="col-auto">
                                            <Media className="img-70 rounded-circle" alt="" src={"https://dummyimage.com/300.png/09f/fff"} />
                                        </div>
                                        <Col>
                                            <h3 className="mb-1">{"Men T-Shirt"}</h3>
                                            <p className="mb-4">{"VIP"}</p>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label className="form-label">{"Classify"}</Label>
                                        <Input type="select" name="select" className="form-control btn-square">
                                            <option>{"Vip"}</option>
                                            <option>{"Newbie"}</option>
                                            <option>{"Frendlyi"}</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="form-label">{"Password"}</Label>
                                        <Input className="form-control" type="password" defaultValue="password" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="form-label">{"Website"}</Label>
                                        <Input className="form-control" placeholder="http://Uplor .com" />
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter style={{ display: "flex", justifyContent: "right", backgroundColor: "inherit" }}>
                                <Button color="primary">Save</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

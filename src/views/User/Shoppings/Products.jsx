import { Card } from "@material-ui/core";
import React, { Fragment } from "react";
import { Row, Container, Col, UncontrolledCarousel } from "reactstrap";
import Product_cart from "./components/Product_cart";
import img from "../../../assets/images/ecommerce/3.jpg";
const items = [
    {
        src: img,
        altText: "Slide 1",
        caption: "Slide 1",
    },
    {
        src: img,
        altText: "Slide 2",
        caption: "Slide 2",
    },
    {
        src: img,
        altText: "Slide 3",
        caption: "Slide 3",
    },
];

export default function Products() {
    return (
        <Fragment>
            <Container fluid={true}>
                <Row className="Carsousel">
                    <Col>
                        <Card>
                            <UncontrolledCarousel items={items} />
                        </Card>
                    </Col>
                </Row>
                <Row className="gridRow">
                    <Product_cart />
                    <Product_cart />
                    <Product_cart />
                    <Product_cart />
                    <Product_cart />
                </Row>
            </Container>
        </Fragment>
    );
}

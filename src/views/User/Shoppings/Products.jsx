import { Card } from "@material-ui/core";
import React from "react";
import { Row } from "reactstrap";
import Product_cart from "./components/Product_cart";

export default function Products() {
    return (
        <div className="product">
            <Row className="gridRow">
                <Product_cart />
                <Product_cart />
                <Product_cart />
                <Product_cart />
                <Product_cart />
            </Row>
        </div>
    );
}

import React from "react";
import { Card } from "react-bootstrap";
import { Button, CardBody, CardFooter, CardHeader, Col, Input, Row } from "reactstrap";
import ShoppingBag_Cart from "./components/ShoppingBag_Cart";
import "./index.scss";
import { data } from "./components/data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { IMG_URL, SERVICE_URL_USER } from "src/constant/config";
import { getToken } from "src/utils/token";
import { addToFav } from "src/services/Admin/ManageProduct";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";

export default function ShoppingBag() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filters = useSelector((content) => content.filters);
    const [products, setProducts] = useState();
    const [cart, setCart] = useState();

    async function getAllProduct(payload) {
        const response = await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/products`,
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => setProducts(res.data));
        return response;
    }
    async function getCart() {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/carts`,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => setCart(res.data));
    }
    useEffect(() => {
        getAllProduct();
        getCart();
    }, []);

    const handleDetail = () => {
        navigate("/products/:product_id");
        localStorage.setItem("navbarActive", "detail");
    };
    const addToFavorite = (item) => {
        addToFav({ product_id: item.id });
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Add to favorite success" } });
    };

    return (
        <>
            <Card className="">
                <CardHeader style={{ padding: "20px !important" }}>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col sm={1} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}></Col>
                        {"   "}
                        <Col sm={3} md={3} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Product Name"}</h6>
                        </Col>
                        <Col sm={2} md={2}>
                            <h6>{"Classify"}</h6>
                        </Col>
                        <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Unit Price"}</h6>
                        </Col>
                        <Col sm={2} md={2} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Quantity"}</h6>
                        </Col>
                        <Col sm={1} md={1} style={{ display: "flex", alignItems: "center" }}>
                            <h6>{"Total Price"}</h6>
                        </Col>
                        <Col sm={1} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h6>{"Delete"}</h6>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {cart?.map((item) => {
                        return <ShoppingBag_Cart item={item} />;
                    })}
                    {/* <ShoppingBag_Cart />
                    <ShoppingBag_Cart />
                    <ShoppingBag_Cart />
                    <ShoppingBag_Cart /> */}
                </CardBody>
                <CardFooter style={{ padding: "20px !important", backgroundColor: "inherit" }}>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col sm={1} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Input type="checkbox" />
                        </Col>
                        <Col sm={2} md={2}>
                            <h6 className="mt-2">{`Select All (${1})`}</h6>
                        </Col>
                        <Col sm={2} md={2}>
                            <Button color="danger" style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                                Delete All
                            </Button>
                        </Col>
                        <Col sm={4} md={4} style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                            <h6 className="mt-2">{`Total Payment (${1} Products): 500$`}</h6>
                        </Col>
                        <Col sm={3} md={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button color="danger" style={{ paddingLeft: "36px", paddingRight: "36px" }}>
                                Pay
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader style={{ padding: "20px !important" }}>
                    <h5>{"Suggestion for You"}</h5>
                </CardHeader>
                <CardBody>
                    <Row className="gridRow">
                        {products
                            ? products.slice(0, 12).map((item, i) => (
                                  <div className={"col-xl-2 col-sm-3 xl-4 col-grid-box"} key={i}>
                                      <Card>
                                          <div className="product-box">
                                              <div className="product-img">
                                                  {item.status === "sale" ? <span className="ribbon ribbon-danger">{item.status}</span> : ""}
                                                  {item.status === "50%" ? <span className="ribbon ribbon-success ribbon-right">{item.status}</span> : ""}
                                                  {item.status === "gift" ? (
                                                      <span className="ribbon ribbon-secondary ribbon-vertical-left">
                                                          {" "}
                                                          <i className="icon-gift"></i>
                                                      </span>
                                                  ) : (
                                                      ""
                                                  )}
                                                  {item.status === "love" ? (
                                                      <span className="ribbon ribbon-bookmark ribbon-vertical-right ribbon-info">
                                                          <i className="icon-heart"></i>
                                                      </span>
                                                  ) : (
                                                      ""
                                                  )}
                                                  {item.status === "Hot" ? <span className="ribbon ribbon ribbon-clip ribbon-warning">{item.status}</span> : ""}
                                                  <img
                                                      className="img-fluid"
                                                      src={
                                                          item.images.length > 0
                                                              ? `${IMG_URL}/${item.images[0].image_path}`
                                                              : item.details?.length > 0 && item.details[0].images.length > 0
                                                              ? `${IMG_URL}/${item.details[0].images[0].image_path}`
                                                              : "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"
                                                      }
                                                      alt=""
                                                  />
                                                  <div className="product-hover">
                                                      <ul>
                                                          <li>
                                                              <Button color="default">
                                                                  <i className="icon-shopping-cart"></i>
                                                              </Button>
                                                          </li>
                                                          <li>
                                                              <Button color="default" data-toggle="modal">
                                                                  <i className="icon-eye"></i>
                                                              </Button>
                                                          </li>
                                                          <li>
                                                              <Button color="default" onClick={() => addToFavorite(item)}>
                                                                  <i className="icon-heart"></i>
                                                              </Button>
                                                          </li>
                                                      </ul>
                                                  </div>
                                              </div>
                                              <div className="product-details">
                                                  <div className="rating">
                                                      <i className="fa fa-star"></i>
                                                      <i className="fa fa-star"></i>
                                                      <i className="fa fa-star"></i>
                                                      <i className="fa fa-star"></i>
                                                      <i className="fa fa-star"></i>
                                                  </div>
                                                  <h4 className="font-primary">{item.product_name}</h4>
                                                  <p>{item.note}</p>
                                                  <div className="product-price">
                                                      {item.details?.length > 0 ? (
                                                          <>
                                                              {"$"} {item.details.length > 0 && item.details[0].price}
                                                              <del>{item.details[0].sale}%</del>
                                                          </>
                                                      ) : (
                                                          <span>Out of stock</span>
                                                      )}
                                                  </div>
                                              </div>
                                          </div>
                                      </Card>
                                  </div>
                              ))
                            : ""}
                    </Row>
                </CardBody>
            </Card>
        </>
    );
}

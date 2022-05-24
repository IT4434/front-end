import React from "react";
import { Card, Button, CardBody, CardFooter, CardHeader, Col, Input, Row } from "reactstrap";
import "./index.scss";
import { data } from "./components/data";
import { useSelector } from "react-redux";
import { getVisibleproducts } from "src/services/User/products";
import { useNavigate } from "react-router";

export default function Favorite() {
    const navigate = useNavigate();
    const filters = useSelector((content) => content.filters);
    const products = getVisibleproducts(data, filters);

    const handleDetail = () => {
        navigate("/products/:product_id");
        localStorage.setItem("navbarActive", "detail");
    };

    return (
        <Card>
            <CardHeader>
                <h4 className="ml-4">{"Favorites"}</h4>
            </CardHeader>
            <CardBody>
                <Row className="gridRow">
                    {products
                        ? products.slice(0, 10).map((item, i) => (
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
                                              <img className="img-fluid" src={"https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"} alt="" />
                                              <div className="product-hover">
                                                  <ul>
                                                      <li>
                                                          <Button color="default">
                                                              <i className="icon-shopping-cart"></i>
                                                          </Button>
                                                      </li>
                                                      <li>
                                                          <Button color="default" data-toggle="modal" onClick={() => handleDetail()}>
                                                              <i className="icon-eye"></i>
                                                          </Button>
                                                      </li>
                                                      <li>
                                                          <Button color="default">
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
                                              <h4 className="font-primary">{item.name}</h4>
                                              <p>{item.note}</p>
                                              <div className="product-price">
                                                  {"$"} {item.price}
                                                  <del>
                                                      {"$"} {item.discountPrice}
                                                  </del>
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
    );
}

import React from "react";
import { Card, Button, CardBody, CardFooter, CardHeader, Col, Input, Row } from "reactstrap";
import "./index.scss";
import { data } from "./components/data";
import { useSelector } from "react-redux";
import { getListFav, getVisibleproducts, unFav } from "src/services/User/products";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { IMG_URL, SERVICE_URL_USER } from "src/constant/config";
import { getToken } from "src/utils/token";
import axios from "axios";

export default function Favorite() {
    const navigate = useNavigate();
    const filters = useSelector((content) => content.filters);
    const [listFav, setListFav] = useState();

    async function getListFav() {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/favorite/list`,
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            let temp = [];
            res.data?.map((item) => {
                if (!temp.includes(item)) {
                    temp.push(item);
                }
            });
            setListFav(temp);
        });
    }

    useEffect(() => {
        getListFav();
    }, []);

    const handleDetail = (payload) => {
        navigate(`/products/${payload.id}`);
        localStorage.setItem("navbarActive", "detail");
    };
    const handleUnfav = (payload) => {
        unFav({ product_id: payload.id });
        getListFav();
    };

    return (
        <Card>
            <CardHeader>
                <h4 className="ml-4">{"Favorites"}</h4>
            </CardHeader>
            <CardBody>
                <Row className="gridRow">
                    {listFav
                        ? listFav.slice(0, 10).map((item, i) => (
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
                                                          <Button color="default" onClick={() => handleUnfav(item)}>
                                                              <i className="icon-trash"></i>
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
    );
}

import React, { Fragment, useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Media, CardBody } from "reactstrap";
import Slider from "react-slick";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Ratings from "react-ratings-declarative";
import { Truck, Gift, CreditCard, Clock } from "react-feather";
import { singleItem } from "./components/singleItem";
import img from "../../../assets/images/logo_ether.png";
import { Rating } from "@mui/material";
import "./index.scss";
const Product_detail = (props) => {
    const navigate = useNavigate();
    const [state, setState] = useState({ nav1: null, nav2: null });
    const [rating, setRating] = useState(0);
    // eslint-disable-next-line
    const [quantity, Setquantity] = useState(1);
    const [number, setNumber] = useState(1);

    const slider1 = useRef();
    const slider2 = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current,
        });
    }, [dispatch]);
    const { nav1, nav2 } = state;

    const addcart = (product, qty) => {};

    const buyProduct = (product, qty) => {};

    const addWishList = (product) => {};

    const changeRating = (newRating) => {
        setRating(newRating);
    };

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Card>
                            <Row className="product-page-main">
                                <Col xl="4">
                                    <Slider asNavFor={nav2} arrows={false} ref={(slider) => (slider1.current = slider)} className="product-slider">
                                        {singleItem.variants ? (
                                            singleItem.variants.map((item, i) => {
                                                return (
                                                    <div className="item" key={i}>
                                                        <Media src={img} style={{ width: "1000px" }} alt="" className="img-fluid" />
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <Media src={singleItem.img} alt="" className="img-fluid" />
                                        )}
                                    </Slider>
                                    <Slider
                                        asNavFor={nav1}
                                        ref={(slider) => (slider2.current = slider)}
                                        slidesToShow={4}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        infinite={true}
                                        className="small-slick"
                                    >
                                        {singleItem?.variants
                                            ? singleItem?.variants.map((item, i) => {
                                                  return (
                                                      <div className="item" key={i}>
                                                          <Media src={img} alt="" className="img-fluid" />
                                                      </div>
                                                  );
                                              })
                                            : ""}
                                    </Slider>
                                </Col>
                                <Col xl="5 xl-100">
                                    <Card>
                                        <CardBody>
                                            <div className="product-page-details">
                                                <h3>{"Women Pink shirt."}</h3>
                                            </div>
                                            <div className="product-price f-28">
                                                {"$"}
                                                {singleItem?.price}
                                                <del>
                                                    {"$"}
                                                    {singleItem?.discountPrice}
                                                </del>
                                            </div>
                                            <ul className="product-color m-t-15">
                                                <li className="bg-primary"></li>
                                                <li className="bg-secondary"></li>
                                                <li className="bg-success"></li>
                                                <li className="bg-info"></li>
                                                <li className="bg-warning"></li>
                                            </ul>
                                            <hr />
                                            <p>{singleItem.discription}</p>
                                            <hr />
                                            <div>
                                                <table className="product-page-width">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {" "}
                                                                <b>{"Brand"} &nbsp;&nbsp;&nbsp;:</b>
                                                            </td>
                                                            <td>{"Pixelstrap"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                {" "}
                                                                <b>{"Availability"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                                                            </td>
                                                            <td className="txt-success">{singleItem?.stock}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                {" "}
                                                                <b>{"Seller"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                                                            </td>
                                                            <td>{"ABC"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                {" "}
                                                                <b>{"Fabric"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                                                            </td>
                                                            <td>{"Cotton"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <hr />
                                            <Row>
                                                <Col md="6">
                                                    <h6 className="product-title">{"share it"}</h6>
                                                </Col>
                                                <Col md="6">
                                                    <div className="product-icon">
                                                        <ul className="product-social">
                                                            <li className="d-inline-block">
                                                                <a href="#javascript">
                                                                    <i className="fa fa-facebook"></i>
                                                                </a>
                                                            </li>
                                                            <li className="d-inline-block">
                                                                <a href="#javascript">
                                                                    <i className="fa fa-google-plus"></i>
                                                                </a>
                                                            </li>
                                                            <li className="d-inline-block">
                                                                <a href="#javascript">
                                                                    <i className="fa fa-twitter"></i>
                                                                </a>
                                                            </li>
                                                            <li className="d-inline-block">
                                                                <a href="#javascript">
                                                                    <i className="fa fa-instagram"></i>
                                                                </a>
                                                            </li>
                                                            <li className="d-inline-block">
                                                                <a href="#javascript">
                                                                    <i className="fa fa-rss"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <form className="d-inline-block f-right"></form>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col md="6">
                                                    <h6 className="product-title">{"Rate Now"}</h6>
                                                </Col>
                                                <Col md="6">
                                                    <div className="d-flex">
                                                        <Rating defaultValue={2} size="small" />
                                                        <span>{"ProductReview"}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <div className="m-t-15">
                                                <Button color="primary" className="m-r-10" style={{ display: number > 0 ? "none" : "" }} onClick={() => setNumber(1)}>
                                                    <i className="fa fa-shopping-basket mr-1"></i>
                                                    {"AddToCart"}
                                                </Button>
                                                <span style={{ marginLeft: "10px", marginRight: "16.5px", display: number < 1 ? "none" : "" }}>
                                                    <Button color="" className="m-r-10 btn-add" onClick={() => setNumber(number - 1)}>
                                                        {"-"}
                                                    </Button>
                                                    <span style={{ fontWeight: "500", marginLeft: "10px", marginRight: "20px" }}>{number}</span>
                                                    <Button color="" className="m-r-10 btn-add" onClick={() => setNumber(number + 1)}>
                                                        {"+"}
                                                    </Button>
                                                </span>
                                                <Button color="success" className="m-r-10">
                                                    <i className="fa fa-shopping-cart mr-1"></i>
                                                    {"BuyNow"}
                                                </Button>
                                                <Button color="secondary">
                                                    <i className="fa fa-heart mr-1"></i>
                                                    {"Add To WishList"}
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xl="3 xl-cs-35">
                                    <Card>
                                        <CardBody>
                                            <div className="filter-block">
                                                <h4>{"Brand"}</h4>
                                                <ul>
                                                    <li>{"Clothing"}</li>
                                                    <li>{"Bags"}</li>
                                                    <li>{"Footwear"}</li>
                                                    <li>{"Watches"}</li>
                                                    <li>{"ACCESSORIES"}</li>
                                                </ul>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <div className="collection-filter-block">
                                                <ul>
                                                    <li>
                                                        <div className="media">
                                                            <Truck />
                                                            <div className="media-body">
                                                                <h5>{"Free Shipping"}</h5>
                                                                <p>{"Free Shipping World Wide"}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="media">
                                                            <Clock />
                                                            <div className="media-body">
                                                                <h5>{"24 X 7 Service"}</h5>
                                                                <p>{"Online Service For New Customer"}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="media">
                                                            <Gift />
                                                            <div className="media-body">
                                                                <h5>{"Festival Offer"}</h5>
                                                                <p>{"New Online Special Festival"}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="media">
                                                            <CreditCard />
                                                            <div className="media-body">
                                                                <h5>{"Online Payment"}</h5>
                                                                <p>{"Contrary To Popular Belief."}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default Product_detail;

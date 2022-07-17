import React, { Fragment, useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Media, Button, CardBody, CardHeader, InputGroup, Input, InputGroupAddon } from "reactstrap";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Truck, Gift, CreditCard, Clock, Send } from "react-feather";
import { singleItem } from "./components/singleItem";
import "./index.scss";
import { IMG_URL, SERVICE_URL_USER } from "src/constant/config";
import axios from "axios";
import { getToken } from "src/utils/token";
import { SELECTED_COLOR } from "src/redux/User/Products/actionTypes";
import { OPEN_INFO_ALERT, OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import { addToCart, addToFav } from "src/services/Admin/ManageProduct";
import { Rating } from "@mui/material";
const Product_detail = (props) => {
    const navigate = useNavigate();
    const [state, setState] = useState({ nav1: null, nav2: null });
    const [rating, setRating] = useState();
    const product_id = useParams().product_id;
    const [product_detail, setProduct_detail] = useState();
    const selectedColor = useSelector((state) => state.Product.color);
    // eslint-disable-next-line
    const [img_slide, setImgSlide] = useState();
    const [number, setNumber] = useState(1);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const slider1 = useRef();
    const slider2 = useRef();
    const dispatch = useDispatch();

    async function getDetail(product_id) {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/products/${product_id}`,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            setProduct_detail(res.data);
            setRating(res.data.rating);
            let temp = [];
            res.data?.details.map((item, key) => {
                temp.push(item.images[0]?.image_path);
            });
            while (temp.length < 4) {
                temp.push(res.data.details[0]?.images[0]?.image_path);
            }
            setImgSlide(temp);
        });
    }
    const addToFavorite = () => {
        product_detail?.details.map((item, key) => {
            if (item.color === selectedColor) {
                addToFav({ product_id: item.id });
            }
        });
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Add to favorite success" } });
    };
    const handleAddToCart = () => {
        let flag = false;

        product_detail?.details.map((item, key) => {
            if (item.color === selectedColor) {
                addToCart({ product_id: item.id, quantity: number });
                dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Add to cart success" } });
                flag = true;
            }
            if (!flag) {
                dispatch({ type: OPEN_INFO_ALERT, payload: { message: "Out of stock!!!" } });
            }
        });
    };

    async function getCommentsOfProduct(product_id) {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/comments/products/${product_id}`,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            setComments(res.data);
        });
    }

    async function postComment(product_id) {
        await axios
            .post(`${SERVICE_URL_USER}/comments/products/${product_id}`, {
                body: newComment,
                rating: rating,
            })
            .then((res) => {
                getCommentsOfProduct(product_id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getDetail(product_id);
        getCommentsOfProduct(product_id);
    }, []);

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current,
        });
    }, [dispatch]);
    const { nav1, nav2 } = state;

    const handleSelectColor = (item) => {
        dispatch({ type: SELECTED_COLOR, payload: item.color });
    };
    console.log("product_detail", product_detail);
    const avt_temp = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU";
    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Card>
                            <Row className="product-page-main">
                                <Col xl="4">
                                    <Slider autoplay={true} asNavFor={nav2} arrows={false} ref={(slider) => (slider1.current = slider)} className="product-slider">
                                        {product_detail?.details ? (
                                            product_detail.details.map((item, i) => {
                                                return (
                                                    <div className="item" key={i}>
                                                        <Media
                                                            src={
                                                                item.images.length > 0
                                                                    ? `${IMG_URL}/${item.images[0].image_path}`
                                                                    : item.details?.length > 0 && item.details[0].images.length > 0
                                                                    ? `${IMG_URL}/${item.details[0].images[0].image_path}`
                                                                    : "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"
                                                            }
                                                            style={{ width: "1000px" }}
                                                            alt=""
                                                            className="img-fluid"
                                                        />
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
                                        className="small-slick customer"
                                        style={{ display: "flex", width: "100%" }}
                                    >
                                        {img_slide?.map((item, i) => {
                                            return (
                                                <div className="item" key={i} style={{ width: "100%", display: "flex" }}>
                                                    <Media
                                                        src={
                                                            `${IMG_URL}/${item}`
                                                            //   item.images.length > 0
                                                            //       ? `${IMG_URL}/${item.images[0].image_path}`
                                                            //       : item.details?.length > 0 && item.details[0].images.length > 0
                                                            //       ? `${IMG_URL}/${item.details[0].images[0].image_path}`
                                                            //       : "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"
                                                        }
                                                        alt=""
                                                        className="img-fluid"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </Slider>
                                </Col>
                                <Col xl="5 xl-100">
                                    <Card>
                                        <CardBody>
                                            <div className="product-page-details">
                                                <h3>{product_detail?.product_name}</h3>
                                            </div>
                                            <div className="product-price f-28">
                                                {"$"}

                                                {product_detail?.details.map((item, key) => {
                                                    if (item.color === selectedColor) {
                                                        return item.price;
                                                    }
                                                })}
                                                <del>
                                                    {product_detail?.details.map((item, key) => {
                                                        if (item.color === selectedColor) {
                                                            return item.sale;
                                                        }
                                                    })}
                                                    %
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
                                            <p>{product_detail?.description}</p>
                                            <hr />
                                            <div>
                                                <table className="product-page-width">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {" "}
                                                                <b>{"Brand"} &nbsp;&nbsp;&nbsp;:</b>
                                                            </td>
                                                            <td>{product_detail?.brand}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                {" "}
                                                                <b>{"Availability"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                                                            </td>
                                                            <td className="txt-success">
                                                                {" "}
                                                                {product_detail?.details.map((item, key) => {
                                                                    if (item.color === selectedColor) {
                                                                        return item.available_quantity;
                                                                    }
                                                                })}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                {" "}
                                                                <b>{"Seller"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                                                            </td>
                                                            <td>{"Nguyen Huy Quang"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                {" "}
                                                                <b>{"Manufacturing_date"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                                                            </td>
                                                            <td>
                                                                {product_detail?.details.map((item, key) => {
                                                                    if (item.color === selectedColor) {
                                                                        return item.manufacturing_date.slice(0, 10);
                                                                    }
                                                                })}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <hr />

                                            <Row>
                                                <Col md="6">
                                                    {/* <h6 className="product-title">{"Rate Now"}</h6> */}
                                                    {product_detail?.details.map((item, key) => {
                                                        return (
                                                            <Button
                                                                color="red"
                                                                id={key}
                                                                className="mr-1 btn-color"
                                                                style={{
                                                                    border: `${item.color} solid 1px`,
                                                                    color: selectedColor !== item.color ? item.color : "white",
                                                                    backgroundColor: selectedColor === item.color ? item.color : "",
                                                                }}
                                                                onClick={() => handleSelectColor(item)}
                                                            >
                                                                {item?.color}
                                                            </Button>
                                                        );
                                                    })}
                                                </Col>
                                                <Col md="6">
                                                    <div className="d-flex">
                                                        <Rating defaultValue={product_detail?.rating || 4} size="small" precision={0.5} readOnly />
                                                        <span>{"Product Review"}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <div className="m-t-15">
                                                <span style={{ marginLeft: "10px", marginRight: "16.5px", display: number < 1 ? "none" : "" }}>
                                                    <Button color="" className="m-r-10 btn-add" disabled={number === 1 ? true : false} onClick={() => setNumber(number - 1)}>
                                                        {"-"}
                                                    </Button>
                                                    <span style={{ fontWeight: "500", marginLeft: "10px", marginRight: "20px" }}>{number}</span>
                                                    <Button color="" className="m-r-10 btn-add" onClick={() => setNumber(number + 1)}>
                                                        {"+"}
                                                    </Button>
                                                </span>
                                                <Button color="success" className="m-r-10" onClick={() => handleAddToCart()}>
                                                    <i className="fa fa-shopping-cart mr-1"></i>
                                                    {"Add To Cart"}
                                                </Button>

                                                <Button color="secondary" onClick={() => addToFavorite()}>
                                                    <i className="fa fa-heart mr-1"></i>
                                                    {"Favorite"}
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
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <h4>Comment</h4>
                            </CardHeader>
                            <CardBody>
                                <div className="social-chat">
                                    {comments.map((comment, index) => {
                                        console.log("comment", comment);
                                        let img_avt = comment?.commenter?.images ? `${IMG_URL}/comment.commenter.images` : avt_temp;
                                        return (
                                            <div className="your-msg" key={index}>
                                                <Media>
                                                    <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={img_avt} />
                                                    <Media body>
                                                        <span className="f-w-600">
                                                            {comment?.commenter?.name}{" "}
                                                            <span>
                                                                <div className="d-flex">
                                                                    <Rating defaultValue={comment.rating} size="small" readOnly className="star-gold" />
                                                                </div>
                                                            </span>
                                                        </span>
                                                        <p>{comment?.body}</p>
                                                    </Media>
                                                </Media>
                                            </div>
                                        );
                                    })}

                                    <div className="text-center mb-4">
                                        <a href="#javascript" style={{ color: "#7366ff" }}>
                                            {" "}
                                            {"More Comments"}
                                        </a>
                                    </div>
                                </div>
                                <div className="comments-box">
                                    <Media>
                                        <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={avt_temp} />
                                        <Media body>
                                            <Row>
                                                <Col md="6">
                                                    <div className="d-flex">
                                                        <Rating defaultValue={5} size="small" onChange={(e, newVal) => setRating(newVal)} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <InputGroup className="text-box">
                                                <Input
                                                    className="form-control input-txt-bx"
                                                    type="text"
                                                    name="message-to-send"
                                                    placeholder="Post Your commnets"
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <Button color="transparent" onClick={() => postComment(product_id)}>
                                                        <Send />
                                                    </Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Media>
                                    </Media>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default Product_detail;

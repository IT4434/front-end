import React, { useState } from "react";
import "../index.scss";
import { Button, Card } from "reactstrap";
import { Link } from "react-router-dom";
import img from "../../../../assets/images/logo_ether.png";
import { useDispatch, useSelector } from "react-redux";
import { AddShoppingCart, Favorite, RemoveRedEye } from "@mui/icons-material";
import { pink } from "@material-ui/core/colors";
import { NUMBER_CART } from "../../../../redux/User/Products/actionTypes";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
export default function Product_cart() {
    const [fav, setFav] = useState(false);
    const dispatch = useDispatch();
    const number = useSelector((state) => state.Product.number);
    const addToCart = () => {
        dispatch({ type: NUMBER_CART, payload: number + 1 });
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Add To Cart Successful !" } });
    };
    return (
        <div className={"col-xl-2 col-sm-6 xl-4 col-grid-box"}>
            <Card>
                <div className="product-box">
                    <div className="product-img">
                        {"status" === "sale" ? <span className="ribbon ribbon-danger">{"status"}</span> : ""}
                        {"status" === "50%" ? <span className="ribbon ribbon-success ribbon-right">{"status"}</span> : ""}
                        <span className="ribbon ribbon-secondary ribbon-vertical-left">
                            <i className="icon-gift"></i>
                        </span>

                        <img style={{ width: "100%", height: "100%" }} src={img} alt="" />
                        <div className="product-hover">
                            <ul>
                                <li className="li-fix">
                                    {/* <Link to={``}> */}
                                    <Button color="default" onClick={() => addToCart()}>
                                        {/* <i className="icon-shopping-cart"></i> */}
                                        <AddShoppingCart />
                                    </Button>
                                    {/* </Link> */}
                                </li>
                                <li className="li-fix">
                                    <Link to={`:product_id`}>
                                        <Button color="default" data-toggle="modal">
                                            <RemoveRedEye />
                                        </Button>
                                    </Link>
                                </li>
                                <li className="li-fix" onClick={() => setFav(!fav)}>
                                    {/* <Link to={`$`}> */}
                                    <Button color="default">
                                        {/* <i className="icon-heart"></i> */}
                                        <Favorite sx={{ color: fav ? pink[500] : "" }} />
                                    </Button>
                                    {/* </Link> */}
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
                        <h4 className="font-primary">{"name"}</h4>
                        <p>{"note"}</p>
                        <div className="product-price">
                            {"$"} {"price"}
                            <del>
                                {"$"} {"discountPrice"}
                            </del>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

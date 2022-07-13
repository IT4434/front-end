import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { DISPLAY_CART } from "src/redux/User/Products/actionTypes";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import { Link } from "react-router-dom";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";
import { Minus, Plus, ShoppingCart, X } from "react-feather";
import "../index.scss";
import { IMG_URL } from "src/constant/config";

export default function Cart() {
    const dispatch = useDispatch();
    const display_cart = useSelector((state) => state.Product.display_cart);
    const cart = useSelector((state) => state.Product.cart);
    const totalPrice = useSelector((state) => state.Product.total_price);

    const [number1, setNumber] = useState(1);

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        dispatch({ type: DISPLAY_CART, payload: open });
    };

    return (
        <Fragment key={"right"}>
            <Drawer anchor={"right"} open={display_cart} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <ul className={` active cart`}>
                        <li className="mb-2" style={{ display: "flex", alignItems: "center", justifyContent: "left", height: "100%" }}>
                            <h6 className="mb-0 f-20">{"Shoping Bag"}</h6>
                        </li>
                        {cart?.map((item) => {
                            return (
                                <li className="mt-1">
                                    <div className="media" onClick={"RedirectToCart"}>
                                        <img
                                            className="img-fluid rounded-circle mr-3 img-60"
                                            src={
                                                item.product_detail?.images[0]?.image_path
                                                    ? `${IMG_URL}/${item.product_detail?.images[0]?.image_path}`
                                                    : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"
                                            }
                                            alt=""
                                        />
                                        <div className="media-body">
                                            <h6>{item.product_detail?.product?.product_name}</h6>
                                            <p>{item.product_detail?.product?.description}</p>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <h6 className="text-muted">
                                                    {"Quantity: "}
                                                    {item.quantity}
                                                </h6>
                                                <h5 className="text-muted">${item.quantity * item.product_detail?.price}</h5>
                                            </div>
                                        </div>
                                        {/* <div className="close-circle">
                                            <a href="#javascript">
                                                <X />
                                            </a>
                                        </div> */}
                                    </div>
                                    <hr />
                                </li>
                            );
                        })}

                        <li>
                            <div className="total mt-5">
                                <h6 className="mb-2 mt-0 text-muted">
                                    {"Order Total"} : <span className="f-right f-20">{totalPrice}$</span>
                                </h6>
                            </div>
                        </li>
                        <li className="mt-3" style={{ display: "flex", justifyContent: "space-around" }}>
                            <Link to={`/cart`}>
                                <Button color="primary" className="btn btn-block view-cart">
                                    {"Go To Cart"}
                                </Button>
                            </Link>
                            {/* <Link to={`#`}>
                                <Button color="secondary" className="btn-block view-cart">
                                    {"CheckOut"}
                                </Button>
                            </Link> */}
                        </li>
                    </ul>
                </Box>
            </Drawer>
        </Fragment>
    );
}

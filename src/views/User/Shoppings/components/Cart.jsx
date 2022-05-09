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

export default function Cart() {
    const dispatch = useDispatch();
    const display_cart = useSelector((state) => state.Product.display_cart);
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
                        <li className="mt-1">
                            <div className="media" onClick={"RedirectToCart"}>
                                <img
                                    className="img-fluid rounded-circle mr-3 img-60"
                                    src={"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"}
                                    alt=""
                                />
                                <div className="media-body">
                                    <span>{"V-Neck Shawl Collar Woman's Solid T-Shirt"}</span>
                                    <p>{"Yellow(#fcb102)"}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <h6 className="text-muted">{"Quantity: 1"}</h6>
                                        <h6 className="text-muted">{"$299.00"}</h6>
                                    </div>
                                </div>
                                <div className="close-circle">
                                    <a href="#javascript">
                                        <X />
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="mt-1">
                            <div className="media" onClick={"RedirectToCart"}>
                                <img
                                    className="img-fluid rounded-circle mr-3 img-60"
                                    src={"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"}
                                    alt=""
                                />
                                <div className="media-body">
                                    <span>{"V-Neck Shawl Collar Woman's Solid T-Shirt"}</span>
                                    <p>{"Yellow(#fcb102)"}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <h6 className="text-muted">{"Quantity: 1"}</h6>
                                        <h6 className="text-muted">{"$299.00"}</h6>
                                    </div>
                                </div>
                                <div className="close-circle">
                                    <a href="#javascript">
                                        <X />
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="total mt-5">
                                <h6 className="mb-2 mt-0 text-muted">
                                    {"Order Total"} : <span className="f-right f-20">{"$598.00"}</span>
                                </h6>
                            </div>
                        </li>
                        <li className="mt-3" style={{ display: "flex", justifyContent: "space-around" }}>
                            <Link to={`/cart`}>
                                <Button color="primary" className="btn btn-block view-cart">
                                    {"Go To Cart"}
                                </Button>
                            </Link>
                            <Link to={`#`}>
                                <Button color="secondary" className="btn-block view-cart">
                                    {"CheckOut"}
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </Box>
            </Drawer>
        </Fragment>
    );
}

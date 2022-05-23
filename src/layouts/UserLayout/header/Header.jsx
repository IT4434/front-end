import React, { useState } from "react";
import { Bell, Grid, LogIn, Monitor, Moon, ShoppingCart, Star, Sun, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "src/utils/token";
import { clearRole } from "src/utils/role";
import { clearUser } from "src/utils/user";
import { useNavigate } from "react-router-dom";
import { LAYOUT } from "src/redux/User/Settings/actionTypes";
import { useEffect } from "react";
import { userActions } from "src/redux/Guest/reducer";
import { imagePath } from "../../../constant/imagePath";
import { Badge, InputLabel, MenuItem, Select } from "@material-ui/core";
import { DISPLAY_CART } from "../../../redux/User/Products/actionTypes";
import { alpha, InputBase, styled } from "@mui/material";

export default function Header() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getProfile({ user_id: localStorage.getItem("user_id") }));
        if (localStorage.getItem("layout_version")) {
            document.body.className = localStorage.getItem("layout_version");
        } else {
            localStorage.setItem("layout_version", "light");
        }
    }, []);
    const user = useSelector((state) => state.User.user);
    const display_cart = useSelector((state) => state.Product.display_cart);
    const number_cart = useSelector((state) => state.Product.number);
    const [notificationDropDown, setNotificationDropDown] = useState(false);

    const navigate = useNavigate();
    const [moonlight, setMoonlight] = useState(false);
    const MoonlightToggle = () => {
        if (localStorage.getItem("layout_version") == "dark-only") {
            dispatch({ type: LAYOUT, payload: "light" });
            setMoonlight("light");
            document.body.className = "light";
            localStorage.setItem("layout_version", "light");
        } else {
            dispatch({ type: LAYOUT, payload: "dark-only" });
            setMoonlight("dark-only");
            document.body.className = "dark-only";
            localStorage.setItem("layout_version", "dark-only");
        }
    };
    const toggleDrawer = (open) => {
        // if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
        //     return;
        // }
        dispatch({ type: DISPLAY_CART, payload: open });
    };

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        border: "1px solid #ddd",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    }));
    const SearchIconWrapper = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "40ch",
            },
        },
    }));

    const [value, setValue] = useState("0");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navActive = localStorage.getItem("navbarActive");
    const handleNav = (param) => {
        localStorage.setItem("navbarActive", param);
    };

    return (
        <div className="vchain_header_user">
            <div className="vchain_header_left">
                {/* <img className="logo_header logo_light_theme" src={imagePath.LOGO_LIGHT} alt="" height="41.26" width="152.89" />
                <img className="logo_header logo_dark_theme" src={imagePath.LOGO_DARK} alt="" height="41.26" width="152.89" />
                <label htmlFor="check_toggle_sidebar" className="toggle_sidebar">
                    <Grid width={16} height={16} />
                </label> */}
                <img
                    className="logo_header logo_chinh logo_custom"
                    src={"https://asmart.com.vn/wp-content/uploads/2020/11/1200px-Circle_K_logo_2016.svg_-1000x395.png"}
                    alt=""
                    height="41.26"
                    width="152.89"
                />
                <div className="d-flex">
                    <div className="navbar_user">
                        <a href="/products" className={navActive == "home" ? "active" : ""} onClick={() => handleNav("home")}>
                            Home
                        </a>
                    </div>
                    <div className="navbar_user">
                        <a href="#" className={navActive === "detail" ? "active" : ""}>
                            Detail
                        </a>
                    </div>
                    <div className="navbar_user">
                        <a href="/products/payment" className={navActive === "payment" ? "active" : ""} onClick={() => handleNav("payment")}>
                            Payment
                        </a>
                    </div>
                    <div className="navbar_user">
                        <a href="/cart" className={navActive === "cart" ? "active" : ""} onClick={() => handleNav("cart")}>
                            Cart
                        </a>
                    </div>
                </div>
            </div>
            <div className="vchain_header_right">
                <Star style={{ marginRight: "15px", cursor: "pointer" }} />
                <Badge badgeContent={number_cart} color="primary" style={{ marginRight: "10px", cursor: "pointer" }} onClick={() => toggleDrawer(!display_cart)}>
                    {/* <AddShoppingCart color="action" /> */}
                    <ShoppingCart />
                </Badge>

                <ul className="nav-menus">
                    <li className="onhover-dropdown">
                        <div className="notification-box" onClick={() => setNotificationDropDown(!notificationDropDown)}>
                            <Bell />
                            <span className="badge badge-pill badge-secondary">2</span>
                        </div>
                        <ul className={`notification-dropdown onhover-show-div ${notificationDropDown ? "active" : ""}`}>
                            <li>
                                <Bell />
                                <h6 className="f-18 mb-0">{"Notification"}</h6>
                            </li>
                            <li>
                                <p>
                                    <i className="fa fa-circle-o mr-3 font-primary"> </i>
                                    {"DeliveryProcessing"} <span className="pull-right">{"10 min."}</span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <i className="fa fa-circle-o mr-3 font-success"></i>
                                    {"OrderComplete"}
                                    <span className="pull-right">{"1 hr"}</span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <i className="fa fa-circle-o mr-3 font-info"></i>
                                    {"TicketsGenerated"}
                                    <span className="pull-right">{"3 hr"}</span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <i className="fa fa-circle-o mr-3 font-danger"></i>
                                    {"DeliveryComplete"}
                                    <span className="pull-right">{"6 hr"}</span>
                                </p>
                            </li>
                            <li>
                                <button className="btn btn-primary">{"CheckAllNotification"}</button>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className="mode" onClick={() => MoonlightToggle()}>
                    {localStorage.getItem("layout_version") == "dark-only" ? <Sun /> : <Moon />}
                </div>
                <div className="avata_wrapper">
                    <img
                        className="avata_img b-r-10"
                        style={{ objectFit: "cover" }}
                        width={40}
                        height={40}
                        src={user.avatar || "https://www.cyberlearning.ro/wp-content/uploads/learn-press-profile/5/591b6db105e1e6f3dfadecc9234d484a.jpg"}
                        alt=""
                    />
                    <div className="avata_title">
                        <b>{user.full_name || "No name"}</b>
                        <p className="mb-0 font-roboto">
                            {user.role == "user" ? "User" : "Admin"} <i className="middle fa fa-angle-down"></i>
                        </p>
                    </div>
                    <ul className="profile_dropdown">
                        <li className="dropdown_opt">
                            <User width={17} height={17} />
                            <span>{"Account"} </span>
                        </li>
                        <li
                            className="dropdown_opt"
                            onClick={(e) => {
                                clearToken();
                                clearRole();
                                clearUser();
                                navigate("/");
                            }}
                        >
                            <LogIn width={17} height={17} />
                            <span>{"LogOut"}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import Cart from "src/views/User/Shoppings/components/Cart";
import AlertCustom from "./alert/AlertCustom";
import Content from "./content/Content";
import Footer from "./footer";
import Header from "./header/Header";

export default function UserLayout() {
    const location = useLocation();
    // useEffect(() => {
    //     if (!localStorage.getItem("token")) {
    //         localStorage.clear();
    //         sessionStorage.clear();
    //         // window.location.href = "/login";
    //     }
    // }, [location]);
    return (
        <div className="vchain_layout_user">
            <input type="checkbox" id="check_toggle_sidebar" style={{ display: "none" }} />
            <div className="vchain_content_swapper">
                <Header />
                <Content />
            </div>
            <Cart />
            {/* <Sidebar /> */}
            <AlertCustom />
            <Footer />
        </div>
    );
}

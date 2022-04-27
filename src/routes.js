import React from "react";
import { Navigate } from "react-router-dom";
import { getRole, ROLE } from "src/utils/role";

// Guest view
import Login from "src/views/Guest/Login";
import Registry from "src/views/Guest/Registry";

// Settings
import Settings from "src/views/User/Settings";

import NotFound from "src/shared/NotFound";

import Verify from "src/views/User/Settings/components/Verify";

// Layout
import GuestLayout from "src/layouts/GuestLayout";
import Products from "./views/User/Shoppings/Products";
import Product_detail from "./views/User/Shoppings/Product_detail";
import Payment from "./views/User/Shoppings/Payment";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import Product from "./views/User/Shoppings/product";
const UserLayout = React.lazy(() => import("./layouts/UserLayout/UserLayout"));

const routes = [
    {
        path: "/products",
        element: <UserLayout />,
        children: [
            { path: "", element: <Product /> },
            { path: ":product_id", element: <Product_detail /> },
            { path: "payment", element: <Payment /> },

            { path: "*", element: <Navigate to="/tokens" replace={true} /> },
        ],
    },

    {
        path: "/settings",
        element: <UserLayout />,
        children: [
            { path: "", element: <Settings /> },
            { path: ":userId/verify/email", element: <Verify /> },
            { path: ":userId/verify/password", element: <Verify /> },
            // { path: "*", element: <Navigate to="/settings/404" replace={true} /> },
            { path: "*", element: <Navigate to="/settings" replace={true} /> },
            // { path: "404", element: <NotFound /> }
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,

        children: [
            { path: "login", element: <Login /> },
            { path: "registry", element: <Registry /> },
            // {path: "forgot-password", element: <ForgotPassword />},
            { path: "*", element: <Redirector /> },
            // { path: "404", element: <NotFound /> },
            { path: "/", element: <Redirector /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,

        children: [
            // { path: "login", element: <Login /> },
            // { path: "registry", element: <Registry /> },
            // // {path: "forgot-password", element: <ForgotPassword />},
            // { path: "*", element: <Redirector /> },
            // // { path: "404", element: <NotFound /> },
            // { path: "/", element: <Redirector /> },
        ],
    },
];

function Redirector(props) {
    const role = getRole();
    let to = "";
    if (!role) {
        to = "/login";
    } else if (role === ROLE.USER) {
        to = "/products";
    } else if (role === ROLE.ADMIN) {
        to = "/admin";
    }
    return <Navigate to={to} />;
}

export default routes;

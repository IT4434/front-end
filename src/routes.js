import React from "react";
import { Navigate } from "react-router-dom";
import { getRole, ROLE } from "src/utils/role";

// Guest view
import Login from "src/views/Guest/Login";
import Registry from "src/views/Guest/Registry";

// Network
import MyNetwork from "./views/User/Networks/MyNetwork";
import NewNetwork from "./views/User/Networks/NewNetwork";
import DetailNetwork from "./views/User/Networks/DetailNetwork";

// DApps
import MyDApp from "src/views/User/DApps/MyDApp";
import NewDApp from "src/views/User/DApps/NewDApp";
import DetailDApp from "./views/User/DApps/DetailDApp";

// Tokens
import MyTokensPage from "./views/User/Tokens/MyTokensPage";
import NewTokenPage from "./views/User/Tokens/NewTokenPage";
import TokenDetailPage from "./views/User/Tokens/TokenDetailPage";
import TransferTokenPage from "./views/User/Tokens/TransferTokenPage";
import NewFabricTokenPage from "./views/User/Tokens/NewFabricTokenPage";

// Storages
import MyStorage from "./views/User/Storages2/MyStorage/MyStorage";
import DetailFolder from "./views/User/Storages2/DetailFolder/DetailFolder";
import Recent from "./views/User/Storages2/Recent/Recent";
import Favorite from "./views/User/Storages2/Favorite/Favorite";
import Trash from "./views/User/Storages2/Trash/Trash";
import ShareWithMe from "./views/User/Storages2/ShareWithMe/ShareWithMe";
import DetailPlatfromFolder from "./views/User/Storages2/DetailPlatformFolder/DetailPlatformFolder";

// Settings
import Settings from "src/views/User/Settings";

import NotFound from "src/shared/NotFound";
import FabricTokenDetailPage from "./views/User/Tokens/FabricTokenDetailPage";

import Verify from "src/views/User/Settings/components/Verify";
import EditDApp from "./views/User/DApps/EditDApp/EditDApp";

// Layout
import GuestLayout from "src/layouts/GuestLayout";
import Products from "./views/User/Shoppings/Products";
import Product_detail from "./views/User/Shoppings/Product_detail";
import Payment from "./views/User/Shoppings/Payment";
const UserLayout = React.lazy(() => import("./layouts/UserLayout/UserLayout"));

const routes = [
    // {
    //     path: "/",
    //     element: <UserLayout />,
    //     children: [
    //         { path: "dashboard", element: <Products /> },
    //         { path: "new", element: <NewNetwork /> },
    //         { path: ":networkId", element: <DetailNetwork /> },
    //         { path: "*", element: <Navigate to="/networks" replace={true} /> },
    //         // { path: "404", element: <NotFound /> },
    //     ],
    // },

    {
        path: "/products",
        element: <UserLayout />,
        children: [
            { path: "", element: <Products /> },
            { path: ":product_id", element: <Product_detail /> },
            { path: "payment", element: <Payment /> },
            { path: "fabric/:tokenid/", element: <FabricTokenDetailPage /> },
            { path: "transfer", element: <TransferTokenPage /> },
            { path: ":tokenid/:token_type", element: <TokenDetailPage /> },
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
];

function Redirector(props) {
    const role = getRole();
    let to = "";
    if (!role) {
        to = "/login";
    } else if (role === ROLE.USER) {
        to = "/products";
    }
    return <Navigate to={to} />;
}

export default routes;

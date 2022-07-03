import React from "react";
import { useEffect } from "react";
import { MessageCircle } from "react-feather";
const product_img =
    "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/279506892_357962046171200_7563227832826377298_n.jpg?_nc_cat=105&ccb=1-6&_nc_sid=ae9488&_nc_ohc=ILAsc11W5UoAX9qcaYU&_nc_oc=AQlrYKcGpoYW3gpKUoGQqbcUXS-7m1iJWZeuHkKsn1fXDV3I6iQ8RfTwRocTJKDKYzc&tn=eM5rTJ4veMqDO5eX&_nc_ht=scontent.fhan14-1.fna&oh=03_AVKWEF-LjjXvjbAkVNlxc5IRwgixA_xCbgajhb2o30Mjww&oe=629BFAAA";

export const productData = [
    {
        image: <img src={product_img} style={{ width: 50, height: 50 }} alt="" />,
        product_name: "Red Lipstick",
        product_desc: "Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens",
        amount: "$10",
        stock: <div className="font-success">In Stock</div>,
        start_date: "2011/4/19",
        action: (
            <div>
                <span>
                    <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e" }}></i>
                </span>
                <span>
                    <a href="/admin/manage/products/:id/edit">
                        <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                    </a>
                </span>
                <span>
                    <i className="fa fa-comment" style={{ width: 35, fontSize: 16, padding: 11, color: "#3fa8fc" }}></i>
                </span>
            </div>
        ),
    },
    {
        image: <img src={product_img} style={{ width: 50, height: 50 }} alt="" />,
        product_name: "Red Lipstick",
        product_desc: "Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens",
        amount: "$10",
        stock: <div className="font-danger">Out of Stock</div>,
        start_date: "2011/4/19",
        action: (
            <div>
                <span>
                    <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e" }}></i>
                </span>
                <span>
                    <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                </span>
                <span>
                    <i className="fa fa-comment" style={{ width: 35, fontSize: 16, padding: 11, color: "#3fa8fc" }}></i>
                </span>
            </div>
        ),
    },
    {
        image: <img src={product_img} style={{ width: 50, height: 50 }} alt="" />,
        product_name: "Red Lipstick",
        product_desc: "Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens",
        amount: "$10",
        stock: <div className="font-danger">Out of Stock</div>,
        start_date: "2011/4/19",
        action: (
            <div>
                <span>
                    <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e" }}></i>
                </span>
                <span>
                    <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                </span>
                <span>
                    <i className="fa fa-comment" style={{ width: 35, fontSize: 16, padding: 11, color: "#3fa8fc" }}></i>
                </span>
            </div>
        ),
    },
    {
        image: <img src={product_img} style={{ width: 50, height: 50 }} alt="" />,
        product_name: "Red Lipstick",
        product_desc: "Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens",
        amount: "$20",
        stock: <div className="font-warning">Low Stock</div>,
        start_date: "2011/4/19",
        action: (
            <div>
                <span>
                    <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e" }}></i>
                </span>
                <span>
                    <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                </span>
                <span>
                    <i className="fa fa-comment" style={{ width: 35, fontSize: 16, padding: 11, color: "#3fa8fc" }}></i>
                </span>
            </div>
        ),
    },
    {
        image: <img src={product_img} style={{ width: 50, height: 50 }} alt="" />,
        product_name: "Red Lipstick",
        product_desc: "Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens",
        amount: "$30",
        stock: <div className="font-success">In Stock</div>,
        start_date: "2011/4/19",
        action: (
            <div>
                <span>
                    <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e" }}></i>
                </span>
                <span>
                    <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                </span>
                <span>
                    <i className="fa fa-comment" style={{ width: 35, fontSize: 16, padding: 11, color: "#3fa8fc" }}></i>
                </span>
            </div>
        ),
    },
    {
        image: <img src={product_img} style={{ width: 50, height: 50 }} alt="" />,
        product_name: "Brown Lipstick",
        product_desc: "Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens",
        amount: "$40",
        stock: <div className="font-success">In Stock</div>,
        start_date: "2011/4/19",
        action: (
            <div>
                <span>
                    <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e" }}></i>
                </span>
                <span>
                    <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                </span>
                <span>
                    <i className="fa fa-comment" style={{ width: 35, fontSize: 16, padding: 11, color: "#3fa8fc" }}></i>
                </span>
            </div>
        ),
    },
    {
        image: <img src={product_img} style={{ width: 50, height: 50 }} alt="" />,
        product_name: "Red Lipstick",
        product_desc: "Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens",
        amount: "$10",
        stock: <div className="font-success">In Stock</div>,
        start_date: "2011/4/19",
        action: (
            <div>
                <span>
                    <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e" }}></i>
                </span>
                <span>
                    <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                </span>
                <span>
                    <i className="fa fa-comment" style={{ width: 35, fontSize: 16, padding: 11, color: "#3fa8fc" }}></i>
                </span>
            </div>
        ),
    },
    {
        image: <img src={product_img} style={{ width: 50, height: 50 }} alt="" />,
        product_name: "Red Lipstick",
        product_desc: "Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens",
        amount: "$10",
        stock: <div className="font-success">In Stock</div>,
        start_date: "2011/4/19",
        action: (
            <div>
                <span>
                    <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e" }}></i>
                </span>
                <span>
                    <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                </span>
                <span>
                    <i className="fa fa-comment" style={{ width: 35, fontSize: 16, padding: 11, color: "#3fa8fc" }}></i>
                </span>
            </div>
        ),
    },
];
export const productColumns = [
    {
        name: "Image",
        selector: "image",
        sortable: true,
        center: true,
    },
    {
        name: "Product_Name",
        selector: "product_name",
        sortable: true,
        center: true,
    },
    {
        name: "Product_desc",
        selector: "product_desc",
        sortable: true,
        center: true,
    },
    {
        name: "Amount",
        selector: "amount",
        sortable: true,
        center: true,
    },
    {
        name: "Stock",
        selector: "stock",
        sortable: true,
        center: true,
    },
    {
        name: "Start_date",
        selector: "start_date",
        sortable: true,
        center: true,
    },
    {
        name: "Action",
        selector: "action",
        sortable: true,
        center: true,
    },
];

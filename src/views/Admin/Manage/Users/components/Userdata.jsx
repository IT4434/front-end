import axios from "axios";
import React from "react";

const product_img =
    "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/279506892_357962046171200_7563227832826377298_n.jpg?_nc_cat=105&ccb=1-6&_nc_sid=ae9488&_nc_ohc=ILAsc11W5UoAX9qcaYU&_nc_oc=AQlrYKcGpoYW3gpKUoGQqbcUXS-7m1iJWZeuHkKsn1fXDV3I6iQ8RfTwRocTJKDKYzc&tn=eM5rTJ4veMqDO5eX&_nc_ht=scontent.fhan14-1.fna&oh=03_AVKWEF-LjjXvjbAkVNlxc5IRwgixA_xCbgajhb2o30Mjww&oe=629BFAAA";
async function updatePassword(payload) {
    const response = await axios({
        method: "GET",
        url: `https://jikan1.p.rapidapi.com/anime/16498/episodes`,
        headers: {
            "X-RapidAPI-Host": "jikan1.p.rapidapi.com",
            "X-RapidAPI-Key": "4f3ca2caaamshd4127a26435ae1cp1a2aefjsne8309f77e8e4",
        },
        timeout: 30000,
    }).then((res) => {
        console.log(res);
    });

    return response;
}
export function fetchUserData() {
    const userData = [
        {
            avatar: <img src={product_img} style={{ width: 50, height: 50, borderRadius: "100%" }} alt="" />,
            name: "Red Lipstick",
            spent: "$10",
            classify: <div className="font-success">VIP</div>,
            birth: "2011/4/19",
            action: (
                <div>
                    <span>
                        <i
                            className="fa fa-trash"
                            onClick={() => {
                                if (window.confirm("Are you sure?") == true) {
                                    updatePassword();
                                }
                            }}
                            style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e", cursor: "pointer" }}
                        ></i>
                    </span>
                    <span>
                        <a href="/admin/manage/products">
                            <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                        </a>
                    </span>
                </div>
            ),
        },
        {
            avatar: <img src={product_img} style={{ width: 50, height: 50, borderRadius: "100%" }} alt="" />,
            name: "Red Lipstick",
            spent: "$10",
            classify: <div className="font-danger">Temporarily locked</div>,
            birth: "2011/4/19",
            action: (
                <div>
                    <span>
                        <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e", cursor: "pointer" }}></i>
                    </span>
                    <span>
                        <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                    </span>
                </div>
            ),
        },
        {
            avatar: <img src={product_img} style={{ width: 50, height: 50, borderRadius: "100%" }} alt="" />,
            name: "Red Lipstick",
            spent: "$10",
            classify: <div className="font-danger">Temporarily locked</div>,
            birth: "2011/4/19",
            action: (
                <div>
                    <span>
                        <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e", cursor: "pointer" }}></i>
                    </span>
                    <span>
                        <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                    </span>
                </div>
            ),
        },
        {
            avatar: <img src={product_img} style={{ width: 50, height: 50, borderRadius: "100%" }} alt="" />,
            name: "Red Lipstick",
            spent: "$20",
            classify: <div className="font-primary">New</div>,
            birth: "2011/4/19",
            action: (
                <div>
                    <span>
                        <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e", cursor: "pointer" }}></i>
                    </span>
                    <span>
                        <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                    </span>
                </div>
            ),
        },
        {
            avatar: <img src={product_img} style={{ width: 50, height: 50, borderRadius: "100%" }} alt="" />,
            name: "Red Lipstick",
            spent: "$30",
            classify: <div className="font-success">VIP</div>,
            birth: "2011/4/19",
            action: (
                <div>
                    <span>
                        <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e", cursor: "pointer" }}></i>
                    </span>
                    <span>
                        <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                    </span>
                </div>
            ),
        },
        {
            avatar: <img src={product_img} style={{ width: 50, height: 50, borderRadius: "100%" }} alt="" />,
            name: "Brown Lipstick",
            spent: "$40",
            classify: <div className="font-success">VIP</div>,
            birth: "2011/4/19",
            action: (
                <div>
                    <span>
                        <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e", cursor: "pointer" }}></i>
                    </span>
                    <span>
                        <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                    </span>
                </div>
            ),
        },
        {
            avatar: <img src={product_img} style={{ width: 50, height: 50, borderRadius: "100%" }} alt="" />,
            name: "Red Lipstick",
            spent: "$10",
            classify: <div className="font-success">VIP</div>,
            birth: "2011/4/19",
            action: (
                <div>
                    <span>
                        <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e", cursor: "pointer" }}></i>
                    </span>
                    <span>
                        <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                    </span>
                </div>
            ),
        },
        {
            avatar: <img src={product_img} style={{ width: 50, height: 50, borderRadius: "100%" }} alt="" />,
            name: "Red Lipstick",
            spent: "$10",
            classify: <div className="font-success">VIP</div>,
            birth: "2011/4/19",
            action: (
                <div>
                    <span>
                        <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: "#e4566e", cursor: "pointer" }}></i>
                    </span>
                    <span>
                        <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: "rgb(40, 167, 69)" }}></i>
                    </span>
                </div>
            ),
        },
    ];
    return userData;
}
export const userColumns = [
    {
        name: "Avatar",
        selector: "avatar",
        sortable: true,
        center: true,
    },
    {
        name: "Name",
        selector: "name",
        sortable: true,
        center: true,
    },
    {
        name: "Spent in month",
        selector: "spent",
        sortable: true,
        center: true,
    },
    {
        name: "Classify",
        selector: "classify",
        sortable: true,
        center: true,
    },
    {
        name: "Birth",
        selector: "birth",
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

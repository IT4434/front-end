import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector } from "react-redux";
import axios from "axios";
import { IMG_URL, SERVICE_URL_ADMIN } from "src/constant/config";
import { getToken } from "src/utils/token";
import { ADD_PRODUCT_GENERAL_SUCCESS, GET_PRODUCT_GENERAL } from "src/redux/Admin/ManageProducts/actionTypes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Edit, Plus, Trash } from "react-feather";
import { Button } from "bootstrap";
import { deleteDetailProduct, deleteGeneralProduct, deleteOrder } from "src/services/Admin/ManageProduct";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import ChangeStatus from "./ChangeStatus";

export default function TableOrder() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.manageProduct.product_general);
    const [productGeneral, setProductGeneral] = useState();
    const [rows, setRows] = useState();
    const navigate = useNavigate();

    const getOrderList = async () => {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/orders`,
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            setRows(res.data);
        });
    };

    useEffect(() => {
        getOrderList();
    }, []);

    const handleDeleteOrder = async (payload) => {
        deleteOrder(payload);
        getOrderList();
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Deleted!" } });
    };

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ "& > *": { borderBottom: "unset", color: "inherit" } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            {open ? <KeyboardArrowUpIcon style={{ color: "inherit" }} /> : <KeyboardArrowDownIcon style={{ color: "inherit" }} />}
                        </IconButton>
                    </TableCell>
                    <TableCell style={{ color: "inherit" }}>
                        <TableCell style={{ color: "inherit" }}>
                            <img
                                src={
                                    row?.user?.images[0]?.image_path
                                        ? `${IMG_URL}/${row.user.images[0].image_path}`
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"
                                }
                                style={{ width: 50, height: 50 }}
                                alt=""
                            />
                        </TableCell>
                    </TableCell>
                    <TableCell component="th" scope="row" style={{ color: "inherit" }}>
                        {row?.user?.name}
                    </TableCell>
                    <TableCell align="center" style={{ color: "inherit" }}>
                        {row?.shipping_address}
                    </TableCell>
                    <TableCell align="center" style={{ color: "inherit" }}>
                        {row?.user?.phone}
                    </TableCell>
                    <TableCell align="center" style={{ color: "inherit" }}>
                        {row?.total_price}
                    </TableCell>
                    <TableCell align="center" style={{ color: "inherit" }}>
                        {/* {row?.order_status} */}
                        <ChangeStatus prop={props} />
                    </TableCell>
                    <TableCell align="center" style={{ color: "inherit" }}>
                        <IconButton sx={{ color: "red" }} onClick={() => handleDeleteOrder(props.row.id)}>
                            <Trash />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                {row?.order_detail?.length == 0 ? (
                                    <Typography variant="h6" gutterBottom component="div" style={{ color: "inherit" }}>
                                        No Product
                                    </Typography>
                                ) : (
                                    <>
                                        <Typography variant="h6" gutterBottom component="div" style={{ color: "inherit" }}>
                                            Detail
                                        </Typography>
                                        <Table aria-label="purchases">
                                            <TableHead>
                                                <TableRow style={{ color: "inherit" }}>
                                                    <TableCell style={{ color: "inherit" }}>Image</TableCell>
                                                    <TableCell style={{ color: "inherit" }}>Product Name</TableCell>
                                                    <TableCell style={{ color: "inherit" }}>Quantity</TableCell>
                                                    <TableCell style={{ color: "inherit" }}>Price</TableCell>
                                                    <TableCell align="center" style={{ color: "inherit" }}>
                                                        Sale
                                                    </TableCell>
                                                    <TableCell align="center" style={{ color: "inherit" }}>
                                                        Color
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {row?.order_detail?.map((detailProduct) => (
                                                    <TableRow key={detailProduct.color}>
                                                        <TableCell style={{ color: "inherit" }}>
                                                            <img
                                                                src={
                                                                    detailProduct.product_detail.images[0]?.image_path
                                                                        ? `${IMG_URL}/${detailProduct.product_detail.images[0].image_path}`
                                                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"
                                                                }
                                                                style={{ width: 50, height: 50 }}
                                                                alt=""
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" scope="row" style={{ color: "inherit" }}>
                                                            {detailProduct.product_detail.product.product_name}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row" style={{ color: "inherit" }}>
                                                            {detailProduct.quantity}
                                                        </TableCell>
                                                        <TableCell style={{ color: "inherit" }}>{detailProduct.product_detail.price}$</TableCell>
                                                        <TableCell style={{ color: "inherit" }} align="center">
                                                            {detailProduct.product_detail.sale}$
                                                        </TableCell>
                                                        <TableCell style={{ color: "inherit" }} align="center">
                                                            {detailProduct.product_detail.color}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </>
                                )}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            product_name: PropTypes.string,
            details: PropTypes.arrayOf(
                PropTypes.shape({
                    image: PropTypes.string,
                    price: PropTypes.number,
                    available_quantity: PropTypes.number,
                    color: PropTypes.string,
                    manufacturing_date: PropTypes.string,
                    action: PropTypes.string,
                })
            ),
            image: PropTypes.string,
            brand: PropTypes.string,
            description: PropTypes.string,
            created_at: PropTypes.string,
            action: PropTypes.string,
        }),
    };

    return (
        <TableContainer component={Paper} style={{ backgroundColor: "inherit", color: "inherit" }}>
            <Table aria-label="collapsible table" style={{ color: "inherit !important" }}>
                <TableHead>
                    <TableRow style={{ color: "inherit" }}>
                        <TableCell />
                        <TableCell style={{ color: "inherit" }}>Image</TableCell>
                        <TableCell style={{ color: "inherit" }}>User Name</TableCell>
                        <TableCell align="center" style={{ color: "inherit" }}>
                            Address
                        </TableCell>
                        <TableCell align="center" style={{ color: "inherit" }}>
                            Phone
                        </TableCell>
                        <TableCell align="center" style={{ color: "inherit" }}>
                            Total Price
                        </TableCell>
                        <TableCell align="center" style={{ color: "inherit" }}>
                            Status
                        </TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ color: "inherit" }}>
                    {rows?.map((row) => (
                        <Row style={{ color: "inherit" }} key={row.product_name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

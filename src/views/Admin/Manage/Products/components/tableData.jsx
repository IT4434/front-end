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
import { SERVICE_URL_ADMIN } from "src/constant/config";
import { getToken } from "src/utils/token";
import { ADD_PRODUCT_GENERAL_SUCCESS, GET_PRODUCT_GENERAL } from "src/redux/Admin/ManageProducts/actionTypes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Edit, Plus, Trash } from "react-feather";
import { Button } from "bootstrap";
import { deleteDetailProduct, deleteGeneralProduct } from "src/services/Admin/ManageProduct";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";

export default function CollapsibleTable() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.manageProduct.product_general);
    const [productGeneral, setProductGeneral] = useState();
    const [rows, setRows] = useState();
    const navigate = useNavigate();

    const getData = async () => {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/products`,
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            setProductGeneral(res.data);
            setRows(res.data);
        });
    };
    const getProduct = async (payload) => {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/products/${payload}`,
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            dispatch({ type: ADD_PRODUCT_GENERAL_SUCCESS, payload: res.data });
        });
    };
    useEffect(() => {
        getData();
    }, []);
    const handleAddProduct = async (payload) => {
        await getProduct(payload.row.id);
        navigate("/admin/manage/products/add_product/detail");
    };
    const handleDeleteDetailProduct = async (payload) => {
        deleteDetailProduct(payload);
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Deleted!" } });
        getData();
    };
    const handleDeleteGeneralProduct = async (payload) => {
        deleteGeneralProduct(payload);
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Deleted!" } });
        getData();
    };
    const handleEditGeneralProduct = async (payload) => {
        navigate(`edit_general/${payload}`);
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
                                getProduct(props.row.id);
                            }}
                        >
                            {open ? <KeyboardArrowUpIcon style={{ color: "inherit" }} /> : <KeyboardArrowDownIcon style={{ color: "inherit" }} />}
                        </IconButton>
                    </TableCell>
                    <TableCell style={{ color: "inherit" }}>
                        <img
                            src={
                                row.images[0]?.image_path
                                    ? `https://project2storage.s3.ap-southeast-1.amazonaws.com/${row.images[0].image_path}`
                                    : "https://storage.googleapis.com/hust-files/6359595131863040/images/logo_kikaitech-01_.1m.png"
                            }
                            style={{ width: 50, height: 50 }}
                            alt=""
                        />
                    </TableCell>
                    <TableCell component="th" scope="row" style={{ color: "inherit" }}>
                        {row?.product_name}
                    </TableCell>
                    <TableCell align="right" style={{ color: "inherit" }}>
                        {row?.brand}
                    </TableCell>
                    <TableCell align="right" style={{ color: "inherit" }}>
                        {row?.description}
                    </TableCell>
                    <TableCell align="right" style={{ color: "inherit" }}>
                        {row?.created_at.slice(0, 10)}
                    </TableCell>
                    <TableCell align="right" style={{ color: "inherit" }}>
                        <IconButton color="primary" onClick={() => handleAddProduct(props)}>
                            <Plus />
                        </IconButton>
                        <IconButton sx={{ color: "green" }} onClick={() => handleEditGeneralProduct(props.row.id)}>
                            <Edit />
                        </IconButton>
                        <IconButton sx={{ color: "red" }} onClick={() => handleDeleteGeneralProduct(props.row.id)}>
                            <Trash />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                {row?.details?.length == 0 ? (
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
                                                    {/* <TableCell style={{ color: "inherit" }}>{""}</TableCell> */}
                                                    <TableCell style={{ color: "inherit" }}>Image</TableCell>
                                                    <TableCell style={{ color: "inherit" }}>Color</TableCell>

                                                    <TableCell style={{ color: "inherit" }}>Price</TableCell>
                                                    <TableCell align="right" style={{ color: "inherit" }}>
                                                        Quantity
                                                    </TableCell>
                                                    <TableCell align="right" style={{ color: "inherit" }}>
                                                        Date
                                                    </TableCell>
                                                    <TableCell align="right" style={{ color: "inherit" }}>
                                                        Action
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {row?.details?.map((detailProduct) => (
                                                    <TableRow key={detailProduct.color}>
                                                        <TableCell style={{ color: "inherit" }}>
                                                            <img
                                                                src={
                                                                    detailProduct.images[0]?.image_path
                                                                        ? `https://project2storage.s3.ap-southeast-1.amazonaws.com/${detailProduct.images[0].image_path}`
                                                                        : ""
                                                                }
                                                                style={{ width: 50, height: 50 }}
                                                                alt=""
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" scope="row" style={{ color: "inherit" }}>
                                                            {detailProduct.color}
                                                        </TableCell>
                                                        <TableCell style={{ color: "inherit" }}>{detailProduct.price}$</TableCell>
                                                        <TableCell style={{ color: "inherit" }} align="right">
                                                            {detailProduct.available_quantity}
                                                        </TableCell>
                                                        <TableCell style={{ color: "inherit" }} align="right">
                                                            {detailProduct.manufacturing_date.slice(0, 10)}
                                                        </TableCell>
                                                        <TableCell align="right" style={{ color: "inherit" }}>
                                                            <IconButton sx={{ color: "green" }} onClick={() => navigate(`${detailProduct.id}/edit`)}>
                                                                <Edit />
                                                            </IconButton>
                                                            <IconButton sx={{ color: "red" }} onClick={() => handleDeleteDetailProduct(detailProduct.id)}>
                                                                <Trash />
                                                            </IconButton>
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
                        <TableCell style={{ color: "inherit" }}>Product_Name</TableCell>
                        <TableCell align="right" style={{ color: "inherit" }}>
                            Brand
                        </TableCell>
                        <TableCell align="right" style={{ color: "inherit" }}>
                            Description
                        </TableCell>
                        <TableCell align="right" style={{ color: "inherit" }}>
                            Created At
                        </TableCell>
                        <TableCell align="right">Action</TableCell>
                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
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

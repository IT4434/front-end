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
import { Edit, Lock, Plus, Trash, Unlock } from "react-feather";
import { Button } from "bootstrap";
import { deleteDetailProduct, deleteGeneralProduct, handleLockUser } from "src/services/Admin/ManageProduct";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";

export default function TableUser() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.manageProduct.product_general);
    const [userList, setUserList] = useState();
    const [rows, setRows] = useState();
    const navigate = useNavigate();

    const getUsers = async () => {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/users`,
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            setUserList(res.data);
            setRows(res.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);
    const handleAddProduct = async (payload) => {
        navigate("/admin/manage/products/add_product/detail");
    };
    const handleDeleteDetailProduct = async (payload) => {
        deleteDetailProduct(payload);
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Deleted!" } });
    };
    const lockUser = async (payload, isBlock) => {
        handleLockUser({ user_id: payload.id, is_blocked: isBlock });
        getUsers();
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Success!" } });
    };

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ "& > *": { borderBottom: "unset", color: "inherit" } }}>
                    <TableCell style={{ color: "inherit" }}>
                        <img
                            src={
                                row.images[0]?.image_path
                                    ? `${IMG_URL}/${row.images[0].image_path}`
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"
                            }
                            style={{ width: 50, height: 50 }}
                            alt=""
                        />
                    </TableCell>
                    <TableCell component="th" scope="row" style={{ color: "inherit" }}>
                        <strong>{row?.name}</strong>
                    </TableCell>
                    <TableCell align="right" style={{ color: "inherit" }}>
                        {row?.address}
                    </TableCell>
                    <TableCell align="right" style={{ color: "inherit" }}>
                        {row?.email}
                    </TableCell>
                    <TableCell align="right" style={{ color: "inherit" }}>
                        {row?.phone}
                    </TableCell>
                    <TableCell align="right" style={{ color: "inherit" }}>
                        {row?.is_blocked === 0 ? <div style={{ color: "green" }}>Active</div> : <div style={{ color: "red" }}>Blocked</div>}
                    </TableCell>
                    <TableCell align="right" style={{ color: "inherit" }}>
                        {row?.is_blocked === 1 ? (
                            <IconButton sx={{ color: "green" }} onClick={() => lockUser(props.row, 0)}>
                                <Unlock />
                            </IconButton>
                        ) : (
                            <IconButton sx={{ color: "red" }} onClick={() => lockUser(props.row, 1)}>
                                <Lock />
                            </IconButton>
                        )}
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.string,
            spent: PropTypes.string,
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
                        {/* <TableCell /> */}
                        <TableCell style={{ color: "inherit" }}>Image</TableCell>
                        <TableCell style={{ color: "inherit" }} sortDirection={true}>
                            Name
                        </TableCell>
                        <TableCell align="right" style={{ color: "inherit" }}>
                            Address
                        </TableCell>
                        <TableCell align="right" style={{ color: "inherit" }}>
                            Email
                        </TableCell>
                        <TableCell align="right" style={{ color: "inherit" }}>
                            Phone
                        </TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ color: "inherit" }}>
                    {rows?.map((row) => (
                        <Row style={{ color: "inherit" }} key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
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
import { deleteDetailProduct, deleteGeneralProduct } from "src/services/Admin/ManageProduct";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import { deleteCategory, editCategory } from "src/services/Admin/ManageCategorie";
import AddCategory from "./AddCategory";
import { Button, FormGroup, Input, Modal } from "@material-ui/core";
import { Label } from "reactstrap";

export default function TableCategories() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.manageProduct.product_general);
    const [openEdit, setOpenEdit] = useState(false);
    const [rows, setRows] = useState();
    const [name, setName] = useState();
    const [place, setPlace] = useState();
    const [id, setId] = useState();
    const navigate = useNavigate();

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const getData = async () => {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/categories`,
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
        getData();
    }, []);

    const handleDeleteCategory = async (payload) => {
        deleteCategory(payload);
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Deleted!" } });
        getData();
    };
    const handleEditCategory = async (id) => {
        const payload = {
            id: id,
            category_name: name,
            place: place,
        };
        setOpenEdit(false);
        await editCategory(payload);
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Successful!" } });

        window.location.reload();
    };

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ "& > *": { borderBottom: "unset", color: "inherit" } }}>
                    <TableCell align="center" component="th" scope="row" style={{ color: "inherit" }}>
                        {row?.id}
                    </TableCell>
                    <TableCell align="center" style={{ color: "inherit" }}>
                        {row?.category_name}
                    </TableCell>
                    <TableCell align="center" style={{ color: "inherit" }}>
                        {row?.place}
                    </TableCell>
                    <TableCell align="center" style={{ color: "inherit" }}>
                        {row?.created_at.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center" style={{ color: "inherit" }}>
                        <IconButton
                            sx={{ color: "green" }}
                            onClick={() => {
                                setOpenEdit(true);
                                setId(row.id);
                            }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton sx={{ color: "red" }} onClick={() => handleDeleteCategory(props.row.id)}>
                            <Trash />
                        </IconButton>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            id: PropTypes.string,
            category_name: PropTypes.string,
            place: PropTypes.string,
            created_at: PropTypes.string,
            action: PropTypes.string,
        }),
    };

    return (
        <TableContainer component={Paper} style={{ backgroundColor: "inherit", color: "inherit" }}>
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                <Box sx={style}>
                    <FormGroup>
                        <Label className="form-label">{"Category Name "}</Label>
                        <Input value={name} className="form-control" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label className="form-label">{"Place "}</Label>
                        <Input value={place} className="form-control" type="text" placeholder="Place" onChange={(e) => setPlace(e.target.value)} />
                    </FormGroup>
                    <br />
                    <div className="d-flex" style={{ justifyContent: "right" }}>
                        <Button variant="contained" color="primary" onClick={() => handleEditCategory(id)}>
                            Submit
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Table aria-label="collapsible table" style={{ color: "inherit !important" }}>
                <TableHead>
                    <TableRow style={{ color: "inherit" }}>
                        <TableCell align="center" style={{ color: "inherit" }}>
                            Id
                        </TableCell>
                        <TableCell align="center" style={{ color: "inherit" }}>
                            Category_Name
                        </TableCell>
                        <TableCell align="center" style={{ color: "inherit" }}>
                            Place
                        </TableCell>

                        <TableCell align="center" style={{ color: "inherit" }}>
                            Created At
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

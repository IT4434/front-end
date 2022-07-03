import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Label } from "reactstrap";
import DataTable from "react-data-table-component";
import { Box, Button, FormGroup, Input, Modal, Typography } from "@material-ui/core";
import TableCategories from "./components/tableData";
import { Plus } from "react-feather";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addCategory } from "src/services/Admin/ManageCategorie";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";

const ManageCategories = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [openAdd, setOpenAdd] = useState(false);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState();
    const [category_name, setCategory_name] = useState();
    const [place, setPlace] = useState();
    let bodyFormData = new FormData();
    const dispatch = useDispatch();
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

    const handleAddCategory = async (payload) => {
        // navigate("/admin/manage/products/add_product/detail");
        setOpenAdd(true);
    };

    const handleSubmit = () => {
        bodyFormData.append("category_name", category_name);
        bodyFormData.append("place", place);

        addCategory(bodyFormData);
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Successful!" } });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Modal open={openAdd} onClose={() => setOpenAdd(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <FormGroup>
                                <Label className="form-label">{"Category Name "}</Label>
                                <Input className="form-control" type="text" placeholder="Name" onChange={(e) => setCategory_name(e.target.value)} />
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <Label className="form-label">{"Place "}</Label>
                                <Input className="form-control" type="text" placeholder="Place" onChange={(e) => setPlace(e.target.value)} />
                            </FormGroup>
                            <br />
                            <div className="d-flex" style={{ justifyContent: "right" }}>
                                <Button type="submit" variant="contained" color="primary" onClick={() => handleSubmit()}>
                                    Submit
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                    <Col sm="12">
                        <Card>
                            <CardHeader style={{ display: "flex", justifyContent: "space-between" }}>
                                <h5>{"categories List"} </h5>
                                <Button variant="contained" onClick={() => handleAddCategory()} color="primary" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Plus />
                                    Add Category
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive product-table">
                                    <TableCategories />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ManageCategories;

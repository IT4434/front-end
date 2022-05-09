import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import { fetchUserData, userColumns } from "../components/Userdata.jsx";
import { Box, Modal, Typography } from "@material-ui/core";

const Userlist = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    const userData = fetchUserData();

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>{"Customers List"} </h5>
                                {/* <span>{"ProductListDesc"}</span> */}
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive product-table">
                                    <DataTable noHeader columns={userColumns} data={userData} />
                                </div>
                            </CardBody>
                        </Card>
                        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                            </Box>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Userlist;

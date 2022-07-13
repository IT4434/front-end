import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { Media } from "reactstrap";

const colors = ["Red", "Black", "White", "Green"];

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Choose Color</DialogTitle>
            <List sx={{ pt: 0 }}>
                {colors.map((color) => (
                    <ListItem button onClick={() => handleListItemClick(color)} key={color}>
                        <ListItemAvatar>
                            <div style={{ backgroundColor: "blue" }}>{/* <PersonIcon /> */}</div>
                        </ListItemAvatar>
                        <ListItemText primary={color} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function DialogSelectColor({ color }) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(color);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Typography variant="subtitle1" component="div">
                Color: {selectedValue}
            </Typography>
            <Button variant="outlined" onClick={handleClickOpen}>
                Change
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    );
}

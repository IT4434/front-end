import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState } from "react";
import { updateOrder } from "src/services/Admin/ManageProduct";

export default function ChangeStatus({ prop }) {
    const [status, setStatus] = useState(prop.row.order_status);
    const handleChange = (e) => {
        updateOrder({ order_id: prop.row.id, order_status: e.target.value });
    };
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl size="small">
                <NativeSelect
                    defaultValue={status}
                    inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                    }}
                    onChange={(e) => handleChange(e)}
                >
                    <option value={"Pending"}>Pending</option>
                    <option value={"Shipping"}>Shipping</option>
                    <option value={"Completed"}>Completed</option>
                    <option value={"Cancel"}>Cancel</option>
                </NativeSelect>
            </FormControl>
        </Box>
    );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPrice } from "src/redux/User/filter/action";
function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider() {
    const [value, setValue] = useState([10, 1000]);
    const [filter, setFilter] = useState({ min: 0, max: 1000 });
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue([newValue[0], newValue[1]]);
        setFilter({ min: newValue[0], max: newValue[1] });
        console.log(filter);
        dispatch(filterPrice(filter));
    };

    return (
        <Box>
            <Slider max={1000} min={10} getAriaLabel={() => "Temperature range"} value={value} onChange={handleChange} valueLabelDisplay="auto" getAriaValueText={valuetext} />
        </Box>
    );
}

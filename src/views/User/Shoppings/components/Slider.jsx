import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider() {
    const [value, setValue] = React.useState({ min: 0, max: 1000 });

    const handleChange = (event, newValue) => {
        setValue({ min: newValue[0], max: newValue[1] });
        console.log(value);
    };

    return (
        <Box>
            <Slider max={1000} min={10} getAriaLabel={() => "Temperature range"} value={value} onChange={handleChange} valueLabelDisplay="on" getAriaValueText={valuetext} />
        </Box>
    );
}

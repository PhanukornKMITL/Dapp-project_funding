import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function valuetext(value) {
  return `${value}°C`;
}

export default function GoalSlider(value) {
  return (
    <Box sx={{ width: 300, m: 5 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        //getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
        value={value.value}
      // disabled
      />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Pool value: {value.value} ETH
      </Typography>

    </Box >
  );
}

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/icons-material/Menu";

const TopNav = (accountId) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2596be' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            Funding Project
          </Typography>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {accountId.accountId}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};



export default TopNav;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Toolbar } from "@mui/material";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box sx={{ display: "flex", mb: 20 }}>
        <AppBar component="nav" sx={{ py: 1, backgroundColor: "white" }}>
          <Toolbar>
            <Box
              component="img"
              src="https://res.cloudinary.com/dm1hejbuu/image/upload/v1691674279/endUser/SARIAYA-SEAL1_etumcp.jpg"
              alt="logo"
              sx={{
                display: { sm: "block" },
                py: 2,
                ml: 10,
                width: 80,
              }}
            ></Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;

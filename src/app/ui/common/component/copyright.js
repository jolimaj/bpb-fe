import React, { Component } from "react";
import { Typography, Link, Box } from "@mui/material";

class Copyright extends Component {
  #date;

  constructor(props) {
    super(props);

    this.#date = new Date().getFullYear();
  }

  render() {
    return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.main",
        }}
      >
        <Typography variant="body2" color="secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="/" underline="none">
            Business Permit ng Bayan@
          </Link>
          {this.#date}
        </Typography>
      </Box>
    );
  }
}

export default Copyright;

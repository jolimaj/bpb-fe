"use client";
import React, { Component } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "./ui/common/component/copyright";
import LandingPage from "./ui/users/index";
import theme from "./ui/config/theme";

export default class Home extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <LandingPage />
        <Copyright />
      </ThemeProvider>
    );
  }
}

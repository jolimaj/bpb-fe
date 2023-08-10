import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import {
  Link,
  Paper,
  Grid,
  Container,
  Badge,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  CssBaseline,
  Box,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import Sidebar from "./sidebar";
import Page1 from "../pages/page1";

class DashboardPage extends Component {
  #drawerWidth = 240;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      selected: 0,
      mobileMoreAnchorEl: null,
      anchorEl: null,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  selectPage(event, index) {
    console.log(
      "🚀 ~ file: dashboard.js:47 ~ DashboardPage ~ selectPage ~ index:",
      index
    );
  }

  render() {
    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        marginLeft: this.#drawerWidth,
        width: `calc(100% - ${this.#drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));
    const Drawer = styled(MuiDrawer, {
      shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
      "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: this.#drawerWidth,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
          },
        }),
      },
    }));

    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={this.state.isOpen}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(this.state.isOpen && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={this.state.isOpen}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={this.toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Sidebar selectPage={this.selectPage} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Page1 />
        </Box>
      </Box>
    );
  }
}
export default DashboardPage;

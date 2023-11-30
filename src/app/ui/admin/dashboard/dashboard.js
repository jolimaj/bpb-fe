import { Cookies } from "react-cookie";
import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import {
  Menu,
  MenuItem,
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
  AccountCircle,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import Sidebar from "./sidebar";
import {
  ADMIN_ENDPOINTS,
  STAFF_ENDPOINTS,
  USERS_ENDPOINTS,
} from "../../common/constant/endpoints/admin";
import Modal from "./logoutModal";

import { AxiosInterceptor } from "../../common/interceptor";
import ServiceConfig from "../../common/service-config";
import { SERVICES } from "../../common/constant/services-constant";

class DashboardPage extends Component {
  #drawerWidth = 240;
  #componentName;
  #axios;
  #serviceConfig;
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      selected: 0,
      mobileMoreAnchorEl: null,
      anchorEl: null,
      anchorElUser: null,
      open: false,
    };
    this.handleConfirmLogout = this.handleConfirmLogout.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.pathName = props.route;
    this.isUser = props.isUser;
    this.#componentName = props.pageName;
    this.settings = [
      { id: 1, name: "Account" },
      { id: 2, name: "Logout" },
    ];
    this.cookies = new Cookies();
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
  }

  toggleDrawer() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  #userPage(index) {
    let pathName;
    switch (index) {
      case 0:
        pathName = "/account";
        break;
      case 1:
        pathName = "/account/services";
        break;
      default:
        pathName = "/account";
    }
    this.props.redirect(pathName);
  }
  #adminPage(index) {
    let pathName;
    switch (index) {
      case 0:
        pathName = "/admin";
        break;
      case 1:
        pathName = "/admin/departments";
        break;
      case 3:
        pathName = "/admin/staff";
        break;
      default:
        pathName = "/admin";
    }
    this.props.redirect(pathName);
  }
  selectPage(event, index) {
    if (this.isUser) {
      this.#userPage(index);
    } else {
      this.#adminPage(index);
    }
  }

  handleCloseUserMenu() {
    this.setState({ anchorElUser: null });
  }

  handleOpenUserMenu() {
    this.setState({ anchorElUser: "open" });
  }

  async handleConfirmLogout() {
    const logoutData = await this.#axios.post("/sign-out");
    if (logoutData) {
      this.cookies.remove("session");
      this.props.redirect(ADMIN_ENDPOINTS.SIGN_IN);
    }
  }
  async handleClick(event) {
    switch (event) {
      case 1:
        this.props.redirect(
          this.pathName.includes(ADMIN_ENDPOINTS.ADMIN_DASHBOARD)
            ? ADMIN_ENDPOINTS.PROFILE
            : this.pathName.includes("/departments")
            ? STAFF_ENDPOINTS.PROFILE
            : USERS_ENDPOINTS.PROFILE
        );
        break;
      case 2:
        this.setState({ open: !this.state.open });
        break;
      default:
        break;
    }
  }

  handleClose() {
    this.setState({ open: false });
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
        <Modal
          open={this.state.open}
          handleConfirmLogout={this.handleConfirmLogout}
          handleClose={this.handleClose}
        />
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
              color="secondary"
              noWrap
              sx={{
                flexGrow: 1,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Business Permit ng Bayan
            </Typography>
            <IconButton color="inherit" onClick={this.handleOpenUserMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={this.state.anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(this.state.anchorElUser)}
              onClose={this.handleCloseUserMenu}
            >
              {this.settings.map((setting) => (
                <MenuItem
                  key={setting.id}
                  onClick={(event) => {
                    this.handleClick(setting.id);
                  }}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
            <Box
              component="img"
              src="https://res.cloudinary.com/dm1hejbuu/image/upload/v1691674279/endUser/SARIAYA-SEAL1_etumcp.jpg"
              alt="logo"
              sx={{
                display: { sm: "block" },
                margin: "auto",
                width: 50,
              }}
            />
            <IconButton onClick={this.toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Sidebar
              selectPage={this.selectPage}
              pathName={this.pathName}
              reloadPage={this.props.reloadPage}
              redirect={this.props.redirect}
            />
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
          {this.#componentName}
        </Box>
      </Box>
    );
  }
}
export default DashboardPage;

import React, { Component } from "react";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import {
  Work as ServiceIcon,
  House as HouseIcon,
  Business as BusinessIcon,
  Diversity3 as EmployeeIcon,
  Group as UserIcon,
  WorkspacePremium as BusinessPermitIcon,
  NewReleases as NewReleasesIcon,
  ExpandMore,
  ExpandLess,
  Autorenew,
} from "@mui/icons-material";
import {
  ADMIN_PAGE_NAME,
  USER_PAGE_NAME,
  STAFF_PAGE_NAME,
} from "../../common/constant/admin.js";
import {
  ADMIN_ENDPOINTS,
  USERS_ENDPOINTS,
  STAFF_ENDPOINTS,
} from "../../common/constant/endpoints/admin.js";

class Sidebar extends Component {
  #adminSide;
  #userSide;
  #staffSide;

  constructor(props) {
    super(props);
    this.#userSide = [
      {
        name: USER_PAGE_NAME.DASHBOARD,
        path: USERS_ENDPOINTS.USERS_DASHBOARD,
        icon: (
          <HouseIcon
            color={
              props.pathName === USERS_ENDPOINTS.USERS_DASHBOARD ||
              props.pathName.includes("requirements")
                ? "primary"
                : "fourth"
            }
          />
        ),
      },
      {
        name: USER_PAGE_NAME.SERVICES,
        path: USERS_ENDPOINTS.SERVICES,
        icon: (
          <ServiceIcon
            color={
              props.pathName === USERS_ENDPOINTS.SERVICES ||
              props.pathName.includes(USERS_ENDPOINTS.SERVICES)
                ? "primary"
                : "fourth"
            }
          />
        ),
        list: [
          {
            name: USER_PAGE_NAME.NEW,
            path: USERS_ENDPOINTS.NEW,
            icon: (
              <NewReleasesIcon
                color={
                  props.pathName === USERS_ENDPOINTS.NEW ? "primary" : "fourth"
                }
              />
            ),
          },
          {
            name: USER_PAGE_NAME.RENEW,
            path: USERS_ENDPOINTS.RENEW,
            icon: (
              <Autorenew
                color={
                  props.pathName === USERS_ENDPOINTS.RENEW
                    ? "primary"
                    : "fourth"
                }
              />
            ),
          },
        ],
      },
    ];
    this.#adminSide = [
      {
        name: ADMIN_PAGE_NAME.DASHBOARD,
        path: ADMIN_ENDPOINTS.ADMIN_DASHBOARD,
        icon: (
          <HouseIcon
            color={
              props.pathName === ADMIN_ENDPOINTS.ADMIN_DASHBOARD
                ? "primary"
                : "fourth"
            }
          />
        ),
      },
      {
        name: ADMIN_PAGE_NAME.DEPARTMENT,
        path: ADMIN_ENDPOINTS.DEPARTMENT,
        icon: (
          <BusinessIcon
            color={
              props.pathName === ADMIN_ENDPOINTS.DEPARTMENT
                ? "primary"
                : "fourth"
            }
          />
        ),
      },
      {
        name: ADMIN_PAGE_NAME.STAFF,
        path: ADMIN_ENDPOINTS.STAFF,
        icon: (
          <EmployeeIcon
            color={
              props.pathName === ADMIN_ENDPOINTS.STAFF ? "primary" : "fourth"
            }
          />
        ),
      },
      {
        name: ADMIN_PAGE_NAME.USER,
        path: ADMIN_ENDPOINTS.USER,
        icon: (
          <UserIcon
            color={
              props.pathName === ADMIN_ENDPOINTS.USER ? "primary" : "fourth"
            }
          />
        ),
      },
    ];
    this.#staffSide = [
      {
        name: STAFF_PAGE_NAME.DASHBOARD,
        path: STAFF_ENDPOINTS.USERS_DASHBOARD,
        icon: (
          <HouseIcon
            color={
              props.pathName === STAFF_ENDPOINTS.USERS_DASHBOARD
                ? "primary"
                : "fourth"
            }
          />
        ),
      },
      {
        name: STAFF_PAGE_NAME.BUSINESS_PERMIT,
        path: STAFF_ENDPOINTS.BUSINESS_PERMIT,
        icon: (
          <BusinessPermitIcon
            color={
              props.pathName === STAFF_ENDPOINTS.BUSINESS_PERMIT
                ? "primary"
                : "fourth"
            }
          />
        ),
      },
    ];
    this.sideBars = props.pathName.includes(ADMIN_ENDPOINTS.ADMIN_DASHBOARD)
      ? this.#adminSide
      : props.pathName.includes(STAFF_ENDPOINTS.USERS_DASHBOARD)
      ? this.#staffSide
      : this.#userSide;
    this.state = {
      selected: 0,
      open: false,
    };
    this.pathName = props.pathName;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }
  render() {
    return (
      <main>
        {this.sideBars.map((value, index) => (
          <>
            <ListItemButton
              key={index}
              selected={this.pathName === value.path}
              sx={{
                background:
                  this.pathName === value.path ||
                  this.pathName.includes("requirements")
                    ? "primary"
                    : "fourth",
              }}
              onClick={
                value.name === USER_PAGE_NAME.SERVICES
                  ? this.handleClick
                  : (event) => {
                      this.props.selectPage(event, index);
                      this.setState({ selected: index });
                      window.location.href = value.path;
                    }
              }
            >
              <ListItemIcon>{value.icon}</ListItemIcon>
              <ListItemText
                primary={value.name}
                primaryTypographyProps={{
                  color: this.pathName === value.path ? "primary" : "fourth",
                  fontWeight: this.pathName === value.path ? "bold" : "none",
                }}
              />
              {value.name === USER_PAGE_NAME.SERVICES ? (
                this.state.open ? (
                  <ExpandLess color="primary" fontWeight="bold" />
                ) : (
                  <ExpandMore color="primary" fontWeight="bold" />
                )
              ) : null}
            </ListItemButton>
            {value.name === USER_PAGE_NAME.SERVICES ? (
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                {value.list.map((vals, index) => (
                  <List component="div" disablePadding>
                    <ListItemButton
                      key={index}
                      selected={this.pathName === vals.path}
                      sx={{
                        pl: 4,
                        background:
                          this.pathName === vals.path ? "primary" : "fourth",
                      }}
                      onClick={(event) => {
                        this.props.selectPage(event, index);
                        this.setState({ selected: index });
                        window.location.href = vals.path;
                      }}
                    >
                      <ListItemIcon>{vals.icon}</ListItemIcon>
                      <ListItemText
                        primary={vals.name}
                        primaryTypographyProps={{
                          color:
                            this.pathName === vals.path ? "primary" : "fourth",
                          fontWeight:
                            this.pathName === vals.path ? "bold" : "none",
                        }}
                      />
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
            ) : null}
          </>
        ))}
      </main>
    );
  }
}
export default Sidebar;

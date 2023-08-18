import React, { Component } from "react";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Work as ServiceIcon, House as HouseIcon } from "@mui/icons-material";
import {
  ADMIN_PAGE_NAME,
  USER_PAGE_NAME,
} from "../../common/constant/admin.js";
import {
  ADMIN_ENDPOINTS,
  USERS_ENDPOINTS,
} from "../../common/constant/endpoints/admin.js";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.sideBars = [
      {
        name: USER_PAGE_NAME.DASHBOARD,
        path: USERS_ENDPOINTS.USERS_DASHBOARD,
        icon: (
          <HouseIcon
            color={
              props.pathName === USERS_ENDPOINTS.USERS_DASHBOARD
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
              props.pathName === USERS_ENDPOINTS.SERVICES ? "primary" : "fourth"
            }
          />
        ),
      },
    ];
    this.state = {
      selected: 0,
    };
    this.pathName = props.pathName;
  }

  render() {
    return (
      <main>
        {this.sideBars.map((value, index) => (
          <ListItemButton
            key={index}
            selected={this.pathName === value.path}
            sx={{
              background: this.pathName === value.path ? "primary" : "fourth",
            }}
            onClick={(event) => {
              this.props.selectPage(event, index);
              this.setState({ selected: index });
              window.location.href = value.path;
            }}
          >
            <ListItemIcon>{value.icon}</ListItemIcon>
            <ListItemText
              primary={value.name}
              primaryTypographyProps={{
                color: this.pathName === value.path ? "primary" : "fourth",
                fontWeight: this.pathName === value.path ? "bold" : "none",
              }}
            />
          </ListItemButton>
        ))}
      </main>
    );
  }
}
export default Sidebar;

import React, { Component } from "react";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Layers as LayersIcon } from "@mui/icons-material";

import { ADMIN_PAGE_NAME } from "../../common/constant/admin.js";
import { ADMIN_ENDPOINTS } from "../../common/constant/endpoints/admin.js";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.sideBars = [
      {
        name: ADMIN_PAGE_NAME.DASHBOARD,
        path: ADMIN_ENDPOINTS.DASHBOARD,
      },
      {
        name: ADMIN_PAGE_NAME.USERS,
        path: ADMIN_ENDPOINTS.USERS,
      },
    ];
    this.state = {
      selected: 0,
    };
  }

  render() {
    return (
      <main>
        {this.sideBars.map((value, index) => (
          <ListItemButton
            key={index}
            // selected={useLocation.pathname === value.path}
            onClick={(event) => {
              this.props.selectPage(event, index);
              this.setState({ selected: index });
            }}
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary={value.name} />
          </ListItemButton>
        ))}
      </main>
    );
  }
}
export default Sidebar;

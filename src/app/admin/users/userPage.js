import React, { Component } from "react";
import {
  Container,
  Paper,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Chip,
} from "@mui/material";
import Table from "../../ui/common/component/table";
import { Search as SearchIcon } from "@mui/icons-material";

import { AxiosInterceptor } from "../../ui/common/interceptor";
import ServiceConfig from "../../ui/common/service-config";
import { SERVICES } from "../../ui/common/constant/services-constant";
class UserPage extends Component {
  #serviceConfig;
  #axios;

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      errorMessage: "",
      page: 0,
      rowsPerPage: 10,
      session: props.session,
    };
    this.columns = [
      { id: "ID", label: "User ID", minWidth: 100 },
      { id: "name", label: "Name", minWidth: 170 },
      {
        id: "email",
        label: "Email Address",
        minWidth: 170,
      },
      {
        id: "mobile",
        label: "Mobile Number",
        minWidth: 170,
      },
      {
        id: "role",
        label: "Role",
        minWidth: 170,
      },
      {
        id: "status",
        label: "Status",
        minWidth: 170,
        align: "right",
        format: (value) => value.toFixed(2),
      },
    ];
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.ADMIN)
    ).axios;

    this.getUserList = this.getUserList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    const userData = await this.getUserList();
    if (userData) this.setState({ rows: userData });
  }

  async getUserList() {
    try {
      const req = await this.#axios.get(`/users`, {
        withCredentials: true,
      });
      return req.data;
    } catch (error) {
      if (error?.response.data.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }

  async searchName() {
    try {
      const req = await this.#axios.get(
        `/users?firstName=${this.state.firstName}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      this.setState({ rows: req.data });
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      return error;
    }
  }

  async handleSearch() {
    if (this.state.firstName) {
      await this.searchName();
    } else {
      await this.getUserList();
    }
  }

  render() {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h3"
          gutterBottom
          color="primary.main"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            mb: 5,
            textAlign: "center",
          }}
        >
          Users
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Table
                rows={this.state.rows}
                columns={this.columns}
                pageLength={this.state.rows.length}
                searchComponent={
                  <>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Search First Name
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        this.setState({ firstName: e.target.value });
                      }}
                    />
                    <IconButton
                      aria-label="search"
                      sx={{ flexGrow: 1 }}
                      onClick={this.handleSearch}
                    >
                      <SearchIcon color="primary" />
                    </IconButton>
                  </>
                }
                tableBody={
                  this.state.rows.length > 0 ? (
                    <TableBody>
                      {this.state.rows
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                            >
                              <TableCell align="center">{`000-${row.id}`}</TableCell>
                              <TableCell align="center">{`${row?.firstName.toUpperCase()} ${row?.middleName.toUpperCase()} ${row?.lastName.toUpperCase()}`}</TableCell>
                              <TableCell align="center">{row?.email}</TableCell>
                              <TableCell align="center">
                                {row?.mobile}
                              </TableCell>
                              <TableCell align="center">
                                {row?.roleID === 1
                                  ? "Administrator"
                                  : row?.roleID === 2
                                  ? "User"
                                  : "Staff"}
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={row.isActive ? "Active" : "Not Active"}
                                  color={row.isActive ? "success" : "error"}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <TableRow hover>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableBody>
                  )
                }
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default UserPage;

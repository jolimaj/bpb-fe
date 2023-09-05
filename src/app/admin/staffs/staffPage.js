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
  MenuItem,
} from "@mui/material";
import Table from "../../ui/common/component/table";
import AddStaffForm from "./addStaff";
import { Search as SearchIcon } from "@mui/icons-material";

import { AxiosInterceptor } from "../../ui/common/interceptor";
import ServiceConfig from "../../ui/common/service-config";
import { SERVICES } from "../../ui/common/constant/services-constant";
class StaffPage extends Component {
  #serviceConfig;
  #axios;

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      errorResponse: "",
      page: 0,
      rowsPerPage: 10,
      firstName: "",
      departmentID: 1,
      middleName: "",
      lastName: "",
      email: "",
      mobile: null,
      openForm: false,
      departmentList: [],
      session: props.session,
    };
    this.columns = [
      { id: "ID", label: "Staff ID", minWidth: 100 },
      { id: "name", label: "Name", minWidth: 170 },
      {
        id: "department",
        label: "Department",
        minWidth: 170,
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "density",
        label: "",
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

    this.getStaffList = this.getStaffList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddStaff = this.handleAddStaff.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.getStaffList();
    this.getDepartmentList();
  }
  async getDepartmentList() {
    const data = this.state.session;
    if (!data) {
      window.location.href = "/signin";
    }
    try {
      const req = await this.#axios.get(`/departments`, data.session);
      this.setState({ departmentList: req.data });
      return req;
    } catch (error) {
      if (error?.response.data.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }
  async getStaffList() {
    const data = JSON.parse(localStorage.getItem("session"));
    try {
      const req = await this.#axios.get(`/staff`, data.session);
      this.setState({ rows: req.data });
      return req;
    } catch (error) {
      if (error?.response.data.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }
  async addStaff() {
    try {
      const { departmentID, firstNamemiddleName, lastName, email, mobile } =
        this.state;
      const req = await this.#axios.post(`/staff`, {
        roleID: 3,
        departmentID,
        firstNamemiddleName,
        lastName,
        email,
        mobile,
      });
      this.setState({ rows: req.data });
      return req;
    } catch (error) {
      if (error?.response.data.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }
  async searchName() {
    const data = JSON.parse(localStorage.getItem("session"));
    try {
      const req = await this.#axios.get(
        `/staff?firstName=${this.state.firstName}`,
        data.session
      );
      this.setState({ rows: req.data });
      return req;
    } catch (error) {
      return error;
    }
  }
  async handleSearch() {
    if (this.state.firstName) {
      await this.searchName();
    } else {
      await this.getStaffList();
    }
  }
  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  }

  chandleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  }

  async handleAddStaff() {
    this.setState({ openForm: !this.state.openForm });
  }
  handleClose() {
    this.setState({ openForm: false });
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
          Staffs
        </Typography>{" "}
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
                serviceName="Staff"
                pageLength={this.state.rows.length}
                handleAdd={this.handleAddStaff}
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
                              <TableCell>{row.id}</TableCell>
                              <TableCell>{`${row?.firstName} ${row?.lastName}`}</TableCell>
                              <TableCell>
                                {row?.Department ? row?.Department.name : ""}
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <TableRow hover>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  )
                }
              />
            </Paper>
          </Grid>
        </Grid>
        {this.state.openForm ? (
          <AddStaffForm
            openForm={this.state.openForm}
            handleClose={this.handleClose}
            formInput={this.state}
            departmentComponent={
              <>
                <TextField
                  select // tell TextField to render select
                  name="departmentID"
                  label="Department"
                  fullWidth
                  onChange={(e) => {
                    this.setState({ departmentID: e.target.value });
                  }}
                >
                  {this.state.departmentList.map((page) => (
                    <MenuItem value={page.id} key={page.id}>
                      {page.code}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            }
          />
        ) : null}
      </Container>
    );
  }
}
export default StaffPage;

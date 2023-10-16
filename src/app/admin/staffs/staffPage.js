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
  Alert,
  Chip,
  Button,
} from "@mui/material";
import Table from "../../ui/common/component/table";
import RemoveApproverForm from "../formDialog";
import { Search as SearchIcon } from "@mui/icons-material";
import { errorResponse } from "../../ui/common/erroResponse";

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
      errorMessage: "",
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
      },
      {
        id: "status",
        label: "Status",
        minWidth: 170,
      },
      {
        id: "action",
        label: "",
        minWidth: 170,
        align: "right",
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
    this.addStaff = this.addStaff.bind(this);
  }

  async componentDidMount() {
    const staffData = await this.getStaffList();
    if (staffData) this.setState({ rows: staffData });

    const departmentData = await this.getDepartmentList();
    if (departmentData) this.setState({ departmentList: departmentData });
  }

  async getDepartmentList() {
    const data = this.state.session;
    if (!data) {
      window.location.href = "/signin";
    }
    try {
      const req = await this.#axios.get(`/departments`, {
        withCredentials: true,
      });
      this.setState({ departmentList: req.data });
      return req.data;
    } catch (error) {
      if (error?.response.data.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      this.setState({ errorMessage: error.message });
      return error;
    }
  }
  async getStaffList() {
    const data = this.state.session;
    try {
      const req = await this.#axios.get(`/staff`, {
        withCredentials: true,
      });
      return req.data;
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
      const { departmentID, firstName, middleName, lastName, email, mobile } =
        this.state;
      const req = await this.#axios.post(`/staff`, {
        roleID: 3,
        departmentID,
        fName: firstName,
        mName: middleName,
        lName: lastName,
        email,
        mobile,
      });
      this.setState({ openForm: false });
      await this.getStaffList();
      window.location.reload();

      return req;
    } catch (error) {
      if (error?.response.data.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      const response = errorResponse(error.response);

      this.setState({ errorMessage: response });
      return error;
    }
  }

  async handleReinvite(id) {
    try {
      const req = await this.#axios.post(
        `/staff/reinvite`,
        {
          id,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      window.location.reload();
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      return error;
    }
  }

  async searchName() {
    const data = JSON.parse(localStorage.getItem("session"));
    try {
      const req = await this.#axios.get(
        `/staff?firstName=${this.state.firstName}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      this.setState({ rows: req.data });
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
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
                              <TableCell align="center">{`000-${row.id}`}</TableCell>
                              <TableCell align="center">{`${row?.firstName.toUpperCase()} ${row?.lastName.toUpperCase()}`}</TableCell>
                              <TableCell align="center">
                                {row?.Department ? row?.Department.name : ""}
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={row.isActive ? "Active" : "Not Active"}
                                  color={row.isActive ? "success" : "error"}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  key={row.id}
                                  disabled={row.isActive}
                                  variant="contained"
                                  onClick={() => this.handleReinvite(row.id)}
                                >
                                  Reinvite
                                </Button>
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
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableBody>
                  )
                }
              />
            </Paper>
          </Grid>
        </Grid>
        {this.state.openForm ? (
          <RemoveApproverForm
            openForm={this.state.openForm}
            handleClose={this.handleClose}
            formInput={this.state}
            title="Department"
            btnFunction={this.addStaff}
            serviceName="staff"
            departmentComponent={
              <>
                {this.state.errorMessage ? (
                  <Alert
                    severity="error"
                    style={{ textTransform: "capitalize", mb: 10 }}
                  >
                    {this.state.errorMessage}
                  </Alert>
                ) : null}
                <TextField
                  select // tell TextField to render select
                  required
                  name="departmentID"
                  label="Department"
                  fullWidth
                  defaultValue=""
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
                <TextField
                  autoFocus
                  margin="dense"
                  required
                  id="name"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ firstName: e.target.value });
                  }}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="mName"
                  label="Middle Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ middleName: e.target.value });
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  required
                  id="lName"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ lastName: e.target.value });
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="mobile"
                  label="Mobile Number"
                  type="number"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ mobile: e.target.value });
                  }}
                />
              </>
            }
          />
        ) : null}
      </Container>
    );
  }
}
export default StaffPage;

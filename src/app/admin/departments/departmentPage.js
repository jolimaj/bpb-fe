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
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Table from "../../ui/common/component/table";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import RemoveApproverForm from "../formDialog";

import { AxiosInterceptor } from "../../ui/common/interceptor";
import ServiceConfig from "../../ui/common/service-config";
import { SERVICES } from "../../ui/common/constant/services-constant";
class DepartmentPage extends Component {
  #serviceConfig;
  #axios;

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      errorResponse: "",
      page: 0,
      rowsPerPage: 10,
      code: "",
      session: props.session,
      openForm: false,
      approverList: [],
      userID: "",
      departmentID: "",
    };
    this.columns = [
      { id: "ID", label: "Dept ID", minWidth: 100 },
      { id: "code", label: "Code", minWidth: 100 },
      { id: "name", label: "Name", minWidth: 170 },
      {
        id: "approver",
        label: "Approver",
        minWidth: 200,
      },
      {
        id: "action",
        label: "",
        minWidth: 200,
      },
    ];
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.ADMIN)
    ).axios;

    this.getDepartmentList = this.getDepartmentList.bind(this);
    this.getStaffList = this.getStaffList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateApprover = this.updateApprover.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
  }

  async componentDidMount() {
    const staffData = await this.getStaffList();
    if (staffData) this.setState({ approverList: staffData });

    const departmentData = await this.getDepartmentList();
    if (departmentData) this.setState({ rows: departmentData });
  }

  async updateApprover() {
    const data = this.state.session;
    try {
      await this.#axios.put(
        `/departments/${this.state.departmentID}`,
        this.state,
        {
          withCredentials: true,
        }
      );
      const departmentData = await this.getDepartmentList();
      this.setState({ rows: departmentData });
      this.setState({ openForm: false });
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }
  async getDepartmentList() {
    try {
      const req = await this.#axios.get(`/departments`, {
        withCredentials: true,
      });
      return req.data;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }

  async handleLimit(limit) {
    try {
      const req = await this.#axios.get(`/departments?limit=${limit}`, {
        withCredentials: true,
      });
      this.setState({ rows: req.data });
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }
  async getStaffList() {
    try {
      const req = await this.#axios.get(`/staff`, {
        withCredentials: true,
      });
      return req.data;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }
  async searchCode() {
    try {
      const req = await this.#axios.get(
        `/departments?code=${this.state.code.toUpperCase()}`,
        {
          withCredentials: true,
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
    if (this.state.code) {
      await this.searchCode();
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

  async handleChange(e) {
    this.setState({ openForm: !this.state.openForm, departmentID: e });
  }

  handleClose() {
    this.setState({ openForm: false });
  }

  handleClear() {
    this.setState({ code: "" });
    window.location.reload(true);
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
          Departments
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
                handleLimit={this.handleLimit}
                searchComponent={
                  <>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Search Code
                          </InputAdornment>
                        ),
                        endAdornment: this.state.code ? (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClear}
                              edge="end"
                            >
                              <CloseIcon />
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                      }}
                      onChange={(e) => {
                        this.setState({ code: e.target.value });
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
                              <TableCell align="center">{row.code}</TableCell>
                              <TableCell align="center">{row.name}</TableCell>
                              <TableCell align="center">
                                {row?.User
                                  ? `${row?.User?.firstName} ${row?.User?.lastName}`
                                  : ""}
                              </TableCell>
                              <TableCell key={row.id}>
                                <Button
                                  key={row.id}
                                  onClick={() => this.handleChange(row.id)}
                                >
                                  {row?.User ? "Edit Approver" : "Add Approver"}
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
            title="Approver"
            btnFunction={this.updateApprover}
            departmentComponent={
              <>
                <TextField
                  select // tell TextField to render select
                  required
                  name="userID"
                  label="Staff"
                  fullWidth
                  defaultValue=""
                  onChange={(e) => {
                    this.setState({ userID: e.target.value });
                  }}
                >
                  {this.state.approverList.map((page) => (
                    <MenuItem value={page.id} key={page.id}>
                      {`${page.firstName} ${page.lastName}`}
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
export default DepartmentPage;

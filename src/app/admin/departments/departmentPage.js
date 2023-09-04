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
} from "@mui/material";
import Table from "../../ui/common/component/table";
import { Search as SearchIcon } from "@mui/icons-material";

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
        id: "approver",
        label: "",
        minWidth: 200,
      },
    ];
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.ADMIN)
    ).axios;

    this.getStaffList = this.getDepartmentList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.getDepartmentList();
  }

  async getDepartmentList() {
    const data = JSON.parse(localStorage.getItem("session"));
    if (!data) {
      window.location.href = "/signin";
    }
    try {
      const req = await this.#axios.get(`/departments`, data.session);
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
  async searchCode() {
    const data = JSON.parse(localStorage.getItem("session"));
    try {
      const req = await this.#axios.get(
        `/departments?code=${this.state.code.toUpperCase()}`,
        data.session
      );
      this.setState({ rows: req.data });
      return req;
    } catch (error) {
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
                            Search Code
                          </InputAdornment>
                        ),
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
                              key={row.code}
                            >
                              <TableCell>{row.id}</TableCell>
                              <TableCell>{row.code}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>
                                {row?.User
                                  ? `${row?.User?.firstName} ${row?.User?.lastName}`
                                  : ""}
                              </TableCell>
                              <TableCell>
                                <Button>Change Approver </Button>
                              </TableCell>
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
                        <TableCell></TableCell>
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
export default DepartmentPage;

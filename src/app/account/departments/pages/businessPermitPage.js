import React, { Component } from "react";
import {
  Tab,
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  TextField,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Table from "../../../ui/common/component/table";
import { Search as SearchIcon } from "@mui/icons-material";
import ReviewPopup from "./ReviewPopup";

import { AxiosInterceptor } from "../../../ui/common/interceptor";
import ServiceConfig from "../../../ui/common/service-config";
import { SERVICES } from "../../../ui/common/constant/services-constant";

export default class BusinessPermitPage extends Component {
  #serviceConfig;
  #axios;

  constructor(props) {
    super(props);
    this.state = {
      value: "1",
      rows: [],
      renewApplicationList: [],
      session: props.session,
      page: 0,
      rowsPerPage: 10,
      review: false,
      applicantDetails: "",
      departmentData: "",
      params: props?.params?.get("tab"),
    };
    this.newApplicationColumn = [
      { id: "ID", label: "Application No.", width: 20 },
      { id: "businessName", label: "Business Name", width: 100 },
      { id: "businessType", label: "Business Type" },
      { id: "status", label: "Status" },
      { id: "date", label: "Date" },
      { id: "actions", label: "" },
    ];

    this.handleChange = this.handleChange.bind(this);
    this.getList = this.getList.bind(this);
    this.handlePaymentType = this.handlePaymentType.bind(this);
    this.handleStatusColor = this.handleStatusColor.bind(this);
    this.handleBusinessType = this.handleBusinessType.bind(this);
    this.handleReview = this.handleReview.bind(this);
    this.handleReviewClose = this.handleReviewClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.searchData = this.searchData.bind(this);
    this.handleLimit = this.handleLimit.bind(this);

    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.STAFF)
    ).axios;
  }

  componentDidMount() {
    this.getList();
    if (this.state.params) this.setState({ value: this?.state?.params });
  }

  async getList() {
    if (this?.state?.params === "2") {
      await this.#renewApplication();
    } else {
      await this.#newApplication();
    }
  }

  async #newApplication() {
    const data = this.state.session;
    try {
      const req = await this.#axios.get("businessPermit/new", {
        withCredentials: true,
      });
      this.setState({
        rows: req.data.results,
        departmentData: req.data.departmentData,
      });
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      return error;
    }
  }

  async #newSearch() {
    const data = this.state.session;
    try {
      const query = this.state.name;
      const req = await this.#axios.get(
        `businessPermit/new?searhQuery=${query}`,
        {
          withCredentials: true,
        }
      );

      this.setState({
        rows: req.data.results,
        departmentData: req.data.departmentData,
      });
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      return error;
    }
  }
  async #renewApplication() {
    const data = this.state.session;

    try {
      const req = await this.#axios.get("businessPermit/renew", {
        withCredentials: true,
      });
      this.setState({
        renewApplicationList: req.data.results,
        departmentData: req.data.departmentData,
      });
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      return error;
    }
  }
  async #renewSearch() {
    const data = this.state.session;
    try {
      const query = this.state.name;
      const req = await this.#axios.get(
        `businessPermit/renew?searchQuery=${query}`,
        {
          withCredentials: true,
        }
      );
      this.setState({
        rows: req.data.results,
        departmentData: req.data.departmentData,
      });
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      return error;
    }
  }
  handleChange(event, newValue) {
    window.location.href = `/account/departments/businessPermit?tab=${newValue}`;
  }

  async searchData() {
    if (this.state.value === "1") {
      await this.#newSearch();
    } else {
      await this.#renewSearch();
    }
  }
  async handleSearch() {
    if (this.state.name) {
      await this.searchData();
    } else {
      await this.getList();
    }
  }

  handlePaymentType(id) {
    let name;
    switch (id) {
      case 1:
        name = "Anually";
        break;
      case 2:
        name = "Semi-Anually";
        break;
      case 3:
        name = "Quarterly";
        break;
    }
    return name;
  }
  handleBusinessType(id) {
    let name;
    switch (id) {
      case 1:
        name = "Single";
        break;
      case 2:
        name = "Partnership";
        break;
      case 3:
        name = "Corporation";
        break;
      case 4:
        name = "Cooperative";
        break;
    }
    return name;
  }
  handleLabel(id, type) {
    let color;
    switch (id) {
      case 0:
        if (type === 2) {
          color = "Renew Processing";
        } else {
          color = "Processing";
        }
        break;
      case 1:
        if (type === 2) {
          color = "For Renewal";
        } else {
          color = "Approved";
        }
        break;
      case 3:
        color = "Renew Approved";
        break;
      default:
        if (type === 2) {
          color = "Renew Rejected";
        } else {
          color = "Rejected";
        }
        break;
    }
    return color;
  }
  handleStatusColor(id, type) {
    let color;
    switch (id) {
      case 1:
        if (type === 2) {
          color = "warning";
        } else {
          color = "success";
        }
        break;
      case -1:
        color = "error";
        break;
      case 3:
        color = "success";
        break;
      default:
        break;
    }
    return color;
  }

  async handleReview(data) {
    const { status, assignedToDepartmentID } = data;
    if (
      (status === 1 && assignedToDepartmentID === 1) ||
      (status === 3 && assignedToDepartmentID === 1)
    ) {
      await this.handleRelease(data?.id);
    } else {
      this.setState({ review: true, applicantDetails: data });
    }
  }

  async handleRelease(id) {
    try {
      await this.#axios.put(
        `businessPermit/${id}`,
        { release: true },
        {
          withCredentials: true,
        }
      );
      window.location.reload(true);
    } catch (error) {
      return error;
    }
  }

  handleReviewClose() {
    this.setState({ review: false });
    window.location.reload(true);
  }

  async handleLimit(limit) {
    try {
      const name = this?.state?.params === "2" ? "renew" : "new";
      const req = await this.#axios.get(
        `businessPermit/${name}?limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      this.setState({
        renewApplicationList: req.data.results,
        departmentData: req.data.departmentData,
      });
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }
  render() {
    const da = this.state.departmentData;
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {this.state.review && (
          <ReviewPopup
            review={this.state.review}
            handleClose={this.handleReviewClose}
            applicantDetails={this.state.applicantDetails}
            departmentData={da}
            reloadPage={this.props.reloadPage}
          />
        )}
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
          {`Business Permit - ${da[0]?.code}`}
        </Typography>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <TabContext value={this.state.value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={this.handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="New"
                    value="1"
                    sx={{
                      fontWeight: this.state.value === "1" ? "bold" : "normal",
                    }}
                  />
                  <Tab
                    label="Renew"
                    value="2"
                    sx={{
                      fontWeight: this.state.value === "2" ? "bold" : "normal",
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Table
                  rows={this.state.rows}
                  columns={this.newApplicationColumn}
                  handleLimit={this.handleLimit}
                  pageLength={this.state?.rows?.length ?? 0}
                  searchComponent={
                    <>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Search No. or Last Name"
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
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
                              <TableRow key={row.id}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">
                                  {row?.BasicInfos[0]?.businessName}
                                </TableCell>
                                <TableCell align="center">
                                  {this.handleBusinessType(
                                    row?.BasicInfos[0]?.businessTypeID
                                  )}
                                </TableCell>

                                <TableCell align="center">
                                  <Chip
                                    label={this.handleLabel(row.status)}
                                    color={this.handleStatusColor(row.status)}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {`${
                                    new Date(row.createdAt).getMonth() + 1
                                  }/${new Date(
                                    row.createdAt
                                  ).getDate()}/${new Date(
                                    row.createdAt
                                  ).getFullYear()}`}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    key={row.id}
                                    onClick={() => this.handleReview(row)}
                                    disabled={row.isRelease}
                                  >
                                    {row.status === 1 ? "Release" : "Review"}
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
              </TabPanel>
              <TabPanel value="2">
                <Table
                  rows={this.state.renewApplicationList}
                  columns={this.newApplicationColumn}
                  handleLimit={this.handleLimit}
                  pageLength={this.state.renewApplicationList.length}
                  searchComponent={
                    <>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Search No. or Last Name"
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
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
                    this.state.renewApplicationList.length > 0 ? (
                      <TableBody>
                        {this.state.renewApplicationList
                          .slice(
                            this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage +
                              this.state.rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow key={row.id}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">
                                  {row?.BasicInfos[0]?.businessName}
                                </TableCell>
                                <TableCell align="center">
                                  {this.handleBusinessType(
                                    row?.BasicInfos[0]?.businessTypeID
                                  )}
                                </TableCell>

                                <TableCell align="center">
                                  <Chip
                                    label={this.handleLabel(
                                      row.status,
                                      row.type
                                    )}
                                    color={this.handleStatusColor(
                                      row.status,
                                      row.type
                                    )}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {`${new Date(
                                    row.createdAt
                                  ).getMonth()}/${new Date(
                                    row.createdAt
                                  ).getDate()}/${new Date(
                                    row.createdAt
                                  ).getFullYear()}`}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    key={row.id}
                                    onClick={() => this.handleReview(row)}
                                    disabled={row.isRelease}
                                  >
                                    {row.status === 3 ? "Release" : "Review"}
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
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>
      </Container>
    );
  }
}

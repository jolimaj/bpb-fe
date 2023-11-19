import React, { Component } from "react";
import {
  Box,
  Container,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Button,
  Typography,
} from "@mui/material";
import Table from "../../../ui/common/component/table";
import RenewalForm from "../../../ui/users/bploForm/form";

import { AxiosInterceptor } from "../../../ui/common/interceptor";
import ServiceConfig from "../../../ui/common/service-config";
import { SERVICES } from "../../../ui/common/constant/services-constant";

export default class BusinessList extends Component {
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
      renew: false,
      renewData: {},
    };
    this.newApplicationColumn = [
      { id: "ID", label: "Business Permit Number", width: 20 },
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

    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
  }

  async componentDidMount() {
    await this.getList();
  }

  async getList() {
    try {
      const req = await this.#axios.get("/services/businessPermit", {
        withCredentials: true,
      });
      this.setState({ rows: req.data, departmentData: req.data });
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      return error;
    }
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
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
  handleReview(data) {
    this.setState({ review: true, applicantDetails: data });
  }
  handleReviewClose() {
    this.setState({ review: false });
  }

  handleRenewBusiness(rowe) {
    this.setState({ renew: !this.state.renew, renewData: rowe });
  }

  render() {
    return (
      <>
        {this.state.renew ? (
          <RenewalForm
            pathName={this.props?.pathName}
            renewData={this.state.renewData}
          />
        ) : (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  color="primary"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  My Business Permits
                </Typography>

                <Table
                  rows={this.state.rows}
                  columns={this.newApplicationColumn}
                  pageLength={this.state?.rows?.length ?? 0}
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
                                <TableCell align="center">{`BPB-${row.id}`}</TableCell>
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
                                    disabled={
                                      new Date(row.createdAt).getFullYear() ===
                                        new Date().getFullYear() &&
                                      row.status === 1
                                    }
                                    key={row.id}
                                    onClick={(e) =>
                                      this.handleRenewBusiness(row)
                                    }
                                  >
                                    Renew
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
                        </TableRow>
                      </TableBody>
                    )
                  }
                />
              </Box>
            </Paper>
          </Container>
        )}
      </>
    );
  }
}

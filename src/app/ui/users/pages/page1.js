import React, { Component } from "react";
import { Paper, Grid, Container } from "@mui/material";
import TrackingContent from "./trackingContent";

import { AxiosInterceptor } from "../../common/interceptor";
import ServiceConfig from "../../common/service-config";
import { SERVICES } from "../../common/constant/services-constant";
class Page1 extends Component {
  #serviceConfig;
  #axiosGeneric;
  #axiosUser;
  constructor(props) {
    super(props);
    this.state = {
      departmentList: [],
      permitList: [],
    };
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axiosGeneric = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
    this.#axiosUser = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
    this.getDepartmentList = this.getDepartmentList.bind(this);
  }

  async componentDidMount() {
    const permitList = await this.getMyPermit();
    const departmentList = await this.getDepartmentList();
    this.setState({ permitList, departmentList });
  }
  async getMyPermit() {
    try {
      const req = await this.#axiosUser.get("/services/businessPermit", {
        withCredentials: true,
      });
      return req.data;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      return error;
    }
  }
  async getDepartmentList() {
    try {
      const req = await this.#axiosGeneric.get(`/generic/departmentCodes`);
      return req.data;
    } catch (error) {
      return error;
    }
  }

  render() {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                height: "auto",
              }}
            >
              <TrackingContent
                route={this.props.route}
                permitList={this.state.permitList}
                departmentList={this.state.departmentList}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default Page1;

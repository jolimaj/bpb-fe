import React, { Component } from "react";
import dayjs from "dayjs";
import { Grid, Typography, TextField, Box, Alert } from "@mui/material";

import { AxiosInterceptor } from "../../../common/interceptor";
import ServiceConfig from "../../../common/service-config";
import { SERVICES } from "../../../common/constant/services-constant";
import { errorResponse } from "@/app/ui/common/erroResponse";

export default class BFP extends Component {
  #serviceConfig;
  #axios;
  #basic;
  #axiosPermit;
  constructor(props) {
    super(props);

    this.#basic = props.basicFormData;

    this.state = {
      businessPermitID: "",
      ownersName: `${this.#basic?.fName} ${this.#basic?.mName} ${
        this.#basic?.lName
      }`,
      businessName: this.#basic.businessName,
      totalFloorArea: "",
      errorMessage: "",
      response: "",
      bfpFormData: {},
    };
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
    this.#axiosPermit = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.#basic.responseCode === "LOGIN_FIRST") {
      this.props.redirect("/signin");
    }
  }
  async handleSubmit() {
    try {
      const { ownersName, businessName, totalFloorArea } = this.state;
      const response = await this.#axiosPermit.post(
        "/services/businessPermit/validateBFPForm",
        {
          ownersName,
          businessName,
          totalFloorArea,
        },
        {
          withCredentials: true,
        }
      );

      this.setState({
        response,
        bfpFormData: {
          response: "valid",
          ownersName,
          businessName,
          totalFloorArea,
        },
      });
    } catch (error) {
      let response;
      response = errorResponse(error.response);
      this.setState({ errorMessage: response });
    }
  }

  render() {
    return (
      <Box component="form" p={2} onSubmit={this.handleSubmit}>
        <Typography
          variant="h5"
          gutterBottom
          color="tertiary.main"
          sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 5 }}
        >
          III. CITY / MUNICIPALITY FIRE STATION SECTION
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            {this.state.errorMessage && (
              <Alert severity="error" style={{ textTransform: "capitalize" }}>
                {this.state.errorMessage}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {`Date of Application: ${new Date().toISOString().split("T")[0]}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="red"
              align="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              (TO BE FILLED UP BY THE APPLICANT / OWNER){" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <TextField
              id="applicantName"
              name="applicantName"
              label="Name of Applicant /  Owner"
              fullWidth
              autoComplete="applicantName"
              variant="outlined"
              disabled
              value={this.state.ownersName}
              onChange={(e) => {
                this.setState({ ownersName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <TextField
              id="nameOfBusiness"
              name="nameOfBusiness"
              label="Name of Business"
              fullWidth
              autoComplete="nameOfBusiness"
              variant="outlined"
              disabled
              value={this.state.businessName}
              onChange={(e) => {
                this.setState({ businessName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <TextField
              id="floorArea"
              name="floorArea"
              label="Total Floor Area"
              fullWidth
              required
              autoComplete="floor-area"
              variant="outlined"
              onChange={(e) => {
                this.setState({ totalFloorArea: e.target.value });
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={12} md={6}>
            <TextField
              id="contactNumber"
              name="contactNumber"
              label="Contact No."
              fullWidth
              required
              autoComplete="contact-no"
              variant="outlined"
              type="number"
              disabled
            />
          </Grid>
<Grid item xs={12} sm={12} md={12}>            <TextField
              id="address"
              name="address"
              label="Address of Establishment"
              fullWidth
              autoComplete="address"
              variant="outlined"
              disabled
            />
          </Grid> */}
        </Grid>
      </Box>
    );
  }
}

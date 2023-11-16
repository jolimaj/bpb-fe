import React, { Component } from "react";
import { Grid, Typography, TextField, Box, Alert } from "@mui/material";

import { AxiosInterceptor } from "../../../common/interceptor";
import ServiceConfig from "../../../common/service-config";
import { SERVICES } from "../../../common/constant/services-constant";
import { errorResponse } from "@/app/ui/common/erroResponse";
export default class BusinessActivity extends Component {
  #formData;
  #serviceConfig;
  #axios;
  #axiosPermit;
  constructor(props) {
    super(props);
    this.renewData = this.props.renewData?.BusinessActivities[0];
    this.#formData = new FormData();
    this.state = {
      selectedFile: "",
      fileName: "",
      progress: 10,
      businessPermitID: "",
      // lineOfBusiness: 0,
      line1: "",
      line2: "",
      line3: "",
      // noOfUnits: 0,
      units1: null,
      units2: null,
      units3: null,
      // capitalization: null,
      capital1: null,
      capital2: null,
      capital3: null,
      grossEssential1: null,
      grossEssential2: null,
      grossEssential3: null,
      grossNonEssential1: null,
      grossNonEssential2: null,
      grossNonEssential3: null,
      applicantSignature: "",
      applicantPosition: "",
      errorMessage: "",
      response: "",
      businessActivityData: {},
    };
    this.handleClear = this.handleClear.bind(this);

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

  async handleSubmit() {
    try {
      const {
        // lineOfBusiness,
        line1,
        line2,
        line3,
        // noOfUnits,
        units1,
        units2,
        units3,
        // capitalization,
        capital1,
        capital2,
        capital3,
        grossEssential1,
        grossEssential2,
        grossEssential3,

        grossNonEssential1,
        grossNonEssential2,
        grossNonEssential3,
      } = this.state;
      const payloads = this.renewData
        ? {
            // lineOfBusiness,
            line1,
            line2,
            line3,
            type: this.renewData ? "2" : "1",
            // noOfUnits,
            units1,
            units2,
            units3,
            // capitalization,

            grossEssential1,
            grossEssential2,
            grossEssential3,

            grossNonEssential1,
            grossNonEssential2,
            grossNonEssential3,
            // applicantSignature,
            //applicantPosition,
          }
        : {
            // lineOfBusiness,
            line1,
            line2,
            line3,
            type: this.renewData ? "2" : "1",
            // noOfUnits,
            units1,
            units2,
            units3,
            // capitalization,
            capital1,
            capital2,
            capital3,

            // applicantSignature,
            //applicantPosition,
          };
      const response = await this.#axiosPermit.post(
        "/services/businessPermit/validateBusinessActivity",
        payloads,
        {
          withCredentials: true,
        }
      );
      console.log(
        "🚀 ~ file: businessActivity.js:124 ~ BusinessActivity ~ handleSubmit ~ response:",
        response
      );
      this.setState({
        response,
        businessActivityData: {
          response: "valid",
          line1,
          line2,
          line3,
          type: "1",
          // noOfUnits,
          units1,
          units2,
          units3,
          // capitalization,
          capital1,
          capital2,
          capital3,
          // applicantSignature,
          //applicantPosition,
        },
      });
    } catch (error) {
      let response;
      response = errorResponse(error.response);
      this.setState({ errorMessage: response });
    }
  }
  componentDidMount() {
    if (this.props.basicFormData.responseCode === "LOGIN_FIRST") {
      this.props.redirect("/signin");
    }

    if (this.state.selectedFile) {
      this.setState({
        fileName: this.state.selectedFile?.name,
      });
    }
  }
  handleClear() {
    this.setState({
      fileName: "",
      selectedFile: "",
    });
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
          Business Activity:
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
                mb: 2,
              }}
            >
              Line of Business
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              id="line1"
              name="line1"
              label="1"
              fullWidth
              required
              autoComplete="line1"
              variant="outlined"
              onChange={(e) => {
                this.setState({ line1: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              id="line2"
              name="line2"
              label="2"
              fullWidth
              autoComplete="line2"
              variant="outlined"
              onChange={(e) => {
                this.setState({ line2: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              id="line3"
              name="line3"
              label="3"
              fullWidth
              autoComplete="line3"
              variant="outlined"
              onChange={(e) => {
                this.setState({ line3: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Number of Units
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              id="units1"
              name="units1"
              label="1"
              fullWidth
              type="number"
              autoComplete="units1"
              variant="outlined"
              onChange={(e) => {
                this.setState({ units1: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              id="units2"
              name="units2"
              label="2"
              type="number"
              fullWidth
              autoComplete="units2"
              variant="outlined"
              onChange={(e) => {
                this.setState({ units2: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              id="units3"
              name="units3"
              type="number"
              label="3"
              fullWidth
              autoComplete="units3"
              variant="outlined"
              onChange={(e) => {
                this.setState({ units3: e.target.value });
              }}
            />
          </Grid>
          {!this.renewData ? (
            <>
              <Grid item xs={12} sm={12} md={12}>
                {" "}
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  Capitalization
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="capital1"
                  name="capital1"
                  label="1"
                  fullWidth
                  required
                  type="number"
                  autoComplete="capital1"
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ capital1: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="capital2"
                  name="capital2"
                  type="number"
                  label="2"
                  fullWidth
                  autoComplete="capital2"
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ capital2: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="capital3"
                  name="capital3"
                  label="3"
                  fullWidth
                  type="number"
                  autoComplete="units3"
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ capital3: e.target.value });
                  }}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={12} md={12}>
                {" "}
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="tertiary.main"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      my: 2,
                      textAlign: "center",
                    }}
                  >
                    Gross/Sales Receipts
                  </Typography>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12}>
                    {" "}
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        my: 2,
                      }}
                    >
                      Esssential
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <TextField
                      id="grossEssential1"
                      name="grossEssential1"
                      label="1"
                      fullWidth
                      required
                      type="number"
                      autoComplete="grossEssential1"
                      variant="outlined"
                      onChange={(e) => {
                        this.setState({ grossEssential1: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <TextField
                      id="grossEssential2"
                      name="grossEssential2"
                      type="number"
                      label="2"
                      fullWidth
                      autoComplete="grossEssential2"
                      variant="outlined"
                      onChange={(e) => {
                        this.setState({ grossEssential2: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <TextField
                      id="grossEssential4"
                      name="grossEssential4"
                      label="3"
                      fullWidth
                      type="number"
                      autoComplete="units3"
                      variant="outlined"
                      onChange={(e) => {
                        this.setState({ grossEssential4: e.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12}>
                    {" "}
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        my: 2,
                      }}
                    >
                      Non-Esssential
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <TextField
                      id="grossNonEssential1"
                      name="grossNonEssential1"
                      label="1"
                      fullWidth
                      required
                      type="number"
                      autoComplete="grossNonEssential1"
                      variant="outlined"
                      onChange={(e) => {
                        this.setState({ grossNonEssential1: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <TextField
                      id="grossNonEssential2"
                      name="grossNonEssential2"
                      type="number"
                      label="2"
                      fullWidth
                      autoComplete="grossNonEssential2"
                      variant="outlined"
                      onChange={(e) => {
                        this.setState({ grossNonEssential2: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <TextField
                      id="grossNonEssential3"
                      name="grossNonEssential3"
                      label="3"
                      fullWidth
                      type="number"
                      autoComplete="units3"
                      variant="outlined"
                      onChange={(e) => {
                        this.setState({ grossNonEssential3: e.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    );
  }
}

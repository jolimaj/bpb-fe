import React, { Component } from "react";
import { Grid, Typography, TextField, Box, Alert } from "@mui/material";

import { AxiosInterceptor } from "../../../common/interceptor";
import ServiceConfig from "../../../common/service-config";
import { SERVICES } from "../../../common/constant/services-constant";
import { errorResponse } from "@/app/ui/common/erroResponse";
export default class OtherInformation extends Component {
  #serviceConfig;
  #axios;
  #axiosPermit;
  #basic;

  constructor(props) {
    super(props);
    this.renewData = this.props.renewData?.OtherInfos[0];
    this.#basic = props.basicFormData;
    this.state = {
      businessPermitID: "",
      businessAddress: "",
      businessPostalCode: "",
      businessTelephone: this.renewData ? this.renewData.businessTelephone : "",
      businessMobile: this.renewData ? this.renewData.businessMobile : "",
      businessEmail: this.renewData ? this.renewData.businessEmail : "",
      ownersAddress: "",
      ownersPostalCode: "",
      ownersTelephone: "",
      ownersMobile: this.#basic?.userData?.mobile,
      ownersEmail: this.#basic?.userData?.email, // optional
      emergencyPerson: this.renewData ? this.renewData.emergencyPerson : "",
      emergencyAddress: this.renewData ? this.renewData.emergencyAddress : "",
      emergencyMobile: this.renewData ? this.renewData.emergencyMobile : "",
      businessArea: 0,
      femaleEmployee: 0,
      maleEmployee: 0,
      lguEmployee: 0,
      lessorName: "", //null when not rented
      lessorAddress: "",
      lessorMobile: "",
      lessorEmail: "",
      buildingName: "",
      buildingAddress: "",
      monthlyRental: "",
      errorMessage: "",
      response: "",
      otherInfoData: {},
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
    if (
      typeof window !== "undefined" &&
      this.#basic.responseCode === "LOGIN_FIRST"
    ) {
      if (typeof window !== "undefined") window.location.href = "/signin";
    }
  }
  async handleSubmit() {
    try {
      const {
        businessAddress,
        businessPostalCode,
        businessTelephone,
        businessMobile,
        businessEmail, // optional
        ownersAddress,
        ownersPostalCode,
        ownersTelephone,
        ownersMobile,
        ownersEmail, // optional
        emergencyPerson,
        emergencyAddress,
        emergencyMobile,
        businessArea,
        femaleEmployee,
        maleEmployee,
        lguEmployee,
        lessorName,
        lessorAddress,
        lessorMobile,
        lessorEmail,
        buildingName,
        buildingAddress,
        monthlyRental,
      } = this.state;
      const response = await this.#axiosPermit.post(
        "/services/businessPermit/validateOtherInfo",
        {
          businessAddress,
          businessPostalCode,
          businessTelephone,
          businessMobile,
          businessEmail, // optional
          ownersAddress,
          ownersPostalCode,
          ownersTelephone,
          ownersMobile,
          ownersEmail, // optional
          emergencyPerson,
          emergencyAddress,
          emergencyMobile,
          businessArea,
          femaleEmployee,
          maleEmployee,
          lguEmployee,
          lessorName,
          lessorAddress,
          lessorMobile,
          lessorEmail,
          buildingName,
          buildingAddress,
          monthlyRental,
        },
        {
          withCredentials: true,
        }
      );
      this.setState({
        response,
        otherInfoData: {
          response: "valid",
          businessAddress,
          businessPostalCode,
          businessTelephone,
          businessMobile,
          businessEmail, // optional
          ownersAddress,
          ownersPostalCode,
          ownersTelephone,
          ownersMobile,
          ownersEmail, // optional
          emergencyPerson,
          emergencyAddress,
          emergencyMobile,
          businessArea,
          femaleEmployee,
          maleEmployee,
          lguEmployee,
          lessorName,
          lessorAddress,
          lessorMobile,
          lessorEmail,
          buildingName,
          buildingAddress,
          monthlyRental,
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
          OTHER INFORMATION:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {this.state.errorMessage && (
              <Alert severity="error" style={{ textTransform: "capitalize" }}>
                {this.state.errorMessage}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="businessAddress"
              name="businessAddress"
              label="Business Address"
              fullWidth
              required
              autoComplete="business-address"
              variant="outlined"
              onChange={(e) => {
                this.setState({ businessAddress: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="postalCode"
              name="postalCode"
              label="Postal Code"
              fullWidth
              type="number"
              required
              autoComplete="postal-code"
              variant="outlined"
              onChange={(e) => {
                this.setState({ businessPostalCode: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="emailAddress"
              name="emailAddress"
              label="Email Address"
              fullWidth
              type="email"
              autoComplete="email-address"
              variant="outlined"
              disabled={this.renewData}
              value={this.state.businessEmail}
              onChange={(e) => {
                this.setState({ businessEmail: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="telephoneNumber"
              name="telephoneNumber"
              label="Telephone Number"
              fullWidth
              type="number"
              required
              autoComplete="telephone-number"
              variant="outlined"
              disabled={this.renewData}
              value={this.state.businessTelephone}
              onChange={(e) => {
                this.setState({ businessTelephone: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile Number"
              fullWidth
              type="number"
              required
              autoComplete="mobile-number"
              variant="outlined"
              disabled={this.renewData}
              value={this.state.businessMobile}
              onChange={(e) => {
                this.setState({ businessMobile: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="ownersAddress"
              name="ownersAddress"
              label="Owners Address"
              fullWidth
              autoComplete="ownersAddress"
              variant="outlined"
              onChange={(e) => {
                this.setState({ ownersAddress: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="postalCode1"
              name="postalCode1"
              label="Postal Code"
              fullWidth
              type="number"
              required
              autoComplete="postal-code"
              variant="outlined"
              onChange={(e) => {
                this.setState({ ownersPostalCode: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="emailAddress1"
              name="emailAddress1"
              label="Email Address"
              fullWidth
              type="email"
              autoComplete="email-address1"
              variant="outlined"
              disabled
              value={this.state.ownersEmail}
              onChange={(e) => {
                this.setState({ ownersEmail: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="telephoneNumber1"
              name="telephoneNumber1"
              label="Telephone Number"
              fullWidth
              type="number"
              required
              autoComplete="telephone-number1"
              variant="outlined"
              onChange={(e) => {
                this.setState({ ownersTelephone: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="mobileNumber1"
              name="mobileNumber1"
              label="Mobile Number"
              fullWidth
              type="number"
              required
              autoComplete="mobile-number1"
              variant="outlined"
              disabled
              value={this.state.ownersMobile}
              onChange={(e) => {
                this.setState({ ownersMobile: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="guardian"
              name="guardian"
              label="In case of emergency, provide name of contact person"
              fullWidth
              required
              autoComplete="guardian"
              variant="outlined"
              disabled={this.renewData}
              value={this.state.emergencyPerson}
              onChange={(e) => {
                this.setState({ emergencyPerson: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="guardianNumber"
              name="guardianNumber"
              label="Telephone/Mobile No."
              fullWidth
              required
              autoComplete="guardian-number"
              variant="outlined"
              disabled={this.renewData}
              value={this.state.emergencyMobile}
              onChange={(e) => {
                this.setState({ emergencyMobile: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="guardianAddress"
              name="guardianAddress"
              label="Address"
              fullWidth
              required
              autoComplete="guardian-address"
              variant="outlined"
              disabled={this.renewData}
              value={this.state.emergencyAddress}
              onChange={(e) => {
                this.setState({ emergencyAddress: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="businessArea"
              name="businessArea"
              label="Business Area (in sq m.)"
              fullWidth
              required
              autoComplete="business-area"
              variant="outlined"
              onChange={(e) => {
                this.setState({ businessArea: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1">
              Total No. Employees in Establishment:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="femaleNo"
              name="femaleNo"
              label="Female"
              required
              type="number"
              autoComplete="female-no"
              variant="outlined"
              onChange={(e) => {
                this.setState({ femaleEmployee: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="maleNo"
              name="maleNo"
              label="Male"
              required
              type="number"
              autoComplete="male-no"
              variant="outlined"
              onChange={(e) => {
                this.setState({ maleEmployee: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="lgu"
              name="lgu"
              label="No. of Employees Residing within  LGU"
              required
              type="number"
              autoComplete="male-no"
              variant="outlined"
              onChange={(e) => {
                this.setState({ lguEmployee: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
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
              NOTE : FILL UP ONLY IF BUSINESS PLACE IS RENTED
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="lessorName"
              name="lessorName"
              label="Lessor's Name"
              fullWidth
              autoComplete="lessorName"
              variant="outlined"
              onChange={(e) => {
                this.setState({ lessorName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="lessorAddress"
              name="lessorAddress"
              label="Lessor's Address"
              fullWidth
              autoComplete="lessorAddress"
              variant="outlined"
              onChange={(e) => {
                this.setState({ lessorAddress: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lessorContact"
              name="lessorContact"
              label="Lessor's Full Telephone/Mobile No."
              fullWidth
              autoComplete="lessorContact"
              variant="outlined"
              onChange={(e) => {
                this.setState({ lessorMobile: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lessorRent"
              name="lessorRent"
              label="Monthly Rent"
              fullWidth
              type="number"
              autoComplete="lessorRent"
              variant="outlined"
              onChange={(e) => {
                this.setState({ lessorAddress: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="buildingName"
              name="buildingName"
              label="Name of the Building Rented"
              fullWidth
              autoComplete="buildingName"
              variant="outlined"
              onChange={(e) => {
                this.setState({ buildingName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="buildingAddress"
              name="buildingAddress"
              label="Address of the Building being Rented"
              fullWidth
              autoComplete="buildingAddress"
              variant="outlined"
              onChange={(e) => {
                this.setState({ buildingAddress: e.target.value });
              }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

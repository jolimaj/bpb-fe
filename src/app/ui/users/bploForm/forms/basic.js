import React, { Component } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Box,
  MenuItem,
  FormLabel,
  Radio,
  RadioGroup,
  Alert,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import { AxiosInterceptor } from "../../../common/interceptor";
import ServiceConfig from "../../../common/service-config";
import { SERVICES } from "../../../common/constant/services-constant";
import { errorResponse } from "@/app/ui/common/erroResponse";

export default class BasicInfoForm extends Component {
  #serviceConfig;
  #axios;
  #axiosPermit;
  constructor(props) {
    super(props);
    this.renewData = this.props.renewData?.BasicInfos[0];
    this.state = {
      dateOfApplication: new Date(),
      dtiRegNo: "",
      dtiRegDate: new Date(),
      tinNo: "",
      businessTypeID: 1,
      enjoyTaxIncentive: "true",
      notEnjoyTaxIncentive: "",
      fName: "",
      lName: "",
      mName: "",
      taxPayerName: "",
      businessName: this.renewData ? this.renewData?.businessName : "",
      tradeFranchiseName: this.renewData
        ? this.renewData?.tradeFranchiseName
        : "",
      amendementFrom: 1,
      amendementTo: 2,
      paymentTypeID: 1,
      businessTypeList: [],
      paymentTypeList: [],
      userData: {},
      responseCode: "",

      errorMessage: "",
      response: "",
      basicFormData: {},
    };
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
    this.#axiosPermit = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
    this.getBusinessType = this.getBusinessType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const rw = await this.getUserData();
    if (rw?.data) {
      this.setState({
        responseCode: rw?.code,
        fName: rw?.data?.firstName,
        lName: rw?.data?.lastName,
        mName: rw?.data?.middleName,
        userData: rw?.data,
      });
    }
    await this.getBusinessType();
    await this.getPaymentType();
  }

  async getUserData() {
    try {
      return await this.#axiosPermit.get(`/profile`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      return error;
    }
  }

  async getBusinessType() {
    try {
      const req = await this.#axios.get(`/generic/businessType`, {
        withCredentials: true,
      });
      this.setState({ businessTypeList: req.data });
    } catch (error) {
      return error;
    }
  }

  async getPaymentType() {
    try {
      const req = await this.#axios.get(`/generic/paymentType`, {
        withCredentials: true,
      });
      this.setState({ paymentTypeList: req.data });
    } catch (error) {
      return error;
    }
  }

  async handleSubmit() {
    try {
      const {
        dateOfApplication,
        dtiRegNo,
        dtiRegDate,
        tinNo,
        businessTypeID,
        enjoyTaxIncentive,
        notEnjoyTaxIncentive,
        businessName,
        tradeFranchiseName,
        amendementFrom,
        amendementTo,
        paymentTypeID,
      } = this.state;
      const response = await this.#axiosPermit.post(
        "/services/businessPermit/validateBasicInfo",
        {
          dateOfApplication,
          dtiRegNo,
          dtiRegDate,
          tinNo,
          businessTypeID,
          enjoyTaxIncentive: enjoyTaxIncentive === "true" ? true : false,
          notEnjoyTaxIncentive,
          taxPayerName: `${this.state.fName} ${this.state.mName} ${this.state.lName}`,
          businessName,
          tradeFranchiseName,
          amendementFrom,
          amendementTo,
          paymentTypeID,
        },
        {
          withCredentials: true,
        }
      );
      this.setState({ response });

      if (response) {
        this.setState({
          basicFormData: {
            response: "valid",
            responseCode,
            userData: this.state.userData,
            dateOfApplication,
            dtiRegNo,
            dtiRegDate,
            tinNo,
            businessTypeID,
            enjoyTaxIncentive: enjoyTaxIncentive === "true" ? true : false,
            notEnjoyTaxIncentive,
            taxPayerName: `${this.state.fName} ${this.state.mName} ${this.state.lName}`,
            businessName,
            tradeFranchiseName,
            amendementFrom,
            amendementTo,
            paymentTypeID,
          },
        });
      }
    } catch (error) {
      let response;
      if (this.state.fName === "") {
        response = errorResponse("Tax Payer First Name is Required");
      }

      if (this.state.lName === "") {
        response = errorResponse("Tax Payer Last Name is Required");
      }
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
          BASIC INFORMATION:
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
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              select // tell TextField to render select
              name="paymentTypeID"
              label="Mode of Payment"
              required
              fullWidth
              value={this.state.paymentTypeID}
              onChange={(e) => {
                this.setState({ paymentTypeID: e.target.value });
              }}
            >
              {this.state.paymentTypeList.map((page) => (
                <MenuItem value={page.id} key={page.id}>
                  {page.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullwidth
                id="date"
                required
                name="date"
                label="Date of Application"
                variant="standard"
                inputFormat="MM/dd/yyyy"
                defaultValue={dayjs(new Date())}
                disabled
                renderInput={(params) => <TextField {...params} fullWidth />}
                onChange={(e) => {
                  this.setState({ dateOfApplication: e.target.value });
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullwidth
                id="date"
                name="date"
                label="DTI/SEC/CDA Registration Date"
                variant="standard"
                inputFormat="MM/dd/yyyy"
                defaultValue={dayjs(new Date())}
                renderInput={(params) => <TextField {...params} fullWidth />}
                onChange={(e) => {
                  this.setState({ dtiRegDate: e });
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              id="dtiRegNo"
              name="dtiRegNo"
              label="DTI/SEC/CDA Registration No.	"
              fullWidth
              type="number"
              required
              autoComplete="shipping address-line2"
              variant="outlined"
              onChange={(e) => {
                this.setState({ dtiRegNo: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              required
              id="tinNo"
              name="tinNo"
              label="Tin No."
              fullWidth
              type="number"
              autoComplete="tin no."
              variant="outlined"
              onChange={(e) => {
                this.setState({ tinNo: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              required
              select // tell TextField to render select
              name="businessTypeID"
              label="Type of Business"
              fullWidth
              value={this.state.businessTypeID}
              onChange={(e) => {
                this.setState({ businessTypeID: e.target.value });
              }}
            >
              {this.state.businessTypeList.map((page) => (
                <MenuItem value={page.id} key={page.id}>
                  {page.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              required
              select // tell TextField to render select
              name="amendmentFrom"
              label="Amendment From"
              fullWidth
              value={this.state.amendementFrom}
              onChange={(e) => {
                this.setState({ amendementFrom: e.target.value });
              }}
            >
              {this.state.businessTypeList.map((page) => (
                <MenuItem value={page.id} key={page.id}>
                  {page.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              select // tell TextField to render select
              name="amendmentTo"
              label="Amendment To"
              fullWidth
              required
              value={this.state.amendementTo}
              onChange={(e) => {
                this.setState({ amendementTo: e.target.value });
              }}
            >
              {this.state.businessTypeList.map((page) => (
                <MenuItem value={page.id} key={page.id}>
                  {page.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Are you enjoying tax incentive from any Government Entity?
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={this.state.enjoyTaxIncentive}
              onChange={(e) => {
                this.setState({ enjoyTaxIncentive: e.target.value });
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TextField
              required
              id="specifyEntity"
              name="specifyEntity"
              label="Please specify Entity?"
              fullWidth
              autoComplete="specify-entity"
              variant="outlined"
              disabled={this.state.enjoyTaxIncentive === "true" ? true : false}
              onChange={(e) => {
                this.setState({ notEnjoyTaxIncentive: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="primary"
              align="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Name of Taxpayer / Registrant
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              required
              id="lName"
              name="lName"
              label="Last Name"
              fullWidth
              autoComplete="lName"
              variant="outlined"
              disabled
              value={this.state.lName}
              onChange={(e) => {
                this.setState({ lName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              required
              id="fName"
              name="fName"
              label="First Name"
              fullWidth
              autoComplete="fName"
              variant="outlined"
              value={this.state.fName}
              disabled
              onChange={(e) => {
                this.setState({ fName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              id="mName"
              name="mName"
              label="Middle Name Name"
              fullWidth
              autoComplete="mName"
              variant="outlined"
              disabled
              value={this.state.mName}
              onChange={(e) => {
                this.setState({ mName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              required
              id="businessName"
              name="businessName"
              label="Business Name"
              fullWidth
              autoComplete="businessName"
              variant="outlined"
              disabled={this.renewData}
              value={this.state.businessName}
              onChange={(e) => {
                this.setState({ businessName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              required
              id="tradeName"
              name="tradeName"
              label="Trade name / Franchise"
              fullWidth
              autoComplete="tradeName"
              variant="outlined"
              disabled={this.renewData}
              value={this.state.tradeFranchiseName}
              onChange={(e) => {
                this.setState({ tradeFranchiseName: e.target.value });
              }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

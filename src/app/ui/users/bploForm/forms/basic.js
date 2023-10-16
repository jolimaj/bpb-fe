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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import { AxiosInterceptor } from "../../../common/interceptor";
import ServiceConfig from "../../../common/service-config";
import { SERVICES } from "../../../common/constant/services-constant";

export default class BasicInfoForm extends Component {
  #serviceConfig;
  #axios;
  constructor(props) {
    super(props);
    this.state = {
      dateOfApplication: "",
      dtiRegNo: "",
      dtiRegDate: "",
      tinNo: "",
      businessTypeID: "",
      enjoyTaxIncentive: false,
      notEnjoyTaxIncentive: "",
      taxPayerName: "",
      businessName: "",
      tradeFranchiseName: "",
      amendementFrom: "",
      amendementTo: "",
      paymentTypeID: "",
      businessTypeList: [],
      paymentTypeList: [],
      fName: "",
      lName: "",
      mName: "",
    };
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;

    this.getBusinessType = this.getBusinessType.bind(this);
  }

  componentDidMount() {
    this.getBusinessType();
    this.getPaymentType();
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

  render() {
    return (
      <Box p={2}>
        <Typography
          variant="h5"
          gutterBottom
          color="tertiary.main"
          sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 5 }}
        >
          BASIC INFORMATION:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              select // tell TextField to render select
              name="paymentTypeID"
              label="Mode of Payment"
              fullWidth
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
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullwidth
                id="date"
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
          <Grid item xs={12} sm={4}>
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
                  this.setState({ dtiRegDate: e.target.value });
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              select // tell TextField to render select
              name="businessTypeID"
              label="Type of Business"
              fullWidth
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
          <Grid item xs={12} sm={6}>
            <TextField
              select // tell TextField to render select
              name="amendmentFrom"
              label="Amendment From"
              fullWidth
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
          <Grid item xs={12} sm={6}>
            <TextField
              select // tell TextField to render select
              value={10}
              name="amendmentTo"
              label="Amendment To"
              fullWidth
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
          <Grid item xs={12} sm={6}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Are you enjoying tax incentive from any Government Entity?
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={2}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                this.setState({ enjoyTaxIncentive: e.target.value });
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="specifyEntity"
              name="specifyEntity"
              label="Please specify Entity?"
              fullWidth
              autoComplete="specify-entity"
              variant="outlined"
              onChange={(e) => {
                this.setState({ notEnjoyTaxIncentive: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="lName"
              name="lName"
              label="Last Name"
              fullWidth
              autoComplete="lName"
              variant="outlined"
              onChange={(e) => {
                this.setState({ lName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="fName"
              name="fName"
              label="First Name"
              fullWidth
              autoComplete="fName"
              variant="outlined"
              onChange={(e) => {
                this.setState({ fName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="mName"
              name="mName"
              label="Middle Name Name"
              fullWidth
              autoComplete="mName"
              variant="outlined"
              onChange={(e) => {
                this.setState({ mName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="businessName"
              name="businessName"
              label="Business Name"
              fullWidth
              autoComplete="businessName"
              variant="outlined"
              onChange={(e) => {
                this.setState({ businessName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="tradeName"
              name="tradeName"
              label="Trade name / Franchise"
              fullWidth
              autoComplete="tradeName"
              variant="outlined"
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

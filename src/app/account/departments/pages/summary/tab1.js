import React, { Component } from "react";
import { Grid, Typography, Divider } from "@mui/material";

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.details = props.details?.applicantDetails;
    this.basicInfo = this.details?.BasicInfos[0];
  }
  #handleDateString(date) {
    return new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  #handlePaymentTypeString(id) {
    let paymentType;
    switch (id) {
      case 1:
        paymentType = "Annually";
        break;
      case 2:
        paymentType = "Semi-Annually";
        break;
      default:
        paymentType = "Quarterly";
        break;
    }
    return paymentType;
  }

  #handleBusinessType(id) {
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

  render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Date of Application:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.#handleDateString(this.details.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Mode of Payment:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.#handlePaymentTypeString(this.details.paymentTypeID)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              TIN No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">{this.basicInfo.tinNo}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              DTI/SEC/CDA Registration No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2"> {this.basicInfo.dtiRegNo}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              DTI/SEC/CDA Registration Date.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.#handleDateString(this.basicInfo.dtiRegDate)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Type of Business:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.#handleBusinessType(this.basicInfo.businessTypeID)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Ammendement:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2"></Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Are you enjoying tax incentive from any Government Entity?
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="body2">
              {this.basicInfo.enjoyTaxIncentive
                ? "Yes"
                : `No because ${this.basicInfo.notEnjoyTaxIncentive}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Divider light />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                textTransform: "upperCase",
                color: "primary.main",
              }}
            >
              Name of Taxpayer / Registrant
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Name:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.basicInfo.taxPayerName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Business Name:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.basicInfo.businessName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Trade/ Franchise:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.basicInfo.tradeFranchiseName}
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}

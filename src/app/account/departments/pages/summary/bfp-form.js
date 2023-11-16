import React, { Component } from "react";
import { Grid, Typography, Divider, Box } from "@mui/material";

export default class BFPForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.bfpForm = props.details.BFPForms[0];
    this.otherInfo = props.details.OtherInfos[0];
  }
  #handleDateString(date) {
    return new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
              Date:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.#handleDateString(this.bfpForm.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Application No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">{`0000-${this.props.details.id}`}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Name of Applicant / Owner:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">{this.bfpForm.ownersName}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Name of Business:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">{this.bfpForm.businessName}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Total Floor Area:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Typography variant="body2">
              {this.bfpForm.totalFloorArea}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Contact No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Typography variant="body2">
              {this.otherInfo.businessMobile}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Address of Establishment:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo.businessAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Divider light />
          </Grid>
          <Grid item xs={12} sm={12} md={6}></Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                backgroundImage: `url(${this.props.details.applicantSignature})`,
                maxWidth: 500,
                padding: 10,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                backgroundImage: `url(${this.details.applicantSignature})`,
                maxWidth: 500,
                padding: 10,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "fifth.main",
                textAlign: "center",
              }}
            >
              SIGNATURE OF APPLICANT/ TAXPAYER OVER PRINTED NAME
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}

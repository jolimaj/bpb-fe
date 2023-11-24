import React, { Component } from "react";
import { Grid, Typography, Divider } from "@mui/material";

export default class Tab2 extends Component {
  constructor(props) {
    console.log("🚀 ~ file: tab2.js:6 ~ Tab2 ~ constructor ~ props:", props);
    super(props);
    this.state = {};
    this.details = props.details?.applicantDetails;
    this.otherInfo = this.details?.OtherInfos[0];
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
              Business Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.businessAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Postal Code:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.businessPostalCode}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Telephone No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.businessTelephone}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Mobile No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.businessMobile}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Email Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.businessEmail}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Owners Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.ownersAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Postal Code:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.ownersPostalCode}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Telephone No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.ownersTelephone}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Mobile No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.ownersMobile}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Email Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.ownersEmail}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Divider light />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              In case of emergency, povide name of contact person:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="body2">
              {this.otherInfo?.emergencyPerson}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Telephone/Mobile No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.emergencyMobile}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.emergencyAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Divider light />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Business Area:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {`${this.otherInfo?.businessArea} (in sq m.)`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                textTransform: "upperCase",
                color: "primary.main",
              }}
            >
              Total No. Employees in Establishment
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Male:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.maleEmployee}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Female:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.femaleEmployee}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              No. of Employees Residing within LGU:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.lguEmployee}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Divider light />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                textTransform: "upperCase",
                color: "primary.main",
              }}
            >
              IF BUSINESS PLACE IS RENTED
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Lessor's Full Name:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.lessorName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Lessor's Full Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.lessorAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Lessor's Full Telephone/Mobile No.:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.lessorMobile}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Name of the building rented:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.buildingName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Address of the Building being Rented:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.buildingAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "fifth.main" }}
            >
              Monthly Rental:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body2">
              {this.otherInfo?.monthlyRental}
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}

import React, { Component } from "react";
import { Grid, Typography, TextField, Box, Button } from "@mui/material";

export default class RequiremenstInfo extends Component {
  constructor(props) {
    super(props);
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
          REQUIRMENTS:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Barangay Business Clearance
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              DTI/SEC/CDA Registration
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Locational Clearance
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Lease Contract (if applicable)
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Picture 2x2 (2pcs.)
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              SSS Cert, of Compliance
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
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
              If Applicable
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              National Agency Accredation
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Market Clearance (for market vendors)
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Home Owner's Clearance
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
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
              For Verification
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Community Tax Certificate (CEDULA)
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Renovation / Building Permit
            </Typography>
            <Button variant="contained" component="label">
              Upload Photo/PDF
              <input type="file" hidden />
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

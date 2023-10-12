import React, { Component } from "react";
import dayjs from "dayjs";
import { Grid, Typography, TextField, Box } from "@mui/material";

export default class BFP extends Component {
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
          III. CITY / MUNICIPALITY FIRE STATION SECTION
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
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
              (TO BE FILLED UP BY THE APPLICANT / OWNER){" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="applicantName"
              name="applicantName"
              label="Name of Applicant /  Owner"
              fullWidth
              autoComplete="applicantName"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="nameOfBusiness"
              name="nameOfBusiness"
              label="Name of Business"
              fullWidth
              autoComplete="nameOfBusiness"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="floorArea"
              name="floorArea"
              label="Total Floor Area"
              fullWidth
              required
              autoComplete="floor-area"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="contactNumber"
              name="contactNumber"
              label="Contact No."
              fullWidth
              required
              autoComplete="contact-no"
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="address"
              name="address"
              label="Address of Establishment"
              fullWidth
              autoComplete="address"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

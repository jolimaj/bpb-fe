import React, { Component } from "react";
import { Grid, Typography, TextField, Box } from "@mui/material";

export default class OtherInformation extends Component {
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
          OTHER INFORMATION:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="businessAddress"
              name="businessAddress"
              label="Business Address"
              fullWidth
              required
              autoComplete="business-address"
              variant="outlined"
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
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="guardian"
              name="guardian"
              label="In case of emergency, povide name of contact person"
              fullWidth
              required
              autoComplete="guardian"
              variant="outlined"
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="guardianAddress"
              name="guardianAddress"
              label="Address"
              fullWidth
              autoComplete="guardian-address"
              variant="outlined"
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
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

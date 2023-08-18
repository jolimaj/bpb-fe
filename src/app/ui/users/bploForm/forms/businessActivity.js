import React, { Component } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  Card,
  CardMedia,
} from "@mui/material";

export default class BusinessActivity extends Component {
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
          Business Activity:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              id="line1"
              name="line1"
              label="1"
              fullWidth
              required
              autoComplete="line1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="line2"
              name="line2"
              label="2"
              fullWidth
              autoComplete="line2"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="line3"
              name="line3"
              label="3"
              fullWidth
              autoComplete="line3"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              id="units1"
              name="units1"
              label="1"
              fullWidth
              required
              autoComplete="units1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="units2"
              name="units2"
              label="2"
              fullWidth
              autoComplete="units2"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="units3"
              name="units3"
              label="3"
              fullWidth
              autoComplete="units3"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              id="capital1"
              name="capital1"
              label="1"
              fullWidth
              required
              autoComplete="capital1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="capital2"
              name="capital2"
              label="2"
              fullWidth
              autoComplete="capital2"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="capital3"
              name="capital3"
              label="3"
              fullWidth
              autoComplete="units3"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                mb: 2,
                textAlign: "center",
              }}
            >
              I DECLARE UNDER PENALTY OF PERJURY that the foregoing information
              are true based on my personal knowledge and authentic records.
              Further, I agree to comply with the regulatory requirement And
              other defiiencies within 30 days from release f business permit.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button variant="contained" component="label">
              UPLOAD SIGNATURE OF APPLICANT/ TAXPAYER OVER PRINTED NAME
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 70 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}></Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="position"
              name="position"
              label="POSITION/TITLE"
              fullWidth
              autoComplete="position"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

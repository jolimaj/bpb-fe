import React, { Component } from "react";
import {
  Grid,
  Typography,
  Divider,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Table,
  Paper,
  Box,
} from "@mui/material";

export default class Tab3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.details = props?.details?.applicantDetails;
    this.businessActivity = this.details?.BusinessActivities;
  }

  render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Line of Business</TableCell>
                    <TableCell align="center">No. of Units</TableCell>
                    {this.details.type === 1 ? (
                      <TableCell align="center">capitalization</TableCell>
                    ) : (
                      <>
                        <TableCell align="center">Essention Gross</TableCell>
                        <TableCell align="center">
                          Non-Essention Gross
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.businessActivity?.map((row) => (
                    <TableRow
                      key={row.lineOfBusiness}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {this.details.type === 1 ? (
                        <>
                          <TableCell align="center">
                            {row.lineOfBusiness}
                          </TableCell>
                          <TableCell align="center">{row.noOfUnits}</TableCell>
                          <TableCell align="center">
                            {row.capitalization}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell align="center">
                            {row.lineOfBusiness}
                          </TableCell>
                          <TableCell align="center">{row.noOfUnits}</TableCell>
                          <TableCell align="center">
                            {row.essentialGross}
                          </TableCell>
                          <TableCell align="center">
                            {row.nonEssentialGross}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Divider light />
          </Grid>
          <Grid item xs={12} sm={12} md={6}></Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                backgroundImage: `url(${this.details?.applicantSignature})`,
                maxWidth: 500,
                padding: 10,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}></Grid>
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

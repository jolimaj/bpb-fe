import React, { Component } from "react";
import { Paper, Grid, Container } from "@mui/material";
import TrackingContent from "./trackingContent";

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                height: "auto",
              }}
            >
              <TrackingContent route={this.props.route} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default Page1;

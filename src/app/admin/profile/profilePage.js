import React, { Component } from "react";
import {
  Paper,
  Grid,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { AxiosInterceptor } from "../../ui/common/interceptor";
import ServiceConfig from "../../ui/common/service-config";
import { SERVICES } from "../../ui/common/constant/services-constant";

class ProfilePage extends Component {
  #axios;
  #serviceConfig;

  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      email: "",
      mobile: "",
      role: 0,
    };
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.ADMIN)
    ).axios;
    this.updateUserData = this.updateUserData.bind(this);
  }
  async componentDidMount() {
    const record = await this.getUserData();
    this.setState({
      fName: record?.firstName,
      lName: record?.lastName,
      email: record?.email,
      mobile: record?.mobile,
      role: record?.roleID,
    });
  }

  async getUserData() {
    try {
      const req = await this.#axios.get(`/profile`, {
        withCredentials: true,
      });
      return req.data;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        if (typeof window !== "undefined") window.location.href = "/signin";
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }

  async updateUserData() {
    try {
      await this.#axios.put(`/profile`, this.state);
      if (typeof window !== "undefined") window.location.reload(true);
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        if (typeof window !== "undefined") window.location.href = "/signin";
      }
      this.setState({ errorResponse: error.message });
      return error;
    }
  }
  render() {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} md={4} lg={4}>
            <Typography
              variant="h6"
              component="div"
              color="primary.main"
              sx={{ fontWeight: "bold" }}
            >
              Profile Information
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Update your account's profile Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "auto",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={8}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="fName"
                    label="First Name"
                    type="text"
                    fullWidth
                    disabled
                    variant="outlined"
                    value={this.state.role === 1 ? "" : this.state.fName}
                  />
                </Grid>{" "}
                <Grid item xs={12} md={8} lg={8}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled
                    value={this.state.role === 1 ? "" : this.state.lName}
                  />
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    disabled
                    variant="outlined"
                    value={this.state.email}
                  />
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="mobile"
                    label="Mobile Number"
                    type="number"
                    fullWidth
                    disabled={this.state.role === 1}
                    variant="outlined"
                    value={this.state.role === 1 ? this.state.mobile : ""}
                    onChange={(e) => {
                      this.setState({ mobile: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  marginLeft: "auto",
                }}
                disabled={this.state.role === 1}
                onClick={this.updateUserData}
              >
                Save
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default ProfilePage;

import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import { INITIAL_ACCOUNT } from "../common/constant/endpoints/users";

import { AxiosInterceptor } from "../common/interceptor";
import ServiceConfig from "../common/service-config";
import { errorResponse } from "../common/erroResponse";
import { SERVICES } from "../common/constant/services-constant";

const cookies = new Cookies();

class SignIn extends Component {
  #pathName;
  #size;
  #axios;
  #serviceConfig;

  constructor(props) {
    super(props);

    this.state = {
      fName: "",
      mName: "",
      lName: "",
      password: "",
      email: "",
      errorMessage: "",
      session: cookies.get("session") || null,
    };
    this.#pathName = props.route;
    this.#size = this.#pathName === INITIAL_ACCOUNT.SIGNIN ? 12 : 6;
    //button
    this.handleSubmit = this.handleSubmit.bind(this);

    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
  }

  async handleSignUp() {
    try {
      const { password, email, fName, lName, mName } = this.state;
      const req = await this.#axios.post(`/sign-up`, {
        password,
        email,
        fName,
        lName,
        mName,
      });
      return req;
    } catch (error) {
      const response = errorResponse(error.response.data);
      this.setState(() => ({
        errorMessage: response,
      }));
    }
  }
  async handlePageRedirect(roleID) {
    switch (roleID) {
      case 1:
        window.location.href = "/admin";
        break;
      case 2:
        window.location.href = "/account";
        break;
      default:
        window.location.href = "/account/department";
        break;
    }
  }
  async handleSignIn() {
    console.log(
      "🚀 ~ file: formIndex.js:94 ~ SignIn ~ handleSignIn ~ this.props:",
      this.props
    );
    try {
      const { password, email } = this.state;
      const res = await this.#axios.post(`/sign-in`, { password, email });
      cookies.set("session", JSON.stringify(res.data.session));
      this.setState({ session: JSON.stringify(res.data.session) });
      // window.localStorage.setItem("session", JSON.stringify(res.data.session));
      window.location.href = "/admin";
    } catch (error) {
      const response = errorResponse(error.response);
      this.setState({ errorMessage: response });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.#pathName === INITIAL_ACCOUNT.SIGNIN) {
      await this.handleSignIn();
    } else {
      await this.handleSignUp();
    }
  }

  render() {
    return (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://res.cloudinary.com/dm1hejbuu/image/upload/v1691674279/endUser/landing-bg_ova4kd.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 2, height: 80, width: 80, bgcolor: "secondary" }}
              src="https://res.cloudinary.com/dm1hejbuu/image/upload/v1691674279/endUser/SARIAYA-SEAL1_etumcp.jpg"
            />

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  {this.state.errorMessage ? (
                    <Alert
                      severity="error"
                      style={{ textTransform: "capitalize" }}
                    >
                      {this.state.errorMessage}
                    </Alert>
                  ) : null}
                </Grid>
                {this.#pathName !== INITIAL_ACCOUNT.SIGNIN ? (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fName"
                        label="First Name"
                        name="fName"
                        autoComplete="fName"
                        autoFocus
                        onChange={(e) => {
                          this.setState({ fName: e.target.value });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="mName"
                        label="Middle Name"
                        name="mName"
                        autoComplete="mName"
                        autoFocus
                        onChange={(e) => {
                          this.setState({ mName: e.target.value });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="lName"
                        label="Last Name"
                        name="lName"
                        autoComplete="lName"
                        autoFocus
                        onChange={(e) => {
                          this.setState({ lName: e.target.value });
                        }}
                      />
                    </Grid>
                  </>
                ) : null}
                <Grid item xs={12} sm={this.#size} md={this.#size}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={this.#size} md={this.#size}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
              {this.#pathName === INITIAL_ACCOUNT.SIGNIN ?? (
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => this.handleSubmit(e)}
              >
                {this.#pathName === INITIAL_ACCOUNT.SIGNIN
                  ? "Sign In"
                  : "Sign Up"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography
                    variant="body2"
                    color="secondary"
                    align={
                      this.#pathName === INITIAL_ACCOUNT.SIGNIN
                        ? "left"
                        : "center"
                    }
                  >
                    <Link
                      href={
                        this.#pathName === INITIAL_ACCOUNT.SIGNIN
                          ? "/signin/forgotPassword"
                          : "/signin"
                      }
                      variant="body2"
                    >
                      {this.#pathName === INITIAL_ACCOUNT.SIGNIN
                        ? "Forgot password?"
                        : "Already have an account? Sign In"}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  {this.#pathName === INITIAL_ACCOUNT.SIGNIN ? (
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  ) : null}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  }
}
export default SignIn;

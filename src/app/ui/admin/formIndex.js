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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { INITIAL_ACCOUNT } from "../common/constant/endpoints/users";
import Modal from "../common/component/dialog";

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
      mobile: "",
      errorMessage: "",
      modal: false,
      uuid: null,
      signUpSucess: false,
      showPassword: false,
      expired: "",
      alert:
        "Congratulations! You've successfully register. Please open the email and click on the provided account activation link. If you do not see the email in your inbox, please check your spam or junk folder..",
      session: cookies.get("session") || null,
    };
    this.#pathName = props.route;
    this.#size = this.#pathName === INITIAL_ACCOUNT.SIGNIN ? 12 : 6;
    //button
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
  }
  componentDidMount() {
    // this.handleActivate();
  }
  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  async handleActivate() {
    try {
      const uuid = this.props.params.uuid;
      this.setState({ uuid: `${this.props.params.signinId}/${uuid}` });
      await this.#axios.put(`/sign-in/${this.props.params.signinId}/${uuid}`);
      this.setState({ modal: true });
    } catch (error) {
      const response = errorResponse(error.response);
      this.setState({ modal: true, expired: response });

      if (response === "This link was already expired.")
        this.props.redirect("/signin");
      return response;
    }
  }
  async handleSignUp() {
    const { password, email, fName, lName, mName, mobile } = this.state;
    if (!mobile.substring(0, 1) === "9") {
      this.setState({ errorMessage: "Incorrect mobile Number" });
    }

    try {
      const req = await this.#axios.post(`/sign-up`, {
        password,
        email,
        fName,
        lName,
        mName,
        mobile,
        roleID: 2,
      });
      this.setState({ modal: true, signUpSucess: true });

      return req;
    } catch (error) {
      const response = errorResponse(error.response);
      this.setState({ errorMessage: response });
    }
  }
  handlePageRedirect(roleID) {
    let pathname;
    switch (roleID) {
      case 1:
        pathname = "/admin";
        break;
      case 2:
        pathname = "/account";
        break;
      case 3:
        pathname = "/account/departments";
        break;
    }
    this.props.saveTerms();
    this.props.redirect(pathname);
  }
  async handleSignIn() {
    try {
      const { password, email } = this.state;
      const res = await this.#axios.post(
        `/sign-in`,
        { password, email },
        {
          withcredentials: true,
        }
      );
      // this.setState({ session });
      this.handlePageRedirect(res.data.roleID);
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
      <>
        {this.#pathName === INITIAL_ACCOUNT.SIGNIN ||
        this.#pathName === INITIAL_ACCOUNT.SIGNUP ? (
          <Grid container component="main" sx={{ height: "110vh" }}>
            <CssBaseline />
            {this.state.signUpSucess && (
              <Modal
                openModal={this.state.modal}
                alertMessage={this.state.alert}
                pathName={this.#pathName}
                params={this.props.params}
                redirect={this.props.redirect}
              />
            )}
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
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
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
                            InputLabelProps={{
                              shrink: true,
                            }}
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
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => {
                              this.setState({ mName: e.target.value });
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            margin="normal"
                            fullWidth
                            id="lName"
                            label="Last Name"
                            name="lName"
                            autoComplete="lName"
                            autoFocus
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => {
                              this.setState({ lName: e.target.value });
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="mobile"
                            label="Mobile Number"
                            type="number"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              maxLength: 7,
                            }}
                            variant="outlined"
                            onChange={(e) => {
                              this.setState({ mobile: e.target.value });
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
                        autoFocus
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                        type={this.state.showPassword ? "text" : "password"}
                        id="password"
                        onChange={(e) => {
                          this.setState({ password: e.target.value });
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                edge="end"
                              >
                                {this.state.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
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
                          underline="none"
                        >
                          {this.#pathName === INITIAL_ACCOUNT.SIGNIN
                            ? "Forgot password?"
                            : "Already have an account? Sign In"}
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      {this.#pathName === INITIAL_ACCOUNT.SIGNIN ? (
                        <Link href="/signup" variant="body2" underline="none">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      ) : null}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Modal
              openModal={this.state.modal}
              alertMessage="Congratulations! You've successfully activate your account. Your
            account is now secure and ready for you to access all the features
            and benefits."
              uuid={this.state.uuid}
              pathName={this.#pathName}
              params={this.props.params}
            />
            <Grid
              item
              xs={false}
              sm={12}
              md={12}
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
          </Grid>
        )}
      </>
    );
  }
}
export default SignIn;

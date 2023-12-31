import React, { Component } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Modal from "../../../../common/component/dialog";

import { INITIAL_ACCOUNT } from "../../../../common/constant/endpoints/users";
import { Helpers } from "../../../../common/helpers";

import { AxiosInterceptor } from "../../../../common/interceptor";
import ServiceConfig from "../../../../common/service-config";
import { SERVICES } from "../../../../common/constant/services-constant";
import { errorResponse } from "../../../../common/erroResponse";

class PasswordService extends Component {
  #pathName;
  #params;
  #serviceConfig;
  #axios;

  constructor(props) {
    super(props);
    this.#pathName = props.route;
    this.#params =
      props?.params?.id ??
      props?.params.forgotPasswordId ??
      props?.params.signinId;
    this.state = {
      confirmPassword: "",
      password: "",
      email: "",
      showPassword: false,
      showConfirmPassword: false,
      errorResponse: "",
      expired: "",
      modal: false,
      timePassed: false,
      uuid: "",
      alert:
        this.#pathName === INITIAL_ACCOUNT.FORGOT
          ? "Open the email and click on the provided password reset link. If you do not see the email in your inbox, please check your spam or junk folder."
          : this.#pathName ===
            `${INITIAL_ACCOUNT.SIGNIN}/${this.#params}/${
              this.props.params.uuid
            }/activate`
          ? "Your account has been successfully activated!"
          : "Your password has been successfully updated. For security reasons, please remember your new password and do not share it with anyone. If you have any questions or concerns, please contact our support team. Thank you for choosing our services!",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleClickShowConfirmPassword =
      this.handleClickShowConfirmPassword.bind(this);
    this.handleSendLink = this.handleSendLink.bind(this);
    this.handleCheckExpiry = this.handleCheckExpiry.bind(this);

    this.helpers = new Helpers();
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
  }

  async componentDidMount() {
    if (!this.#pathName === INITIAL_ACCOUNT.FORGOT) {
      await this.handleCheckExpiry();
    }
    if (
      this.#pathName ===
      `${INITIAL_ACCOUNT.SIGNIN}/${this.#params}/${
        this.props.params.uuid
      }/activate`
    ) {
      await this.#axios.put(`/sign-in/activate/${this.#params}`);
      this.setState({ modal: true });
    }
    setTimeout(() => {
      if (this.state.timePassed) this.props.redirect("/signin");
    }, 1000);
  }
  async handleCheckExpiry() {
    const { id, uuid } = this.props.params;
    this.setState({ uuid, params: id });
    try {
      await Promise.all([
        this.#axios.get(`/notifParams/${uuid}`),
        this.#axios.put(`/sign-in/activate/${this.#params}`),
      ]);
    } catch (error) {
      const response = errorResponse(error.response);
      this.setState({ modal: true, expired: response });
      return response;
    }
  }
  async handleSendLink(e) {
    e.preventDefault();
    try {
      await this.#axios.put(`/sign-in/forgotPassword`, {
        email: this.state.email,
      });
      this.setState({ modal: true });
    } catch (error) {
      const response = errorResponse(error.response);

      this.setState({
        errorResponse: response,
        timePassed: true,
      });

      return response;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const erroResponse = this.helpers.compareField(this.state);
      if (erroResponse) this.setState({ erroResponse });
      await this.#axios.patch(`/sign-in/forgotPassword/${this.#params}`, {
        password: this.state.password,
      });
      this.props.redirect("/signin");
    } catch (error) {
      const response = errorResponse(error.response);

      this.setState({
        errorResponse: response,
      });
    }
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  handleClickShowConfirmPassword() {
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  }
  handleCancel() {
    this.props.redirect("/signin");
  }
  render() {
    return (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Modal
          openModal={this.state.modal}
          uuid={this.state.uuid}
          alertMessage={
            this.state.expired ? this.state.expired : this.state.alert
          }
          pathName={this.#pathName}
          params={this.#params}
          redirect={this.props.redirect}
        />
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
            {this.#pathName.includes(
              `${INITIAL_ACCOUNT.FORGOT}/${this.#params}`
            ) || this.#pathName.includes(INITIAL_ACCOUNT.PASSWORD_CREATION) ? (
              <Box
                component="form"
                noValidate
                onSubmit={this.handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    {this.state.errorResponse ? (
                      <Alert severity="error">
                        {this.state?.errorResponse || "Invalid URL"}
                      </Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="New Password"
                      type={this.state.showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
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
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="confirmpassword"
                      label="Confirm Password"
                      type={
                        this.state.showConfirmPassword ? "text" : "password"
                      }
                      id="confirmpassword"
                      autoComplete="confirm-password"
                      onChange={(e) => {
                        this.setState({ confirmPassword: e.target.value });
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {this.state.showConfirmPassword ? (
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            ) : (
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="body2" color="#fc8800" align="center">
                      Please enter your email address associated with your
                      account. We will send you a link to reset your password.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    {this.state.errorResponse ? (
                      <Alert
                        severity="error"
                        style={{ textTransform: "capitalize" }}
                      >
                        {this.state.errorResponse}
                      </Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={(e) => this.handleSendLink(e)}
                >
                  Send Reset Link
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    );
  }
}
export default PasswordService;

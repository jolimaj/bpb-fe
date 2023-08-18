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

class SignIn extends Component {
  #pathName;
  #params;

  constructor(props) {
    super(props);
    this.#pathName = props.route;
    this.#params = props.params.forgotPasswordId;
    this.state = {
      confirmPassword: "",
      password: "",
      email: "",
      showPassword: false,
      showConfirmPassword: false,
      errorMessage: "",
      modal: false,
      alert:
        this.#pathName === INITIAL_ACCOUNT.FORGOT
          ? "Open the email and click on the provided password reset link. If you do not see the email in your inbox, please check your spam or junk folder."
          : "Your password has been successfully updated. For security reasons, please remember your new password and do not share it with anyone. If you have any questions or concerns, please contact our support team. Thank you for choosing our services!",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleClickShowConfirmPassword =
      this.handleClickShowConfirmPassword.bind(this);
    this.handleSendLink = this.handleSendLink.bind(this);

    this.helpers = new Helpers();
  }

  async handleSendLink(e) {
    e.preventDefault();
    this.setState({ modal: true });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.#pathName.includes(`${INITIAL_ACCOUNT.FORGOT}/${this.#params}`)) {
      const errorMessage = this.helpers.compareField(this.state);
      this.setState({ errorMessage });
      this.setState({ modal: true });
    }
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  handleClickShowConfirmPassword() {
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  }
  handleCancel() {
    window.location.href = INITIAL_ACCOUNT.SIGNIN;
  }
  render() {
    return (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Modal
          openModal={this.state.modal}
          alertMessage={this.state.alert}
          pathName={this.#pathName}
          params={this.#params}
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
            {!this.#pathName.includes(
              `${INITIAL_ACCOUNT.FORGOT}/${this.#params}`
            ) ? (
              <Box
                component="form"
                noValidate
                onSubmit={this.handleSendLink}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="body2" color="#fc8800" align="center">
                      Please enter your email address associated with your
                      account. We will send you a link to reset your password.
                    </Typography>
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
                >
                  Send Reset Link
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Box
                component="form"
                noValidate
                onSubmit={this.handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    {this.state.errorMessage ? (
                      <Alert severity="error">{this.state.errorMessage}</Alert>
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
                      name="password"
                      label="Confirm Password"
                      type={
                        this.state.showConfirmPassword ? "text" : "password"
                      }
                      id="password"
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
            )}
          </Box>
        </Grid>
      </Grid>
    );
  }
}
export default SignIn;

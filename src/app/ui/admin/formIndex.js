import React, { Component } from "react";
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
} from "@mui/material";
import { INITIAL_ACCOUNT } from "../common/constant/endpoints/users";

class SignIn extends Component {
  #pathName;
  #size;

  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      mName: "",
      lName: "",
      password: "",
      email: "",
      errorMessage: "",
    };
    this.#pathName = props.route;
    this.#size = this.#pathName === INITIAL_ACCOUNT.SIGNIN ? 12 : 6;

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ errorMessage: "s" });
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

            <Box
              component="form"
              noValidate
              onSubmit={this.handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                {this.#pathName !== INITIAL_ACCOUNT.SIGNIN ? (
                  <>
                    <Grid item xs={12} sm={12} md={12}>
                      {this.state.errorMessage ? (
                        <Alert severity="error">
                          {this.state.errorMessage}
                        </Alert>
                      ) : null}
                    </Grid>
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

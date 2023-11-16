import React, { Component } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  IconButton,
  Alert,
} from "@mui/material";

import {
  CloudUpload as CloudUploadIcon,
  FilePresentRounded as FilePresentRoundedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { AxiosInterceptor } from "../../../common/interceptor";
import ServiceConfig from "../../../common/service-config";
import { SERVICES } from "../../../common/constant/services-constant";
import { errorResponse } from "@/app/ui/common/erroResponse";

export default class SignatureForm extends Component {
  #formData;
  #serviceConfig;
  #axios;
  #axiosPermit;
  constructor(props) {
    super(props);
    this.#formData = new FormData();
    this.state = {
      selectedFile: "",
      fileName: "",
      progress: 10,
      applicantSignature: "",
      applicantPosition: "",
      errorMessage: "",
      response: "",
      signatureData: {},
    };

    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
    this.#axiosPermit = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.basicFormData.responseCode === "LOGIN_FIRST") {
      this.props.redirect("/signin");
    }
  }
  async handleSubmit() {
    if (this.state.applicantSignature === "") {
      this.setState({
        errorMessage: "Applicant Signature is Required",
      });
    }
    if (this.state.applicantPosition === "") {
      this.setState({
        errorMessage: "Applicant Position is Required",
      });
    }

    if (
      this.state.applicantPosition === "" &&
      this.state.applicantSignature === ""
    ) {
      this.setState({
        errorMessage: "Applicant Signature and Applicant Position is Required",
      });
    } else {
      const { applicantSignature, applicantPosition } = this.state;
      this.setState({
        response: "valid",
        signatureData: {
          applicantSignature,
          applicantPosition,
          response: "valid",
        },
      });
    }
  }
  render() {
    return (
      <Box component="form" p={2} onSubmit={this.handleSubmit}>
        <Typography
          variant="h5"
          gutterBottom
          color="tertiary.main"
          sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 5 }}
        >
          Finalize Application:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            {this.state.errorMessage && (
              <Alert severity="error" style={{ textTransform: "capitalize" }}>
                {this.state.errorMessage}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
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
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <TextField
              id="position"
              name="position"
              label="APPLICANT POSITION/TITLE"
              fullWidth
              autoComplete="position"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Applicant Signature
            </Typography>
            <Box
              width="500"
              height="500"
              sx={{
                my: 2,
                p: 5,
                border: "2px dashed grey",
                borderRadius: 5,
                alignContent: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                variant="contained"
                component="label"
                sx={{
                  width: 100,
                  height: 100,
                }}
              >
                <CloudUploadIcon fontSize="large" color="primary" />
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg, .pdf"
                  hidden
                  onChange={(e) => {
                    this.setState({ applicantSignature: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.applicantSignature && (
              <Box
                sx={{
                  p: 2,
                  alignContent: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FilePresentRoundedIcon
                  color="primary"
                  fontSize="medium"
                  mr={2}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    marginRight: 2,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {this.state.applicantSignature.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ applicantSignature: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

import React, { Component, createRef } from "react";
import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";

import BasicInformation from "./forms/basic";
import OtherInformation from "./forms/otherInfo";
import BusinessActivityInformation from "./forms/businessActivity";
import RequirementsList from "./forms/requirements";
import BFPForms from "./forms/bfpForms";
import SignatureForm from "./forms/signature";

import { AxiosInterceptor } from "../../common/interceptor";
import ServiceConfig from "../../common/service-config";
import { errorResponse } from "../../common/erroResponse";
import { SERVICES } from "../../common/constant/services-constant";
class ServiceForm extends Component {
  #steps;
  #axios;
  #serviceConfig;
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      userData: {},
      basicInfo: {},
      otherInfo: {},
      businessActivity: {},
      bfpFormData: {},
      requirement: {},
      signatures: {},
      errorPayload: "",
    };
    this.payload = createRef();
    this.#steps = [
      "Basic Information",
      "Other Information",
      "Business Activity",
      "Municipality Fire Station Section",
      "Requirements",
      "Finalize Application",
    ];
    this.getStepContent = this.getStepContent.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.ADMIN)
    ).axios;
  }

  async componentDidMount() {
    await this.getUserData();
  }
  async getUserData() {
    try {
      await this.#axios.get(`/profile`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        // window.location.href = "/signin";
      }
      return error;
    }
  }
  getStepContent(step) {
    switch (step) {
      case 0:
        return <BasicInformation ref={this.payload} />;
      case 1:
        return (
          <OtherInformation
            ref={this.payload}
            basicFormData={this.state.basicInfo}
          />
        );
      case 2:
        return (
          <BusinessActivityInformation
            ref={this.payload}
            basicFormData={this.state.basicInfo}
          />
        );
      case 3:
        return (
          <BFPForms ref={this.payload} basicFormData={this.state.basicInfo} />
        );
      case 4:
        return (
          <RequirementsList
            ref={this.payload}
            basicFormData={this.state.basicInfo}
          />
        );
      case 5:
        return (
          <SignatureForm
            ref={this.payload}
            basicFormData={this.state.basicInfo}
          />
        );
      default:
        return <BasicInformation ref={this.payload} />;
    }
  }
  handleNext() {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }

  async handleSubmit() {
    try {
      const { applicantSignature, applicantPosition } = this.state;
      const response = await this.#axios.post(
        "/services/businessPermit",
        {
          ...this.state.basicInfo,
          ...this.state.otherInfo,
          ...this.state.businessActivity,
          ...this.state.requirement,
          ...this.state.signatures,
          applicantSignature,
          applicantPosition,
        },
        {
          withCredentials: true,
        }
      );
      this.setState({ response: response.data });
    } catch (error) {
      let response;
      response = errorResponse(error.response);
      this.setState({ errorMessage: response });
    }
  }

  handleBack() {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }

  async handleClick() {
    if (this.state.activeStep === 5) {
      await this.handleSubmit();
    } else {
      await this.handleValidate();
    }
  }

  async handleValidate() {
    await this.payload.current.handleSubmit();

    setTimeout(() => {
      if (
        this.payload.current.state.response === "valid" &&
        this.payload.current.state?.basicFormData
      ) {
        this.setState({
          basicInfo: this.payload.current.state?.basicFormData,
        });
        this.handleNext();
      }

      if (
        this.payload.current.state.response === "valid" &&
        this.payload.current.state?.otherInfoData
      ) {
        this.setState({
          otherInfo: this.payload.current.state?.otherInfoData,
        });
        this.handleNext();
      }
      if (
        this.payload.current.state.response === "valid" &&
        this.payload.current.state?.businessActivityData
      ) {
        this.setState({
          businessActivity: this.payload.current.state?.businessActivityData,
        });
        this.handleNext();
      }
      if (
        this.payload.current.state.response === "valid" &&
        this.payload.current.state?.bfpFormData
      ) {
        this.setState({
          bfpFormData: this.payload.current.state?.bfpFormData,
        });
        this.handleNext();
      }
      if (
        this.payload.current.state.response === "valid" &&
        this.payload.current.state?.requirementData
      ) {
        this.setState({
          requirement: this.payload.current.state?.requirementData,
        });
        this.handleNext();
      }
      if (
        this.payload.current.state.response === "valid" &&
        this.payload.current.state?.signatureData
      ) {
        this.setState({
          signatures: this.payload.current.state?.signatureData,
        });
        this.handleNext();
      }
    }, 1000);
  }

  handleReload() {
    window.location.reload();
  }

  handleCheckBasic() {
    this.state;
  }

  render() {
    return (
      <>
        <Container component="main" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6, sm: 5 }, p: { xs: 2, md: 3, sm: 5 } }}
          >
            <Box p={5}>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Application form for Business Permit
              </Typography>
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="fifth.main"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {`Tax Year ${new Date().getFullYear()}`}
              </Typography>
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="fifth.main"
                sx={{
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}
              >
                SARIAYA, Quezon
              </Typography>

              <Typography
                variant="subtitle"
                align="left"
                color="fifth.main"
                sx={{
                  fontWeight: "bold",
                }}
              >
                <ol>
                  <li>
                    Provide accurate information and print legibly to avoid
                    delays. Incomplete application from will be returned to the
                    applicant.
                  </li>
                  <li>
                    Ensure that all documents attached to this form (if any) are
                    complete and properly filled out.
                  </li>
                </ol>
              </Typography>
            </Box>

            <Stepper activeStep={this.state.activeStep} sx={{ pt: 3, pb: 5 }}>
              {this.#steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography
                      varian="p"
                      color={
                        index === this.state.activeStep
                          ? "primary"
                          : "allVariants"
                      }
                      sx={{
                        fontWeight:
                          this.state.activeStep === index ? "bold" : "none",
                      }}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {this.state.response ? (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary"
                  textAlign="center"
                  fontWeight="bold"
                >
                  "Thank you for submitting your application."
                </Typography>
                <Typography variant="subtitle1">
                  Your application is under review. We will notify you of the
                  outcome. We will contact you regarding the next steps. You can
                  check the status of your application on our website
                </Typography>
                <Button
                  variant="contained"
                  onClick={this.handleReload}
                  sx={{ mt: 3, ml: 1, textAlign: "center" }}
                >
                  Back
                </Button>
              </>
            ) : (
              <>
                {this.getStepContent(this.state.activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* {this.state.activeStep !== 0 && (
                    <Button onClick={this.handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )} */}

                  <Button
                    variant="contained"
                    onClick={this.handleClick}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {this.state.activeStep === 5 ? "Submit" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Container>
      </>
    );
  }
}

export default ServiceForm;

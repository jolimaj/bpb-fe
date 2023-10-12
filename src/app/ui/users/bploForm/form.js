import React, { Component } from "react";
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

class ServiceForm extends Component {
  #steps;
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
    this.#steps = [
      "Basic Information",
      "Other Information",
      "Business Activity",
      "Municipality Fire Station Section",
      "Requirements",
    ];
    this.getStepContent = this.getStepContent.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  getStepContent(step) {
    switch (step) {
      case 0:
        return <BasicInformation />;
      case 1:
        return <OtherInformation />;
      case 2:
        return <BusinessActivityInformation />;
      case 3:
        return <BFPForms />;
      case 4:
        return <RequirementsList />;
      default:
        return <BasicInformation />;
    }
  }
  handleNext() {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }
  handleBack() {
    this.setState({ activeStep: this.state.activeStep - 1 });
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
            {this.state.activeStep === this.#steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>
                {this.getStepContent(this.state.activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {this.state.activeStep !== 0 && (
                    <Button onClick={this.handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={this.handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {this.state.activeStep > this.#steps.length
                      ? "Submit"
                      : "Next"}
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

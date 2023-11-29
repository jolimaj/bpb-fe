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
  Grid,
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
      innerWidth: 1900,
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
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
  }

  componentDidMount() {
    this.setState({ innerWidth: window.innerWidth });
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <BasicInformation
            ref={this.payload}
            pathName={this.props?.pathName}
            renewData={this.props?.renewData}
          />
        );
      case 1:
        return (
          <OtherInformation
            ref={this.payload}
            basicFormData={this.state.basicInfo}
            pathName={this.props?.pathName}
            renewData={this.props?.renewData}
          />
        );
      case 2:
        return (
          <BusinessActivityInformation
            ref={this.payload}
            basicFormData={this.state.basicInfo}
            pathName={this.props?.pathName}
            renewData={this.props?.renewData}
          />
        );
      case 3:
        return (
          <BFPForms
            ref={this.payload}
            basicFormData={this.state.basicInfo}
            pathName={this.props?.pathName}
            renewData={this.props?.renewData}
          />
        );
      case 4:
        return (
          <RequirementsList
            ref={this.payload}
            basicFormData={this.state.basicInfo}
            pathName={this.props?.pathName}
            renewData={this.props?.renewData}
          />
        );
      case 5:
        return (
          <SignatureForm
            ref={this.payload}
            basicFormData={this.state.basicInfo}
            pathName={this.props?.pathName}
            renewData={this.props?.renewData}
          />
        );
      default:
        return (
          <BasicInformation
            ref={this.payload}
            pathName={this.props?.pathName}
            renewData={this.props?.renewData}
          />
        );
    }
  }
  handleNext() {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }

  handleMapper(payload, requirement) {}

  async handleSubmit() {
    try {
      const { applicantSignature, applicantPosition } =
        this.payload.current.state;

      const updatePayload = {
        ...this.state.basicInfo,
        ...this.state.businessActivity,
        ...this.state.signatures,
        ...this.state.otherInfo,
        applicantPosition,
        applicantSignature,
        type: "2",
        updatedAt: new Date(),
      };
      const newPayload = {
        ...this.state.basicInfo,
        ...this.state.businessActivity,
        ...this.state.requirement,
        ...this.state.otherInfo,
        applicantPosition,
        applicantSignature,
        type: "1",
        queueNo: "",
        qrCode: "",
      };
      const {
        brgyBusinessClearance,
        dtiReg,
        locationalClearance,
        leaseContract,
        picture,
        certOfCompliance,
        nationalAgencyAccredetation,
        marketClearance,
        homeOwnersClearance,
        cedula,
        buidingpermit,
        sanityPermit,
        menroCert,
        fireSafetyCert,
        water,
        mtoAssestmentRecord,
        mtoPayment,
      } = this.state?.requirement;
      const formData = new FormData();
      const {
        amendementFrom,
        amendementTo,
        buildingAddress,
        buildingName,
        businessAddress,
        businessArea,
        businessEmail,
        businessMobile,
        businessName,
        businessPermitID,
        businessPostalCode,
        businessTelephone,
        businessTypeID,
        businessTypeList,
        capital1,
        dateOfApplication,
        dtiRegDate,
        dtiRegNo,
        emergencyAddress,
        emergencyMobile,
        emergencyPerson,
        enjoyTaxIncentive,
        fName,
        femaleEmployee,
        grossEssential1,
        grossNonEssential1,
        lName,
        lessorAddress,
        lessorEmail,
        lessorMobile,
        lessorName,
        lguEmployee,
        line1,
        mName,
        maleEmployee,
        monthlyRental,
        notEnjoyTaxIncentive,
        ownersAddress,
        ownersEmail,
        ownersMobile,
        ownersPostalCode,
        ownersTelephone,
        paymentTypeID,
        progress,
        qrCode,
        queueNo,
        taxPayerName,
        tinNo,
        tradeFranchiseName,
        type,
        units1,
      } = newPayload;

      formData.append("amendementFrom", amendementFrom);
      formData.append("amendementTo", amendementTo);
      formData.append("buildingAddress", buildingAddress);
      formData.append("buildingName", buildingName);
      formData.append("businessAddress", businessAddress);
      formData.append("businessArea", businessArea);
      formData.append("businessEmail", businessEmail);
      formData.append("businessMobile", businessMobile);
      formData.append("businessName", businessName);
      formData.append("businessPermitID", businessPermitID);
      formData.append("businessPostalCode", businessPostalCode);
      formData.append("businessTelephone", businessTelephone);
      formData.append("businessTypeID", businessTypeID);
      formData.append("businessTypeList", businessTypeList);
      formData.append("capital1", capital1);
      formData.append("dateOfApplication", dateOfApplication);
      formData.append("dtiRegDate", dtiRegDate);
      formData.append("dtiRegNo", dtiRegNo);
      formData.append("emergencyMobile", emergencyMobile);
      formData.append("emergencyAddress", emergencyAddress);
      formData.append("emergencyPerson", emergencyPerson);
      formData.append("enjoyTaxIncentive", enjoyTaxIncentive);
      formData.append("femaleEmployee", femaleEmployee);
      formData.append("taxPayerName", `${fName} ${mName} ${lName}`);
      formData.append("grossNonEssential1", grossNonEssential1);
      formData.append("grossEssential1", grossEssential1);
      formData.append("lessorAddress", lessorAddress);
      formData.append("lessorEmail", lessorEmail);
      formData.append("lessorMobile", lessorMobile);
      formData.append("lessorName", lessorName);
      formData.append("lguEmployee", lguEmployee);
      formData.append("line1", line1);
      formData.append("maleEmployee", maleEmployee);
      formData.append("monthlyRental", monthlyRental);
      formData.append("notEnjoyTaxIncentive", notEnjoyTaxIncentive);
      formData.append("ownersAddress", ownersAddress);
      formData.append("ownersEmail", ownersEmail);
      formData.append("ownersMobile", ownersMobile);
      formData.append("ownersPostalCode", ownersPostalCode);
      formData.append("ownersTelephone", ownersTelephone);
      formData.append("paymentTypeID", paymentTypeID);
      formData.append("qrCode", qrCode);
      formData.append("queueNo", queueNo);
      formData.append("tinNo", tinNo);
      formData.append("tradeFranchiseName", tradeFranchiseName);
      formData.append("type", type);
      formData.append("units1", units1);
      formData.append("applicantSignature", applicantSignature);
      formData.append("brgyBusinessClearance", brgyBusinessClearance);
      formData.append("dtiReg", dtiReg);
      formData.append("locationalClearance", locationalClearance);
      formData.append("leaseContract", leaseContract);
      formData.append("picture", picture);
      formData.append("certOfCompliance", certOfCompliance);
      formData.append(
        "nationalAgencyAccredetation",
        nationalAgencyAccredetation
      );
      formData.append("marketClearance", marketClearance);
      formData.append("homeOwnersClearance", homeOwnersClearance);
      formData.append("cedula", cedula);
      formData.append("buidingpermit", buidingpermit);
      formData.append("sanityPermit", sanityPermit);
      formData.append("menroCert", menroCert);
      formData.append("fireSafetyCert", fireSafetyCert);
      formData.append("water", water);
      formData.append("mtoAssestmentRecord", mtoAssestmentRecord);
      formData.append("mtoPayment", mtoPayment);
      let response;
      if (this.props?.pathName?.includes("/renew")) {
        response = await this.#axios.put(
          `/services/businessPermit/${this.props?.renewData?.id}`,
          { updatePayload, formData }
        );
      } else {
        response = await this.#axios.post(
          "/services/businessPermit",
          formData,
          {
            withCredentials: true,
          }
        );
      }
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
        this.payload.current.state?.response?.data === "valid" &&
        this.payload.current.state?.basicFormData
      ) {
        this.setState({
          basicInfo: this.payload.current.state,
        });
        this.handleNext();
      }

      if (
        this.payload.current.state?.response?.data === "valid" &&
        this.payload.current.state?.otherInfoData
      ) {
        this.setState({
          otherInfo: this.payload.current.state,
        });
        this.handleNext();
      }
      if (
        this.payload.current.state?.response?.data === "valid" &&
        this.payload.current.state?.businessActivityData
      ) {
        this.setState({
          businessActivity: this.payload.current.state,
        });
        this.handleNext();
      }
      if (
        this.payload.current.state?.response?.data === "valid" &&
        this.payload.current.state?.bfpFormData
      ) {
        this.setState({
          bfpFormData: this.payload.current.state,
        });
        this.handleNext();
      }
      if (
        this.payload.current.state?.response === "valid" &&
        this.payload.current.state?.requirementData
      ) {
        this.setState({
          requirement: this.payload.current.state?.requirementData,
        });
        this.handleNext();
      }
      if (
        this.payload.current.state?.response === "valid" &&
        this.payload.current.state?.signatureData
      ) {
        this.setState({
          signatures: this.payload.current.state.signatureData,
        });
        this.handleNext();
      }
    }, 1000);
  }

  handleReload() {
    window.location.reload(true);
  }

  handleCheckBasic() {
    this.state;
  }

  render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <Container component="main" sx={{ mb: 4, p: 5 }}>
              <Paper
                variant="outlined"
                sx={{ m: 5, p: 5 }}
                // sx={{ m: { xs: 3, md: 6, sm: 5 }, p: { xs: 2, md: 3, sm: 15 } }}
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
                    color="tertiary.main"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {this.props?.pathName?.includes("/renew") ? "RENEW" : "NEW"}
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
                        delays. Incomplete application from will be returned to
                        the applicant.
                      </li>
                      <li>
                        Ensure that all documents attached to this form (if any)
                        are complete and properly filled out.
                      </li>
                    </ol>
                  </Typography>
                  <Stepper
                    activeStep={this.state.activeStep}
                    sx={{ pt: 3, pb: 5, maxWidth: 10 }}
                    orientation={
                      this.state.innerWidth <= 720 ? "vertical" : "horizontal"
                    }
                  >
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
                                this.state.activeStep === index
                                  ? "bold"
                                  : "none",
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
                        Your application is under review. We will notify you of
                        the outcome. We will contact you regarding the next
                        steps. You can check the status of your application on
                        our website
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
                  )}{" "}
                </Box>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ServiceForm;

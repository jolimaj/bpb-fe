import { Component } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  CardMedia,
  Box,
  Grid,
} from "@mui/material";
import ImageSrc from "../../vendor/common/images-constant";

import { AxiosInterceptor } from "../../common/interceptor";
import ServiceConfig from "../../common/service-config";
import { SERVICES } from "../../common/constant/services-constant";
import {
  CloudUpload as CloudUploadIcon,
  Preview as PreviewIcon,
  FilePresentRounded as FilePresentRoundedIcon,
  Close as CloseIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

export default class TrackingContent extends Component {
  #imageSrc;
  #serviceConfig;
  #axiosGeneric;
  #axiosUser;

  constructor(props) {
    super(props);
    this.state = {
      brgyBusinessClearance: "",
      dtiReg: "",
      locationalClearance: "",
      leaseContract: "", //optional
      picture: "",
      certOfCompliance: "",
      nationalAgencyAccredetation: "", //optional
      marketClearance: "", //optional
      homeOwnersClearance: "", //optional
      cedula: "",
      buidingpermit: "",
      sanityPermit: "",
      menroCert: "",
      fireSafetyCert: "",
      water: "",
      mtoAssestmentRecord: "",
    };
    this.#imageSrc = ImageSrc();
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axiosGeneric = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
    this.#axiosUser = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
    this.requirementsChecklist = this.requirementsChecklist.bind(this);
  }

  componentDidMount() {}

  requirementsChecklist(code, req, type) {
    let val;
    switch (code) {
      case "MPDC":
        val = this.mpdcList(req, type);
        break;
      case "MTO":
        val = this.mtoList(req, type);
        break;
      case "BFP":
        val = this.bfpList(req, type);
        break;
      case "SANIDAD":
        val = this.sanidadList(req, type);
        break;
      case "MENRO":
        val = this.menroList(req, type);
        break;
      case "MEO":
        val = this.meoList(req, type);
        break;
      case "BPLO":
        val = this.bploList(req, type);
        break;
    }
    return val;
  }

  bploList(req, type) {
    const one = [
      {
        name: "Barangay Business Clearance",
        file: req[0]?.brgyBusinessClearance,
      },
      {
        name: "DTI/SEC/CDA Registration",
        file: req[0]?.dtiReg,
      },
      {
        name: "Lease Contract (if applicable)",
        file: req[0]?.leaseContract,
      },
      {
        name: "Picture 2x2",
        file: req[0]?.picture,
      },
      {
        name: "SSS Cert, of Compliance",
        file: req[0]?.certOfCompliance,
      },
      {
        name: "National Agency Accreditation (if applicable)",
        file: req[0]?.nationalAgencyAccredetation,
      },
      {
        name: "Market Clearance (for market vendors, if applicable)",
        file: req[0]?.marketClearance,
      },
      {
        name: "Home Owner Clearance (if applicable)",
        file: req[0]?.homeOwnersClearance,
      },
    ];
    const two = [
      {
        name: "Barangay Business Clearance",
        file: req[0]?.brgyBusinessClearance,
      },
      {
        name: "DTI/SEC/CDA Registration",
        file: req[0]?.dtiReg,
      },
      {
        name: "Market Clearance (for market vendors)",
        file: req[0]?.marketClearance,
      },
      {
        name: "SSS Cert, of Compliance",
        file: req[0]?.certOfCompliance,
      },
      {
        name: "National Agency Accreditation - For Verifications (if applicable)",
        file: req[0]?.nationalAgencyAccredetation,
      },
      {
        name: "Lease Contract (if applicable) - For Verifications (if applicable)",
        file: req[0]?.leaseContract,
      },
      {
        name: "Home Owner Clearance - For Verifications (if applicable)",
        file: req[0]?.homeOwnersClearance,
      },
    ];
    return type === 1 ? one : two;
  }
  mpdcList(req, type) {
    return [
      {
        name: "Locational Clearance",
        file: req[0]?.locationalClearance,
        disabled: type !== 1,
        key: "locationalClearance",
      },
    ];
  }

  mtoList(req, type) {
    return [
      {
        name:
          type === 1 ? "Cedula - For Verification(If applicable)" : "Cedula",
        file: req[0]?.cedula,
        disabled: false,
      },
      {
        name: "Water",
        file: req[0]?.water,
        disabled: type !== 1,
      },
      {
        name: "MTO Accessment Record",
        file: req[0]?.mtoAssestmentRecord,
        disabled: type !== 1,
      },
    ];
  }

  bfpList(req) {
    return [
      {
        name: "Fire Safety Inspection Certificate Application Form",
        file: req[0]?.fireSafetyCert,
      },
    ];
  }

  sanidadList(req) {
    return [
      {
        name: "Sanitary Permit",
        file: req[0]?.sanityPermit,
      },
    ];
  }

  menroList(req, type) {
    return [
      {
        name: "Municipal Environmental Certificate",
        file: req[0]?.menroCert,
        disabled: type !== 1,
      },
    ];
  }

  meoList(req, type) {
    return [
      {
        name:
          type === 1
            ? "Renovation / Building Permit - For Verification(If applicable)"
            : "Renovation / Building Permit",
        file: req[0]?.buidingpermit,
      },
    ];
  }

  async handleSave(name) {
    try {
    } catch (error) {
      return error;
    }
  }

  render() {
    return (
      <Grid item xs={12} sm={12} md={12}>
        {this.props.permitList.map((item) => (
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              component="h1"
              variant="h4"
              color="tertiary.main"
              noWrap
              sx={{
                flexGrow: 1,
                textTransform: "uppercase",
                fontWeight: "bold",
                textAlign: "left",
                marginY: 5,
              }}
            >
              {`${item.BasicInfos.map((vals) => vals.businessName)} (${
                item.type === 1 ? "NEW" : "FOR RENEWAL"
              })`}
            </Typography>
            <Grid item xs={12} sm={12} md={12}>
              {this.requirementsChecklist(
                this.props.code,
                item.Requirements,
                item.type
              ).map((values) => (
                <Box sx={{ minWidth: 200, marginY: 5 }}>
                  <Card variant="outlined">
                    {values.file ? (
                      <CardMedia
                        component="img"
                        height="500"
                        image="/static/images/cards/paella.jpg"
                        alt={values.name}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        height="500"
                        image={this.#imageSrc.empty.src}
                        alt={values.name}
                      />
                    )}
                    <CardContent>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                        color="primary"
                        gutterBottom
                        variant="h5"
                      >
                        {values.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="large"
                        component="label"
                        variant="contained"
                        disabled={values.disabled}
                        startIcon={<CloudUploadIcon color="secondary" />}
                      >
                        <input
                          type="file"
                          accept=".jpg, .png, .jpeg, .pdf"
                          hidden
                          onChange={(e) => {
                            this.setState({
                              [values.key]: e.target.files,
                            });
                          }}
                        />
                        {values.file ? "Reupload" : "Upload"}
                      </Button>
                      <Button
                        size="large"
                        disabled={!values.file || values.disabled}
                        component="label"
                        variant="contained"
                        startIcon={<PreviewIcon color="secondary" />}
                      >
                        View
                      </Button>
                      <Button
                        size="large"
                        disabled={!this.state[values.key]}
                        component="label"
                        color="success"
                        variant="contained"
                        startIcon={<SaveIcon color="secondary" />}
                        onClick={(e) => {
                          this.handleSave(values.key);
                        }}
                      >
                        Save
                      </Button>
                    </CardActions>
                  </Card>
                  {this.state[values.key] && (
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
                        {this.state[values.key][0].name}
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          this.setState({ [values.key]: "" });
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
}

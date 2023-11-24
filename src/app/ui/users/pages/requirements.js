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
import Viewer from "./viewFile";

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
  #axiosUser;

  constructor(props) {
    super(props);
    console.log(
      "🚀 ~ file: requirements.js:35 ~ TrackingContent ~ constructor ~ props:",
      props
    );
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
      permitList: [],
      viewFile: false,
      fileName: "",
    };
    this.#imageSrc = ImageSrc();
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axiosUser = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
    this.requirementsChecklist = this.requirementsChecklist.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  async componentDidMount() {
    await this.getMyPermit();
  }

  async getMyPermit() {
    try {
      const { data } = await this.#axiosUser.get("/services/businessPermit", {
        withCredentials: true,
      });
      this.setState({ permitList: data });
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
      }
      return error;
    }
  }
  requirementsChecklist(id, code, req, type) {
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
        record: this.state.permitList,
        key: "brgyBusinessClearance",
      },
      {
        name: "DTI/SEC/CDA Registration",
        file: req[0]?.dtiReg,
        record: this.state.permitList,
        key: "dtiReg",
      },
      {
        name: "Lease Contract (if applicable)",
        file: req[0]?.leaseContract,
        record: this.state.permitList,
        key: "leaseContract",
      },
      {
        name: "Picture 2x2",
        file: req[0]?.picture,
        record: this.state.permitList,
        key: "picture",
      },
      {
        name: "SSS Cert, of Compliance",
        file: req[0]?.certOfCompliance,
        record: this.state.permitList,
        key: "certOfCompliance",
      },
      {
        name: "National Agency Accreditation (if applicable)",
        file: req[0]?.nationalAgencyAccredetation,
        record: this.state.permitList,
        key: "nationalAgencyAccredetation",
      },
      {
        name: "Market Clearance (for market vendors, if applicable)",
        file: req[0]?.marketClearance,
        record: this.state.permitList,
        key: "marketClearance",
      },
      {
        name: "Home Owner Clearance (if applicable)",
        file: req[0]?.homeOwnersClearance,
        record: this.state.permitList,
        key: "homeOwnersClearance",
      },
    ];
    const two = [
      {
        name: "Barangay Business Clearance",
        file: req[0]?.brgyBusinessClearance,
        record: this.state.permitList,
        key: "brgyBusinessClearance",
      },
      {
        name: "DTI/SEC/CDA Registration",
        file: req[0]?.dtiReg,
        record: this.state.permitList,
        key: "dtiReg",
      },
      {
        name: "Market Clearance (for market vendors)",
        file: req[0]?.marketClearance,
        record: this.state.permitList,
        key: "marketClearance",
      },
      {
        name: "SSS Cert, of Compliance",
        file: req[0]?.certOfCompliance,
        record: this.state.permitList,
        key: "certOfCompliance",
      },
      {
        name: "National Agency Accreditation - For Verifications (if applicable)",
        file: req[0]?.nationalAgencyAccredetation,
        record: this.state.permitList,
        key: "nationalAgencyAccredetation",
      },
      {
        name: "Lease Contract (if applicable) - For Verifications (if applicable)",
        file: req[0]?.leaseContract,
        record: this.state.permitList,
        key: "leaseContract",
      },
      {
        name: "Home Owner Clearance - For Verifications (if applicable)",
        file: req[0]?.homeOwnersClearance,
        record: this.state.permitList,
        key: "homeOwnersClearance",
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
        record: this.state.permitList,
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
        record: this.state.permitList,
        key: "cedula",
      },
      {
        name: "Water",
        file: req[0]?.water,
        disabled: type !== 1,
        record: this.state.permitList,
        key: "water",
      },
      {
        name: "MTO Accessment Record",
        file: req[0]?.mtoAssestmentRecord,
        disabled: type !== 1,
        record: this.state.permitList,
        key: "mtoAssestmentRecord",
      },
    ];
  }

  bfpList(req) {
    return [
      {
        name: "Fire Safety Inspection Certificate Application Form",
        file: req[0]?.fireSafetyCert,
        record: this.state.permitList,
        key: "fireSafetyCert",
      },
    ];
  }

  sanidadList(req) {
    return [
      {
        name: "Sanitary Permit",
        file: req[0]?.sanityPermit,
        record: this.state.permitList,
        key: "sanityPermit",
      },
    ];
  }

  menroList(req, type) {
    return [
      {
        name: "Municipal Environmental Certificate",
        file: req[0]?.menroCert,
        disabled: type !== 1,
        record: this.state.permitList,
        key: "menroCert",
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
        record: this.state.permitList,
        key: "buidingpermit",
      },
    ];
  }

  handleOpen(code) {
    window.location.replace(`account?requirements=${code}`);
  }

  handleViewFile(key, id) {
    window.location.href = `${this.props.url}&permitId=${id}&view=${key}`;
  }

  async handleSave(name, files, id) {
    const formData = new FormData();
    formData.append(`${name}`, files[0]);
    try {
      await this.#axiosUser.put(`/services/requirements/${id}`, formData, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (error) {
      return error;
    }
  }

  async handleAdd(name, files, id) {
    const formData = new FormData();
    formData.append(`${name}`, files[0]);
    formData.append("id", id);
    try {
      await this.#axiosUser.post(`/services/requirements`, formData, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (error) {
      return error;
    }
  }

  render() {
    console.log(
      "🚀 ~ file: requirements.js:335 ~ TrackingContent ~ render ~ render:",
      this.props.url
    );
    return (
      <Grid item xs={12} sm={12} md={12}>
        {this.props.url.includes("view") ? (
          <Viewer
            name={this.props.name}
            fileName={this.fileName}
            queryID={this.props.queryID}
          />
        ) : (
          <>
            {this.props?.permitList?.map((item) => (
              <Grid item xs={12} sm={12} md={12} key={item.id}>
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
                    item.id,
                    this.props.code,
                    item.Requirements,
                    item.type
                  )?.map((values) => (
                    <Box sx={{ minWidth: 200, marginY: 5 }}>
                      <Card variant="outlined">
                        {values.file ? (
                          <CardMedia
                            component="img"
                            height="500"
                            image={values.file}
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
                            onClick={(e) => {
                              this.handleViewFile(values.name, item.id);
                            }}
                          >
                            View
                            {/* <a
                          href={item.Requirements.map((re) =>
                            re.businessPermitID === item.id
                              ? re[values.key]
                              : null
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </a> */}
                          </Button>
                          <Button
                            size="large"
                            disabled={!this.state[values.key]}
                            component="label"
                            color="success"
                            variant="contained"
                            startIcon={<SaveIcon color="secondary" />}
                            onClick={(e) => {
                              {
                                values.file
                                  ? this.handleSave(
                                      values.key,
                                      this.state[values.key],
                                      item.id
                                    )
                                  : this.handleAdd(
                                      values.key,
                                      this.state[values.key],
                                      item.id
                                    );
                              }
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
          </>
        )}
      </Grid>
    );
  }
}

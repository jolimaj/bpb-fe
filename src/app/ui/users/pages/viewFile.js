import React, { Component } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Typography } from "@mui/material";

import { AxiosInterceptor } from "../../common/interceptor";
import ServiceConfig from "../../common/service-config";
import { SERVICES } from "../../common/constant/services-constant";

export default class ViewerFile extends Component {
  #serviceConfig;
  #axiosUser;
  constructor(props) {
    super(props);
    this.state = {
      docs: [
        {
          uri: "https://res.cloudinary.com/dgwrt5fcx/image/upload/v1690977296/cld-sample-5.jpg",
        },
      ],
      permitList: "",
    };
    this.#serviceConfig = new ServiceConfig();
    this.#axiosUser = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
  }

  componentDidMount() {
    this.getMyRequirement();
  }

  handleDisplayName() {
    const name = this.props.name;
    let key;
    switch (name) {
      case "Barangay Business Clearance":
        key = [
          {
            uri: this.state.permitList["brgyBusinessClearance"],
          },
        ];
        break;
      case "DTI/SEC/CDA Registration":
        key = [
          {
            uri: this.state.permitList["dtiReg"],
          },
        ];
        break;
      case "Lease Contract (if applicable)":
      case "Lease Contract (if applicable) - For Verifications (if applicable)":
        key = [
          {
            uri: this.state.permitList["leaseContract"],
          },
        ];
        break;
      case "Picture 2x2":
        key = [
          {
            uri: this.state.permitList["picture"],
          },
        ];
        break;

      case "SSS Cert, of Compliance":
        key = [
          {
            uri: this.state.permitList["certOfCompliance"],
          },
        ];
        break;
      case "National Agency Accreditation (if applicable)":
      case "National Agency Accreditation - For Verifications (if applicable)":
        key = [
          {
            uri: this.state.permitList["nationalAgencyAccredetation"],
          },
        ];
        break;
      case "Market Clearance (for market vendors, if applicable)":
        key = [
          {
            uri: this.state.permitList["marketClearance"],
          },
        ];
        break;
      case "Home Owner Clearance (if applicable)":
      case "Home Owner Clearance - For Verifications (if applicable)":
        key = [
          {
            uri: this.state.permitList["homeOwnersClearance"],
          },
        ];
        break;
      case "Home Owner Clearance (if applicable)":
        key = [
          {
            uri: this.state.permitList["homeOwnersClearance"],
          },
        ];
        break;
      case "Locational Clearance":
        key = [
          {
            uri: this.state.permitList["locationalClearance"],
          },
        ];
        break;
      case "Cedula - For Verification(If applicable)":
      case "Cedula":
        key = [
          {
            uri: this.state.permitList["cedula"],
          },
        ];
        break;
      case "Water":
        key = [
          {
            uri: this.state.permitList["water"],
          },
        ];
        break;
      case "MTO Accessment Record":
        key = [
          {
            uri: this.state.permitList["mtoAssestmentRecord"],
          },
        ];
        break;
      case "Fire Safety Inspection Certificate Application Form":
        key = [
          {
            uri: this.state.permitList["fireSafetyCert"],
          },
        ];
        break;
      case "Sanitary Permit":
        key = [
          {
            uri: this.state.permitList["sanityPermit"],
          },
        ];
        break;
      case "Municipal Environmental Certificate":
        key = [
          {
            uri: this.state.permitList["menroCert"],
          },
        ];
        break;
      case "Renovation / Building Permit - For Verification(If applicable)":
      case "Renovation / Building Permit":
        key = [
          {
            uri: this.state.permitList["buidingpermit"],
          },
        ];
        break;
    }
    return key;
  }
  async getMyRequirement() {
    try {
      const { data } = await this.#axiosUser.get(
        `/services/businessPermit/requirements/${this.props.queryID}`,
        {
          withCredentials: true,
        }
      );

      this.setState({ permitList: data });
    } catch (error) {
      if (
        typeof window !== "undefined" &&
        error?.response?.data?.code === "LOGIN_FIRST"
      ) {
        window.location.href = "/signin";
      }
      return error;
    }
  }

  render() {
    return (
      <>
        <Typography
          component="h1"
          variant="h4"
          color="tertiary.main"
          noWrap
          sx={{
            flexGrow: 1,
            textTransform: "uppercase",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {this.props.name}
        </Typography>
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={this.handleDisplayName()}
          config={{
            header: {
              disableHeader: false,
              disableFileName: true,
              retainURLParams: false,
            },
          }}
          style={{ height: 500 }}
        />
      </>
    );
  }
}

import React, { Component } from "react";
import {
  Grid,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
} from "@mui/material";
import {
  Folder as FolderIcon,
  FolderOffRounded as FolderOffRoundedIcon,
} from "@mui/icons-material";
import BFPForm from "./bfp-form";
import ModalImage from "react-modal-image";
import { padding } from "@mui/system";

export default class Tab4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlToHugeImageFile: "",
      urlToTinyImageFile: "",
      caption: "",
      view: false,
    };
    this.details = props.details.applicantDetails;
    this.requirements = this.details.Requirements[0];
    this.departmentData = props.details.departmentData.departmentData;
  }

  displayRequirements() {
    let component;
    switch (this.departmentData.id) {
      case 1:
        component = [
          {
            name: "Brgy. Business Clearance",
            file: this.requirements.locationalClearance,
          },
          {
            name: "DTI/SEC/CDA Registration",
            file: this.requirements.dtiReg,
          },
          {
            name: "Lease Contract (if applicable)",
            file: this.requirements.leaseContract,
          },
          {
            name: "Picture 2x2 (2pcs.)",
            file: this.requirements.picture,
          },
          {
            name: "SSS Cert, of Compliance",
            file: this.requirements.picture,
          },
        ];
        break;
      case 2:
        component = [
          {
            name: "Zoning Certification/ Locational Clearance",
            file: this.requirements.locationalClearance,
          },
        ];
        break;
      case 3:
        component = [
          {
            name: "Cedula/ Community Tax Certificate",
            file: this.details.applicantSignature,
          },
          {
            name: "Water (Optional)",
            file: this.requirements.water,
          },
          {
            name: "ASSESSMENT RECORD FROM THE MUNICIPAL TREASURER'S OFFICE",
            file: this.requirements.mtoAssestmentRecord,
          },
        ];
        break;
      case 4:
        component = [
          {
            name: "Municipal Environmental Certificate",
            file: this.requirements.menroCert,
          },
        ];
        break;
      case 5:
        component = [
          {
            name: "Renovation / Building Permit",
            file: this.requirements.buidingpermit,
          },
        ];
        break;
      case 6:
        component = [
          {
            name: "Municipal Health Office (Sanitation) Permit",
            file: this.requirements.sanityPermit,
          },
        ];
        break;
      default:
        component = [];
        break;
    }
    return component;
  }
  handleView(data) {
    this.setState({
      view: true,
      urlToHugeImageFile: data.file,
      urlToTinyImageFile: data.file,
      caption: data.name,
    });
  }
  render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            {this.departmentData.id === 7 ? (
              <BFPForm details={this.details} />
            ) : (
              <>
                {this.state.view && (
                  <Box sx={{ padding: "10", width: "20", height: "10" }}>
                    <ModalImage
                      small={this.state.urlToTinyImageFile}
                      medium={this.state.urlToHugeImageFile}
                      alt={this.state.caption}
                    />
                  </Box>
                )}

                <List>
                  {this.displayRequirements().map((row) => (
                    <>
                      <ListItem key={row.name}>
                        <ListItemAvatar>
                          <Avatar>
                            {row.file ? (
                              <FolderIcon color="primary" />
                            ) : (
                              <FolderOffRoundedIcon color="primary" />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText color="primary.main" primary={row.name} />
                      </ListItem>
                      <ListItem>
                        <>
                          <ModalImage
                            sx={{ padding: "10", width: "20", height: "10" }}
                            small={row.file}
                            medium={row.file}
                            alt={row.name}
                          />
                        </>
                      </ListItem>
                    </>
                  ))}
                </List>
              </>
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}

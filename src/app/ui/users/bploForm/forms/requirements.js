import React, { Component } from "react";
import { Grid, Typography, IconButton, Box, Button } from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  FilePresentRounded as FilePresentRoundedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
export default class RequiremenstInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessPermitID: "",
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
      requirementData: {},
      response: "",
    };
  }

  componentDidMount() {
    if (this.props.basicFormData.responseCode === "LOGIN_FIRST") {
      window.location.href = "/signin";
    }
  }

  async handleSubmit() {
    const {
      brgyBusinessClearance,
      dtiReg,
      locationalClearance,
      leaseContract, //optional
      picture,
      certOfCompliance,
      nationalAgencyAccredetation, //optional
      marketClearance, //optional
      homeOwnersClearance, //optional
      cedula,
      buidingpermit,
      sanityPermit,
      menroCert,
      fireSafetyCert,
      water,
      mtoAssestmentRecord,
    } = this.state;
    this.setState({
      response: "valid",
      requirementData: {
        response: "valid",
        brgyBusinessClearance,
        dtiReg,
        locationalClearance,
        leaseContract, //optional
        picture,
        certOfCompliance,
        nationalAgencyAccredetation, //optional
        marketClearance, //optional
        homeOwnersClearance, //optional
        cedula,
        buidingpermit,
        sanityPermit,
        menroCert,
        fireSafetyCert,
        water,
        mtoAssestmentRecord,
      },
    });
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
          REQUIRMENTS:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Barangay Business Clearance
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
                    this.setState({ brgyBusinessClearance: e.target.files });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.brgyBusinessClearance && (
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
                  {this.state.brgyBusinessClearance[0].name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ brgyBusinessClearance: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              DTI/SEC/CDA Registration
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
                    this.setState({ dtiReg: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.dtiReg && (
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
                  {this.state.dtiReg.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ dtiReg: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Locational Clearance
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
                    this.setState({ locationalClearance: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.locationalClearance && (
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
                  {this.state.locationalClearance.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ locationalClearance: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Lease Contract (if applicable)
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
                    this.setState({ leaseContract: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.leaseContract && (
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
                  {this.state.leaseContract.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ leaseContract: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Picture 2x2 (2pcs.)
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
                    this.setState({ picture: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.picture && (
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
                  {this.state.picture.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ picture: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              SSS Cert, of Compliance
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
                    this.setState({ certOfCompliance: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.certOfCompliance && (
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
                  {this.state.certOfCompliance.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ certOfCompliance: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="tertiary.main"
              align="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              If Applicable
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              National Agency Accredation
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
                    this.setState({
                      nationalAgencyAccredetation: e.target.files[0],
                    });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.nationalAgencyAccredetation && (
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
                  {this.state.nationalAgencyAccredetation.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ nationalAgencyAccredetation: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Market Clearance (for market vendors)
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
                    this.setState({ marketClearance: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.marketClearance && (
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
                  {this.state.marketClearance.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ marketClearance: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Home Owner's Clearance
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
                    this.setState({ homeOwnersClearance: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.homeOwnersClearance && (
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
                  {this.state.homeOwnersClearance.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ homeOwnersClearance: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="tertiary.main"
              align="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              For Verification
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Community Tax Certificate (CEDULA)
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
                    this.setState({ cedula: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.cedula && (
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
                  {this.state.cedula.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ cedula: "" });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Renovation / Building Permit
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
                    this.setState({ buidingpermit: e.target.files[0] });
                  }}
                />
              </IconButton>
            </Box>
            {this.state.buidingpermit && (
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
                  {this.state.buidingpermit.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    this.setState({ buidingpermit: "" });
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

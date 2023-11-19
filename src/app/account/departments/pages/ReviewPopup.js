import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Box,
  Tab,
} from "@mui/material/";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Tab1 from "./summary/tab1";
import Tab2 from "./summary/tab2";
import Tab3 from "./summary/tab3";
import Tab4 from "./summary/tab4";
import CloseIcon from "@mui/icons-material/Close";

import { AxiosInterceptor } from "../../../ui/common/interceptor";
import ServiceConfig from "../../../ui/common/service-config";
import { SERVICES } from "../../../ui/common/constant/services-constant";
import Signature from "./signatures";

export default function FormDialog(props) {
  const serviceConfig = new ServiceConfig();
  const { axios } = new AxiosInterceptor(
    serviceConfig.getServicesConfig(SERVICES.STAFF)
  );
  const [value, setValue] = useState("1");
  const [signaturePop, setSignature] = useState(false);
  const [isCheck, setCheck] = useState(false);
  const [isSIg, setSig] = useState(true);
  const signatures = useRef(null);
  const [signatureMTO, setSigMTO] = useState("");
  console.log(
    "🚀 ~ file: ReviewPopup.js:37 ~ FormDialog ~ signatureMTO:",
    signatureMTO
  );
  const [signatureBFP, setSigBFP] = useState("");
  console.log(
    "🚀 ~ file: ReviewPopup.js:39 ~ FormDialog ~ signatureBFP:",
    signatureBFP
  );
  const [signatureBPLO, setSigBPLO] = useState("");

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function checkSignature(id) {
    switch (id) {
      case 3:
        if (
          signatureMTO ||
          (!props.applicantDetails.approvedByBPLO1 &&
            !props.applicantDetails.approvedByMTO2)
        ) {
          setCheck(false);
          setSig(true);
        } else {
          setCheck(true);
          setSig(false);
        }
        break;
      case 1:
      case 7:
        if (signatureBFP || signatureBPLO || signatureMTO) {
          setCheck(false);
          setSig(true);
        } else {
          setCheck(true);
          setSig(false);
        }
        break;
    }
  }

  function checkSignatureRenew(id) {
    switch (id) {
      case 1:
        if (
          signatureBPLO ||
          (!props.applicantDetails.approvedByBPLO1 &&
            !props.applicantDetails.approvedByBPLO2)
        ) {
          setCheck(false);
          setSig(true);
        } else {
          setCheck(true);
          setSig(false);
        }
        break;
      case 3:
      case 7:
        if (signatureBFP || signatureBPLO || signatureMTO) {
          setCheck(false);
          setSig(true);
        } else {
          setCheck(true);
          setSig(false);
        }
        break;
    }
  }
  useEffect(() => {
    if (props.applicantDetails.assignedToDepartmentID.type === 1) {
      checkSignature(props.applicantDetails.assignedToDepartmentID);
    } else {
      checkSignatureRenew(props.applicantDetails.assignedToDepartmentID);
    }
  });

  async function handleCheck() {
    setSignature(true);
  }
  async function handleApprove() {
    const data = props.session;
    const formData = new FormData();
    formData.append("signatureMTO", signatureMTO);
    formData.append("signatureBFP", signatureBFP);
    formData.append("signatureBPLO", signatureBPLO);
    formData.append("result", "approve");
    console.log("🚀 ~ file: ReviewPopup.js:90 ~ handleApprove ~ isSIg:", isSIg);
    const payload = isCheck ? formData : { result: "approve" };
    try {
      await axios.put(
        `businessPermit/${props.applicantDetails?.id}`,
        formData,
        data
      );
      props.handleClose();
    } catch (error) {
      return error;
    }
  }

  async function handleDisApprove() {
    const data = props.session;

    try {
      await axios.put(
        `businessPermit/${props.applicantDetails?.id}`,
        { result: "disapproved" },
        data
      );
      props.handleClose();
      window.location.reload(true);
    } catch (error) {
      return error;
    }
  }
  return (
    <>
      <Dialog open={props?.review} fullWidth height="auto" maxWidth="lg" mb={2}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1, fontWeight: "bold" }}
              color="secondary"
              variant="h6"
              component="div"
            >
              {props?.applicantDetails?.type === 1
                ? "New Application Summary"
                : "Renewal Application Summary"}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box p={2}>
          <Typography
            variant="h5"
            gutterBottom
            color="primary.main"
            sx={{
              p: 3,
              fontWeight: "bold",
              textTransform: "capitalize",
              textAlign: "left",
            }}
          >
            {props?.applicantDetails?.BasicInfos[0].taxPayerName}
          </Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Basic Information"
                  value="1"
                  key="1"
                  sx={{
                    fontWeight: value === "1" ? "bold" : "normal",
                  }}
                />
                <Tab
                  label="Other Info"
                  value="2"
                  key="2"
                  sx={{
                    fontWeight: value === "2" ? "bold" : "normal",
                  }}
                />
                <Tab
                  label="Business Activity"
                  value="3"
                  key="3"
                  sx={{
                    fontWeight: value === "3" ? "bold" : "normal",
                  }}
                />
                <Tab
                  label="Requirements"
                  value="4"
                  key="4"
                  sx={{
                    fontWeight: value === "4" ? "bold" : "normal",
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1" key="1">
              <Tab1 details={props} />
            </TabPanel>
            <TabPanel value="2" key="2">
              <Tab2 details={props} />
            </TabPanel>
            <TabPanel value="3">
              <Tab3 details={props} key="3" />
            </TabPanel>
            <TabPanel value="4" key="4">
              <Tab4 details={props} ref={signatures} />
            </TabPanel>
          </TabContext>
        </Box>

        <DialogContent></DialogContent>
        {value === "4" && (
          <DialogActions py={10}>
            <Button
              variant="contained"
              color="success"
              onClick={handleCheck}
              disabled={isSIg}
            >
              Add Signature
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleApprove}
              disabled={isCheck}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDisApprove}
            >
              Disapprove
            </Button>
          </DialogActions>
        )}
        {signaturePop ? (
          <Signature
            signaturePop={signaturePop}
            setSignature={setSignature}
            id={props.departmentData[0].id}
            setSigBFP={setSigBFP}
            setSigMTO={setSigMTO}
            setSigBPLO={setSigBPLO}
            setCheck={setCheck}
          />
        ) : null}
      </Dialog>
    </>
  );
}

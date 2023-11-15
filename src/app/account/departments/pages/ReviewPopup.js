import React, { use, useState } from "react";
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
import { DEPARTMENT_ID } from "../../../ui/common/constant/department";

export default function FormDialog(props) {
  const serviceConfig = new ServiceConfig();
  const { axios } = new AxiosInterceptor(
    serviceConfig.getServicesConfig(SERVICES.STAFF)
  );
  const [value, setValue] = useState("1");

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function handleApprove() {
    const data = props.session;

    try {
      await axios.put(
        `businessPermit/${props.applicantDetails?.id}`,
        { result: "approve" },
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
      if (typeof window !== "undefined") window.location.reload();
    } catch (error) {
      return error;
    }
  }
  return (
    <div>
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
                  sx={{
                    fontWeight: value === "1" ? "bold" : "normal",
                  }}
                />
                <Tab
                  label="Other Info"
                  value="2"
                  sx={{
                    fontWeight: value === "2" ? "bold" : "normal",
                  }}
                />
                <Tab
                  label="Business Activity"
                  value="3"
                  sx={{
                    fontWeight: value === "3" ? "bold" : "normal",
                  }}
                />
                <Tab
                  label="Requirements"
                  value="4"
                  sx={{
                    fontWeight: value === "4" ? "bold" : "normal",
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Tab1 details={props} />
            </TabPanel>
            <TabPanel value="2">
              <Tab2 details={props} />
            </TabPanel>
            <TabPanel value="3">
              <Tab3 details={props} />
            </TabPanel>
            <TabPanel value="4">
              <Tab4 details={props} />
            </TabPanel>
          </TabContext>
        </Box>

        <DialogContent></DialogContent>
        <DialogActions py={10}>
          <Button
            variant="contained"
            color="success"
            onClick={handleApprove}
            disabled={value !== "4"}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDisApprove}
            disabled={value !== "4"}
          >
            Disapprove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material/";
import {
  CloudUpload as CloudUploadIcon,
  FilePresentRounded as FilePresentRoundedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function DisapproveForm(props) {
  const [reason, setReason] = useState("1");
  function handleAdd() {
    props.handleDisApprove(reason);
    props.setDisapprovedForm(false);
    window.location.reload(true);
  }

  return (
    <div>
      <Dialog
        open={props?.disapprovedPop}
        fullWidth
        height="auto"
        maxWidth="lg"
        mb={2}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1, fontWeight: "bold" }}
              color="secondary"
              variant="h6"
              component="div"
            >
              Remarks
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {
                props.setDisapprovedForm(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {" "}
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Reason</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="1"
              value={reason}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Invalid Requirements"
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Missing Requirement"
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions py={10}>
          <Button variant="contained" color="success" onClick={handleAdd}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

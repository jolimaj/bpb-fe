import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";

export default function FormDialog(props) {
  return (
    <div>
      <Dialog open={props.openForm} fullWidth height="auto" mb={2}>
        <Typography
          variant="h5"
          gutterBottom
          color="primary.main"
          sx={{
            py: 2,
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {props.title}
        </Typography>
        <DialogContent>{props.departmentComponent}</DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={props.btnFunction} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

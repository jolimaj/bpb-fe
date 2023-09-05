import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { INITIAL_ACCOUNT } from "../constant/endpoints/users";

export default function AlertDialog(props) {
  const handleClose = () => {
    switch (props.pathName) {
      case INITIAL_ACCOUNT.FORGOT:
      case `${INITIAL_ACCOUNT.FORGOT}/${props.params}`:
        window.location.href = INITIAL_ACCOUNT.SIGNIN;
        break;
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog
        open={props.openModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={handleClose}
      >
        <DialogTitle id="responsive-dialog-title">Message</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.alertMessage}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

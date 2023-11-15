import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Link,
} from "@mui/material";

import { INITIAL_ACCOUNT } from "../constant/endpoints/users";

export default function AlertDialog(props) {
  const handleClose = () => {
    switch (props.pathName) {
      case INITIAL_ACCOUNT.FORGOT:
      case `${INITIAL_ACCOUNT.FORGOT}/${props.params}`:
      case `${INITIAL_ACCOUNT.FORGOT}/${props.uuid}`:
      case `${INITIAL_ACCOUNT.PASSWORD_CREATION}/${props.params}/${props.uuid}`:
      case `${INITIAL_ACCOUNT.SIGNUP}`:
        window.location.href = INITIAL_ACCOUNT.SIGNIN;
        break;
        break;
      default:
        break;
    }
  };

  return (
    <>
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
        <DialogActions>
          {props.pathName === `${INITIAL_ACCOUNT.FORGOT}/${props.uuid}` ||
            (props.pathName === `${INITIAL_ACCOUNT.SIGNIN}/${props.uuid}` ||
            `${INITIAL_ACCOUNT.PASSWORD_CREATION}/${props.params}/${props.uuid}` ? (
              <Link
                href="/signin"
                variant="body2"
                sx={{ textAlign: "center", textDecoration: "none" }}
              >
                Back to Login Page
              </Link>
            ) : null)}
        </DialogActions>
      </Dialog>
    </>
  );
}

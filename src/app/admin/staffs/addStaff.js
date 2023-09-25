import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, MenuItem } from "@mui/material";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Dialog open={props.openForm}>
        <DialogTitle>
          <Typography
            variant="h5"
            gutterBottom
            color="primary.main"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            New Staff
          </Typography>
        </DialogTitle>
        <DialogContent>
          {props.departmentComponent}
          <TextField
            autoFocus
            margin="dense"
            required
            id="name"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="mName"
            label="Middle Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            required
            id="lName"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Mobile Number"
            type="number"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={props.handleClose} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

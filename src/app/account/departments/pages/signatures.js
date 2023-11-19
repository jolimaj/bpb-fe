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
  Box,
} from "@mui/material/";
import {
  CloudUpload as CloudUploadIcon,
  FilePresentRounded as FilePresentRoundedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function FormDialog(props) {
  const [files, setFiles] = useState("");
  function handleAdd() {
    switch (props.id) {
      case 1:
        props.setSigBPLO(files);
        break;
      case 3:
        props.setSigMTO(files);
        break;
      case 7:
        props.setSigBFP(files);
        break;
    }
    props.setCheck(false);
    props.setSignature(false);
  }

  function handleChange(e) {
    setFiles(e.target.files[0]);
  }
  return (
    <div>
      <Dialog
        open={props?.signaturePop}
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
              Upload Signature
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {
                props.setSignature(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {" "}
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
                onChange={handleChange}
              />
            </IconButton>
          </Box>
          {files && (
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
                {files?.name}
              </Typography>
              <IconButton
                color="error"
                onClick={(e) => {
                  setFiles("");
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </DialogContent>
        <DialogActions py={10}>
          <Button
            variant="contained"
            color="success"
            onClick={handleAdd}
            disabled={!files}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { Component } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  MenuItem,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default class BasicInfoForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box p={2}>
        <Typography
          variant="h5"
          gutterBottom
          color="tertiary.main"
          sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 5 }}
        >
          BASIC INFORMATION:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              {`Date of Application: ${new Date().toISOString().split("T")[0]}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullwidth
                id="date"
                name="date"
                label="Date of Application"
                variant="standard"
                inputFormat="MM/dd/yyyy"
                defaultValue={dayjs(new Date())}
                disabled
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullwidth
                id="date"
                name="date"
                label="DTI/SEC/CDA Registration Date"
                variant="standard"
                inputFormat="MM/dd/yyyy"
                defaultValue={dayjs(new Date())}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="dtiRegNo"
              name="dtiRegNo"
              label="DTI/SEC/CDA Registration No.	"
              fullWidth
              type="number"
              required
              autoComplete="shipping address-line2"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="tinNo"
              name="tinNo"
              label="Tin No."
              fullWidth
              type="number"
              autoComplete="tin no."
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select // tell TextField to render select
              value={10}
              name="typeOfBusiness"
              label="Type of Business"
              fullWidth
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select // tell TextField to render select
              value={10}
              name="amendmentFrom"
              label="Amendment From"
              fullWidth
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select // tell TextField to render select
              value={10}
              name="amendmentTo"
              label="Amendment To"
              fullWidth
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Are you enjoying tax incentive from any Government Entity?
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={2}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="specifyEntity"
              name="specifyEntity"
              label="Please specify Entity?"
              fullWidth
              autoComplete="specify-entity"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="primary"
              align="center"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Name of Taxpayer / Registrant
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="lName"
              name="lName"
              label="Last Name"
              fullWidth
              autoComplete="lName"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="fName"
              name="fName"
              label="First Name"
              fullWidth
              autoComplete="fName"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="mName"
              name="mName"
              label="Middle Name Name"
              fullWidth
              autoComplete="mName"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="businessName"
              name="businessName"
              label="Business Name"
              fullWidth
              autoComplete="businessName"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="tradeName"
              name="tradeName"
              label="Trade name / Franchise"
              fullWidth
              autoComplete="tradeName"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

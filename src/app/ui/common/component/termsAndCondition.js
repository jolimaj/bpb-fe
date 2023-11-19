import React from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  terms: {
    marginBottom: theme.spacing(4),
  },
}));

const TermsAndConditions = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" className={classes.terms}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
        lectus vitae erat pulvinar, ut lobortis purus viverra. Fusce auctor
        lectus ut enim auctor, at fermentum justo consectetur. Quisque ac mi
        auctor, commodo massa a, pretium urna. Curabitur fermentum orci eu neque
        fringilla, ut posuere turpis consectetur. Duis id velit a justo
        convallis feugiat id enim. Suspendisse potenti.
      </Typography>
      <Button variant="contained" color="primary">
        Accept Terms
      </Button>
    </div>
  );
};

export default TermsAndConditions;

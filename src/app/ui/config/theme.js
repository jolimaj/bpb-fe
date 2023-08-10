import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e6ea5",
    },
    secondary: {
      main: "#FFFF",
    },
    background: {
      main: "#1e6ea5",
    },
  },
  typography: {
    palette: {
      primary: {
        main: "#1e6ea5",
      },
      secondary: {
        main: "#FFFF",
      },
    },
    typographyInput: "PoppinsRegular",
  },
});
responsiveFontSizes(theme);
export default theme;

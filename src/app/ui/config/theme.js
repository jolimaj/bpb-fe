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
    tertiary: {
      main: "#fc8800",
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
      tertiary: {
        main: "#fc8800",
      },
      fourth: {
        main: "#006ba1",
      },
    },
    typographyInput: "PoppinsRegular",
  },
});
responsiveFontSizes(theme);
export default theme;

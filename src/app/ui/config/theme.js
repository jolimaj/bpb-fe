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
    fourth: {
      main: "#8f8e7c",
    },
    fifth: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Poppins",
    allVariants: {
      color: "#8f8e7c",
    },
  },
});
responsiveFontSizes(theme);
export default theme;

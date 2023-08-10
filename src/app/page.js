"use client";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "./ui/common/component/copyright";
import SignIn from "./ui/admin/sign-in";
import Dashboard from "./ui/admin/dashboard/dashboard";
import LandingPage from "./ui/users/index";
import theme from "./ui/config/theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      {/* <SignIn />
      <Copyright /> */}
      <LandingPage />
      <Copyright />
    </ThemeProvider>
  );
}

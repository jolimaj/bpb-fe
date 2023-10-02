"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../../../../ui/common/component/copyright";
import PasswordCreate from "../../../../ui/admin/forms/initial/password/forgotPassword";
import theme from "../../../../ui/config/theme";
import { usePathname, useParams } from "next/navigation";

export default function SignInPage() {
  const pathName = usePathname();
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <PasswordCreate route={pathName} params={params} />
      <Copyright />
    </ThemeProvider>
  );
}
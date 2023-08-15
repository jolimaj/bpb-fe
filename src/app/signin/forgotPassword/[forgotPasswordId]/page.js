"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../../../ui/common/component/copyright";
import PasswordResetForm from "../../../ui/admin/sign-in";
import theme from "../../../ui/config/theme";
import { usePathname, useParams } from "next/navigation";

export default function SignInPage() {
  const pathName = usePathname();
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <PasswordResetForm route={pathName} params={params} />
      <Copyright />
    </ThemeProvider>
  );
}

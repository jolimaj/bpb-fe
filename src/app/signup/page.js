"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../ui/common/component/copyright";
import RegisterForm from "../ui/admin/formIndex";
import theme from "../ui/config/theme";
import { usePathname, useParams } from "next/navigation";

export default function SignUpPage() {
  const pathName = usePathname();
  const params = useParams();

  return (
    <ThemeProvider theme={theme}>
      <RegisterForm route={pathName} params={params} />
      <Copyright />
    </ThemeProvider>
  );
}

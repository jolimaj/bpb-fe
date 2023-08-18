"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../ui/common/component/copyright";
import RegisterForm from "../ui/admin/formIndex";
import theme from "../ui/config/theme";
import { usePathname, useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const pathName = usePathname();
  return (
    <ThemeProvider theme={theme}>
      <RegisterForm route={pathName} />
      <Copyright />
    </ThemeProvider>
  );
}

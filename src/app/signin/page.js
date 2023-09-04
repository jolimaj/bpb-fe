"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../ui/common/component/copyright";
import Forms from "../ui/admin/formIndex";
import theme from "../ui/config/theme";
import { usePathname, redirect } from "next/navigation";

export default function FormsPage() {
  const pathName = usePathname();
  return (
    <ThemeProvider theme={theme}>
      <Forms route={pathName} redirect={redirect} />
      <Copyright />
    </ThemeProvider>
  );
}

"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../../../ui/common/component/copyright";
import Dashboard from "../../../ui/admin/dashboard/dashboard.js";
import MyBusinessList from "./businessList";
import theme from "../../../ui/config/theme";
import { usePathname, useSearchParams } from "next/navigation";

export default function AccountPage() {
  const pathName = usePathname();
  return (
    <ThemeProvider theme={theme}>
      <Dashboard
        route={pathName}
        isUser={true}
        pageName={<MyBusinessList pathName={pathName} />}
      />
      <Copyright />
    </ThemeProvider>
  );
}

"use client";
import { Cookies } from "react-cookie";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../../ui/common/component/copyright";
import Dashboard from "../../ui/admin/dashboard/dashboard.js";
import DashboardPage from "../../admin/page-tracking";
import theme from "../../ui/config/theme";
import { usePathname, useSearchParams } from "next/navigation";

export default function Department() {
  const pathName = usePathname();
  const cookies = new Cookies();

  const [session, setSession] = useState(cookies.get("session"));

  return (
    <ThemeProvider theme={theme}>
      <Dashboard
        route={pathName}
        isUser={false}
        pageName={<DashboardPage session={session} />}
      />
      <Copyright />
    </ThemeProvider>
  );
}

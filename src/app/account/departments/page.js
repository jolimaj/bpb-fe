"use client";
import { Cookies } from "react-cookie";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../../ui/common/component/copyright";
import Dashboard from "../../ui/admin/dashboard/dashboard.js";
import DashboardPage from "../../admin/page-tracking";
import theme from "../../ui/config/theme";
import { usePathname, useRouter } from "next/navigation";

export default function Department() {
  const pathName = usePathname();
  const cookies = new Cookies();
  const router = useRouter();
  const [session, setSession] = useState(cookies.get("session"));

  async function redirectPage(path) {
    router.push(path);
  }
  async function reloadPage() {
    router.reload();
  }
  return (
    <ThemeProvider theme={theme}>
      <Dashboard
        route={pathName}
        isUser={false}
        pageName={<DashboardPage session={session} redirect={redirectPage} />}
        reloadPage={reloadPage}
        redirect={redirectPage}
      />
      <Copyright />
    </ThemeProvider>
  );
}

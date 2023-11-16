"use client";
import { Cookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../ui/common/component/copyright";
import Dashboard from "../ui/admin/dashboard/dashboard.js";
import DashBoardPage from "./page-tracking";
import theme from "../ui/config/theme";
import { usePathname, useRouter } from "next/navigation";

export default function AccountPage() {
  const pathName = usePathname();
  const cookies = new Cookies();
  const [session, setSession] = useState(cookies.get("session"));
  const router = useRouter();

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
        pageName={
          <DashBoardPage
            session={session}
            redirect={redirectPage}
            reloadPage={reloadPage}
          />
        }
        reloadPage={reloadPage}
        redirect={redirectPage}
      />
      <Copyright />
    </ThemeProvider>
  );
}

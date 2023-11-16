"use client";
import { Cookies } from "react-cookie";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../../ui/common/component/copyright";
import Dashboard from "../../ui/admin/dashboard/dashboard.js";
import DepartmentPage from "./departmentPage";
import theme from "../../ui/config/theme";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Department() {
  const pathName = usePathname();
  const router = useRouter();
  const cookies = new Cookies();

  const [session, setSession] = useState(cookies.get("session"));
  function redirectPage(path) {
    router.push(path);
  }
  function reloadPage() {
    router.reload();
  }
  return (
    <ThemeProvider theme={theme}>
      <Dashboard
        route={pathName}
        isUser={false}
        pageName={
          <DepartmentPage
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

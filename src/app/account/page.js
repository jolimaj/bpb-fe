"use client";
import { Cookies } from "react-cookie";
import { React, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../ui/common/component/copyright";
import Dashboard from "../ui/admin/dashboard/dashboard.js";
import TrackingPage from "../ui/users/pages/page1";
import theme from "../ui/config/theme";
import {
  usePathname,
  useRouter,
  useSearchParams,
  redirect,
} from "next/navigation";

export default function AccountPage() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
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
        isUser={true}
        pageName={
          <TrackingPage
            route={pathName}
            session={session}
            searchParams={searchParams}
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

"use client";
import { Cookies, useCookies } from "react-cookie";
import { React, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../ui/common/component/copyright";
import Dashboard from "../ui/admin/dashboard/dashboard.js";
import TrackingPage from "../ui/users/pages/page1";

import theme from "../ui/config/theme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TermsAndConditions from "../ui/common/component/termsAndCondition";

export default function AccountPage() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cookies = new Cookies();

  const [session, setSession] = useState(cookies.get("session"));
  const [termsAndCondition, setTermsAndCondition] = useCookies([
    "termsAndCondition",
  ]);
  const isLogin = cookies.get("isLogin");

  function redirectPage(path) {
    router.push(path);
  }
  async function replacePage(path, newPath) {
    router.replace(path, newPath);
  }
  function reloadPage() {
    router.refresh();
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
            replacePage={replacePage}
          />
        }
        reloadPage={reloadPage}
        redirect={redirectPage}
      />
      <TermsAndConditions
        setTermsAndCondition={setTermsAndCondition}
        termsAndCondition={termsAndCondition}
        isLogin={isLogin}
      />
      <Copyright />
    </ThemeProvider>
  );
}

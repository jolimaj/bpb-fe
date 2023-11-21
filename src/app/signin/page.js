"use client";
import { React, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../ui/common/component/copyright";
import Forms from "../ui/admin/formIndex";
import TermsAndConditions from "../ui/common/component/termsAndCondition";

import theme from "../ui/config/theme";
import { usePathname, useParams, useRouter } from "next/navigation";

export default function FormsPage() {
  const pathName = usePathname();
  const params = useParams();
  const router = useRouter();
  const cookies = new Cookies();
  const [isLogin, setIsLogin] = useCookies(["isLogin"]);

  function redirectPage(path) {
    router.push(path);
  }

  function saveTerms() {
    setIsLogin("isLogin", true);
  }

  return (
    <ThemeProvider theme={theme}>
      <Forms
        route={pathName}
        params={params}
        redirect={redirectPage}
        saveTerms={saveTerms}
      />
      <Copyright />
    </ThemeProvider>
  );
}

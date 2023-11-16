"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../../../../ui/common/component/copyright";
import PasswordCreatePage from "../../../../ui/admin/forms/initial/password/forgotPassword";
import theme from "../../../../ui/config/theme";
import { usePathname, useParams, useRouter } from "next/navigation";

export default function SignInPage() {
  const pathName = usePathname();
  const params = useParams();
  const router = useRouter();

  function redirectPage(path) {
    router.push(path);
  }

  function reloadPage() {
    router.reload();
  }
  return (
    <ThemeProvider theme={theme}>
      <PasswordCreatePage
        route={pathName}
        params={params}
        reloadPage={reloadPage}
        redirect={redirectPage}
      />
      <Copyright />
    </ThemeProvider>
  );
}

"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../../../../ui/common/component/copyright";
import ActivatePage from "../../../../ui/admin/forms/initial/password/forgotPassword";
import theme from "../../../../ui/config/theme";
import { usePathname, useParams, useRouter } from "next/navigation";

export default function SignInPage() {
  const pathName = usePathname();
  const params = useParams();
  const router = useRouter();

  async function redirectPage(path) {
    router.push(path);
  }

  async function reloadPage() {
    router.reload();
  }
  return (
    <ThemeProvider theme={theme}>
      <ActivatePage route={pathName} params={params} redirect={redirectPage} />
      <Copyright />
    </ThemeProvider>
  );
}

"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../../ui/common/component/copyright";
import Dashboard from "../../ui/admin/dashboard/dashboard.js";
import TrackingPage from "../../ui/users/bploForm/form";
import theme from "../../ui/config/theme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AccountPage() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

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
          <TrackingPage redirect={redirectPage} reloadPage={reloadPage} />
        }
        reloadPage={reloadPage}
        redirect={redirectPage}
      />
      <Copyright />
    </ThemeProvider>
  );
}

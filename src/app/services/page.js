"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../ui/common/component/copyright";
import ServicesPage from "../ui/users/bploForm";
import theme from "../ui/config/theme";
import { usePathname, useRouter } from "next/navigation";

export default function Services() {
  const pathName = usePathname();
  const router = useRouter();

  function redirectPage(path) {
    router.push(path);
  }

  function reloadPage() {
    router.reload();
  }
  return (
    <ThemeProvider theme={theme}>
      <ServicesPage
        route={pathName}
        redirect={redirectPage}
        reloadPage={reloadPage}
      />
      <Copyright />
    </ThemeProvider>
  );
}

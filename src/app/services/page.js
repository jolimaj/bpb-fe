"use client";
import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Copyright from "../ui/common/component/copyright";
import ServicesPage from "../ui/users/bploForm";
import theme from "../ui/config/theme";
import { usePathname, useSearchParams } from "next/navigation";

export default function Services() {
  const pathName = usePathname();
  return (
    <ThemeProvider theme={theme}>
      <ServicesPage route={pathName} />
      <Copyright />
    </ThemeProvider>
  );
}

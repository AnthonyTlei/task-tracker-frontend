import { Box } from "@mui/material";
import { Sidebar } from "../shared/components/Sidebar";
import { SettingsLayout } from "./SettingsLayout";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex" flexDirection="row" width="100%" height="100%">
      <SettingsLayout />
      <Sidebar />
      <Box flex="1">{children}</Box>
    </Box>
  );
};

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register") {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
};

export default LayoutWrapper;

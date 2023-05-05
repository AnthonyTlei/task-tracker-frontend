import { Box } from "@mui/material";
import { useActiveSection } from "../contexts/ActiveSectionContext";
import { useEffect } from "react";
import { AdminDashboard } from "../features/admin/components/AdminDashboard";

const AdminDashboardPage = () => {
  const { setActiveSection } = useActiveSection();
  useEffect(() => {
    setActiveSection("admin");
    return () => {
      setActiveSection(null);
    };
  }, [setActiveSection]);
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <AdminDashboard/>
    </Box>
  );
};

export default AdminDashboardPage;

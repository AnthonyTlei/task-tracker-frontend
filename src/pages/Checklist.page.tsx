import { Sidebar } from "../shared/components/Sidebar";
import { Box } from "@mui/material";
import { Checklist } from "../features/checklist/components/Checklist";
import { SettingsLayout } from "../shared/components/SettingsLayout";

const ChecklistPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <SettingsLayout />
      <Sidebar />
      <Checklist />
    </Box>
  );
};

export default ChecklistPage;

import { Sidebar } from "../shared/components/Sidebar";
import { Box } from "@mui/material";
import { Overview } from "../features/overview/components/Overview";
import { Checklist } from "../features/checklist/components/Checklist";

const ChecklistPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <Sidebar />
      <Checklist/>
    </Box>
  );
};

export default ChecklistPage;

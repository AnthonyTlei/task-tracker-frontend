import { Sidebar } from "../shared/components/Sidebar";
import { Box } from "@mui/material";
import { Overview } from "../features/overview/components/Overview";
import { SettingsLayout } from "../shared/components/SettingsLayout";

const HomePage = () => {
  // TODO: Refactor layout into separate src/layout folder, with sidebad and settings.
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <SettingsLayout/>
      <Sidebar />
      <Overview />
    </Box>
  );
};

export default HomePage;

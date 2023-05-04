import { Sidebar } from "../shared/components/Sidebar";
import { Box } from "@mui/material";
import { Overview } from "../features/overview/components/Overview";
import { SettingsDial } from "../shared/components/SettingsDial";
import { useState } from "react";
import { SettingsDrawer } from "../shared/components/SettingsDrawer";

const HomePage = () => {
  // TODO: refactor all pages that use Sidebar and Speedial into another component.
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <SettingsDial onClick={handleSettingsClick} />
      <SettingsDrawer open={settingsOpen} onClose={handleSettingsClick} />
      <Sidebar />
      <Overview />
    </Box>
  );
};

export default HomePage;

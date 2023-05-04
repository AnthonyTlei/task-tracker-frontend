import { Box } from "@mui/material";
import { useState } from "react";
import { SettingsDial } from "../shared/components/SettingsDial";
import { SettingsDrawer } from "../shared/components/SettingsDrawer";

export const SettingsLayout = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };
  return (
    <Box>
      <SettingsDial onClick={handleSettingsClick} />
      <SettingsDrawer open={settingsOpen} onClose={handleSettingsClick} />
    </Box>
  );
};

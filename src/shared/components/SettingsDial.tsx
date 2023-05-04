import { Settings } from "@mui/icons-material";
import { Box, SpeedDial, useTheme } from "@mui/material";
import React from "react";

export const SettingsDial = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const theme = useTheme();
  return (
    <Box position={"fixed"} bottom={16} right={16}>
      <SpeedDial
        ariaLabel="Settings Speed Dial"
        icon={<Settings />}
        onClick={onClick}
        FabProps={{
          sx: { backgroundColor: `${theme.palette.secondary.main}` },
        }}
      />
    </Box>
  );
};

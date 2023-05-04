import {
  Box,
  Button,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../App";

export const SettingsDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [width, setWidth] = useState("440px");

  useEffect(() => {
    if (isSmallScreen) {
      setWidth("440px");
    } else {
      setWidth("100%");
    }
  }, [isSmallScreen]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: { width },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: { width },
          boxSizing: "border-box",
          backgroundColor: `${theme.palette.background.paper}}`,
        },
      }}
    >
      <Box p={4} display={"flex"} flexDirection={"column"}>
        <Typography variant="h4" fontWeight={"bold"} gutterBottom>
          Settings
        </Typography>
        <Typography variant="body2" color={"common.white"}>
          COLOR MODE
        </Typography>
        <Button onClick={colorMode.toggleColorMode}>Toggle theme</Button>
      </Box>
    </Drawer>
  );
};

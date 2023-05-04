import {
  Box,
  Button,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ToggleDarkMode } from "./ToggleDarkMode";

export const SettingsDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const theme = useTheme();
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
        <Stack direction={"row"}>
          <ToggleDarkMode />
        </Stack>
      </Box>
    </Drawer>
  );
};
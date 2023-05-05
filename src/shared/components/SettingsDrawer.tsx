import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { Close } from "@mui/icons-material";

export const SettingsDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
          backgroundColor: `${theme.palette.primary.dark}`,
          backgroundImage: "none",
        },
      }}
    >
      <Box p={4} display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography
            color={"grey.100"}
            variant="h6"
            fontWeight={"bold"}
            gutterBottom
          >
            Settings
          </Typography>
          <IconButton
            onClick={onClose}
            style={{ color: `${theme.palette.grey[100]}` }}
          >
            <Close />
          </IconButton>
        </Box>
        <Stack direction={"row"} py={5}>
          <Box
            borderRadius={"25%"}
            bgcolor={"common.black"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            p={0.5}
          >
            <ToggleDarkMode />
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

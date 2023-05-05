import { Menu } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { SidebarSections } from "../../features/sidebar/components/SidebarSections";
import { StickyDrawer } from "../../features/sidebar/components/StickyDrawer";
import { TemporaryDrawer } from "../../features/sidebar/components/TemporaryDrawer";
import { UserCard } from "../../features/sidebar/components/UserCard";
import { LogoutButton } from "../../features/sidebar/components/LogoutButton";

export const Sidebar = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [toggled, setToggled] = useState(false);
  const handleDrawerToggle = () => {
    setToggled(!toggled);
  };
  const drawerContent = (
    <Box
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Box>
        <UserCard />
        <Box>
          <Stack
            direction={"column"}
            sx={{ color: `${theme.palette.grey[500]}` }}
          >
            <SidebarSections />
          </Stack>
        </Box>
      </Box>
      <LogoutButton/>
    </Box>
  );

  return (
    <Box height={"100%"}>
      {isLargeScreen ? null : (
        <IconButton onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
      )}
      {isLargeScreen ? (
        <StickyDrawer>{drawerContent}</StickyDrawer>
      ) : (
        <TemporaryDrawer toggled={toggled} handleToggle={handleDrawerToggle}>
          {drawerContent}
        </TemporaryDrawer>
      )}
    </Box>
  );
};

import { Drawer, useTheme } from "@mui/material";
import { ReactNode } from "react";

export const StickyDrawer = ({ children }: { children: ReactNode }) => {
  const drawerWidth = 280;
  const theme = useTheme();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: `${theme.palette.primary.main}`,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {children}
    </Drawer>
  );
};

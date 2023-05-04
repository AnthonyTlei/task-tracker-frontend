import { Drawer, useTheme } from "@mui/material";
import { ReactNode } from "react";

export const TemporaryDrawer = ({
  children,
  toggled,
  handleToggle,
}: {
  children: ReactNode;
  toggled: boolean;
  handleToggle: () => void;
}) => {
  const drawerWidth = 280;
  const theme = useTheme();
  return (
    <Drawer
      open={toggled}
      onClose={handleToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: `${theme.palette.primary.main}`,
          backgroundImage: "none",
        },
      }}
      variant="temporary"
      anchor="left"
    >
      {children}
    </Drawer>
  );
};

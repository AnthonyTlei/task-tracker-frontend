import { Inbox, Logout, Menu } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export const Sidebar = () => {
  const drawerWidth = 280;
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box height={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
      <Box>
        <Box height={"100px"} alignItems={"center"} display={"flex"} px={3} marginBottom={"15px"}>
          <Avatar
            alt="user-profile-pic"
            sx={{
              width: "56px",
              height: "56px",
              margin: "0 20px 0 0",
              backgroundColor: `${theme.palette.secondary.main}`,
            }}
          >
            U
          </Avatar>
          <Box width={"56px"}>
            <Typography color={"white"} fontSize={"18px"} fontWeight={"bold"}>
              User
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box>
          <Stack
            direction={"column"}
            sx={{ color: `${theme.palette.primary.contrastText}` }}
          >
            <List sx={{ padding: "0px 15px" }}>
              {["Overview", "My Tasks", "Checklist", "Settings"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding sx={{}}>
                    <ListItemButton
                      sx={{
                        margin: "0px 0px 5px 0px",
                        "&:hover": {
                          backgroundColor: `${theme.palette.secondary.contrastText}`,
                          backgroundBlendMode: "lighten",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: "35px" }}>
                        <Inbox color="secondary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: "14px" }}
                        primary={text}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Stack>
        </Box>
        <Divider />
      </Box>
      <Box p={"10px"}>
        <IconButton color="secondary" sx={{cursor: "pointer"}}><Logout/></IconButton>
      </Box>
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
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: `${theme.palette.primary.main}}`,
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: `${theme.palette.primary.main}}`,
            },
          }}
          variant="temporary"
          anchor="left"
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

/*

<Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>

*/

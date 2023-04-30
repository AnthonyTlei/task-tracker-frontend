import {
  Assignment,
  Checklist,
  Inbox,
  Logout,
  Menu,
  Summarize,
} from "@mui/icons-material";
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
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../hooks/redux/redux-hooks";

export const Sidebar = () => {
  const drawerWidth = 280;
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const drawerContent = (
    <Box
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Box>
        <Box
          height={"100px"}
          alignItems={"center"}
          display={"flex"}
          px={3}
          marginBottom={"15px"}
        >
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
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    margin: "0px 0px 5px 0px",
                    "&:hover": {
                      backgroundColor: `${theme.palette.secondary.contrastText}`,
                      backgroundBlendMode: "lighten",
                      borderRadius: "10px",
                    },
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "35px" }}>
                    <Summarize color="secondary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary={"Overview"}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    margin: "0px 0px 5px 0px",
                    "&:hover": {
                      backgroundColor: `${theme.palette.secondary.contrastText}`,
                      backgroundBlendMode: "lighten",
                      borderRadius: "10px",
                    },
                  }}
                  onClick={() => {
                    navigate("/checklist");
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "35px" }}>
                    <Checklist color="secondary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary={"Checklist"}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    margin: "0px 0px 5px 0px",
                    "&:hover": {
                      backgroundColor: `${theme.palette.secondary.contrastText}`,
                      backgroundBlendMode: "lighten",
                      borderRadius: "10px",
                    },
                  }}
                  onClick={() => {
                    navigate("/tasks");
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "35px" }}>
                    <Assignment color="secondary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary={"My Tasks"}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
        </Box>
        <Divider />
      </Box>
      <Box p={"10px"}>
        <IconButton
          color="secondary"
          sx={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <Logout />
        </IconButton>
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

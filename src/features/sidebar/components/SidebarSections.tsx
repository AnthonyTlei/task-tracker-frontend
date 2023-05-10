import {
  Summarize,
  Checklist,
  Assignment,
  AdminPanelSettings,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Section } from "../models/section";
import { createElement } from "react";
import authService from "../../auth/services/auth.service";
import { UserRole } from "../../auth/models/userRole";
import { useActiveSection } from "../../../contexts/ActiveSectionContext";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Summarize":
      return Summarize;
    case "Checklist":
      return Checklist;
    case "Assignment":
      return Assignment;
    case "AdminPanelSettings":
      return AdminPanelSettings;
    default:
      return Summarize;
  }
};

export const SidebarSections = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userRole = authService.getUserRole();
  const isAdmin =
    userRole === UserRole.ADMIN || userRole === UserRole.SUPERADMIN;
  const sections: Section[] = [
    { id: "home", title: "Overview", path: "/", icon: "Summarize" },
    { id: "list", title: "All Tasks", path: "/checklist", icon: "Checklist" },
    { id: "tasks", title: "My Tasks", path: "/tasks", icon: "Assignment" },
  ];
  const adminSection: Section = {
    id: "admin",
    title: "Admin Dashboard",
    path: "/admin",
    icon: "AdminPanelSettings",
  };
  const { activeSection } = useActiveSection();

  if (isAdmin) {
    sections.push(adminSection);
  }

  return (
    <List sx={{ padding: "0px 15px" }}>
      {sections.map((section) => (
        <ListItem disablePadding key={section.id}>
          <ListItemButton
            sx={{
              margin: "0px 0px 5px 0px",
              "&:hover": {
                backgroundColor: `${theme.palette.background.default}`,
                backgroundBlendMode: "lighten",
                borderRadius: "10px",
              },
              backgroundColor:
                activeSection === section.id
                  ? `${theme.palette.background.default}`
                  : "none",
              backgroundBlendMode: "lighten",
              borderRadius: activeSection === section.id ? `10px` : "0",
            }}
            onClick={() => {
              navigate(`${section.path}`);
            }}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              {createElement(getIcon(section.icon), {
                style: {
                  color:
                    activeSection === section.id
                      ? `${theme.palette.secondary.main}`
                      : `${theme.palette.grey[500]}`,
                },
                fontSize: "small",
              })}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  fontWeight={"bold"}
                  fontSize={"14px"}
                  color={
                    section.id === activeSection
                      ? theme.palette.grey[100]
                      : theme.palette.grey[500]
                  }
                >
                  {section.title}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

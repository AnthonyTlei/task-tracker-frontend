import { Summarize, Checklist, Assignment } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Section } from "../models/section";
import { createElement } from "react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Summarize":
      return Summarize;
    case "Checklist":
      return Checklist;
    case "Assignment":
      return Assignment;
    default:
      return Summarize;
  }
};

export const SidebarSections = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const sections: Section[] = [
    { id: "overview", title: "Overview", path: "/", icon: "Summarize" },
    { id: "list", title: "All Tasks", path: "/checklist", icon: "Checklist" },
    { id: "tasks", title: "My Tasks", path: "/tasks", icon: "Assignment" },
  ];

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
            }}
            onClick={() => {
              navigate(`${section.path}`);
            }}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              {createElement(getIcon(section.icon), {
                color: "secondary",
                fontSize: "small",
              })}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: "14px" }}
              primary={section.title}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

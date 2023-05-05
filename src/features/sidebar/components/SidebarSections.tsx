import { Summarize, Checklist, Assignment } from "@mui/icons-material";
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
import { createElement, useEffect, useState } from "react";

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
  const [selection, setSelection] = useState("overview");

  useEffect(() => {
  }, [selection]);

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
                selection === section.id
                  ? `${theme.palette.background.default}`
                  : "none",
              backgroundBlendMode: "lighten",
              borderRadius: selection === section.id ? `10px` : "0",
            }}
            onClick={() => {
              navigate(`${section.path}`);
              setSelection(section.id);
            }}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              {createElement(getIcon(section.icon), {
                style: {
                  color:
                    selection === section.id
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
                    section.id === selection
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

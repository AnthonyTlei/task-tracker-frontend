import { Visibility } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  CardActionArea,
  useTheme,
} from "@mui/material";
import React from "react";

export interface TaskCardProps {
  id: string;
  title: string;
  status: string;
  manager: string;
  assignee: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  status,
  manager,
  assignee,
}) => {
  const theme = useTheme();
  return (
    <Card sx={{ width: "250px", height: "auto", borderRadius: "10px" }}>
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Box p={2}>
            <Typography variant="body2" color={"secondary"}>
              {id}
              <Divider />
              {title}
              <Divider />
              {status}
              <Divider />
              {assignee}
              <Divider />
              {manager}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActionArea>
        <Divider />
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          p={"3px"}
        >
          <Visibility
            fontSize="small"
            sx={{ color: `${theme.palette.primary.light}` }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
};

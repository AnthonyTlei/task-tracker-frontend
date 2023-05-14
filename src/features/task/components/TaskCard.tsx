import { Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  CardActionArea,
  useTheme,
  CardHeader,
} from "@mui/material";
import React from "react";
import { StatusPill } from "../../../shared/components/StatusPill";
import { TaskStatus } from "../models/task";
import { formatDate } from "../../../shared/utilities/date.utils";

export interface TaskCardProps {
  id: number;
  full_id: string;
  title: string;
  status: string;
  manager: string;
  date_assigned?: Date;
  date_completed?: Date;
  handleEditClicked: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  full_id,
  title,
  status,
  manager,
  date_assigned,
  date_completed,
  handleEditClicked,
}) => {
  const theme = useTheme();
  const date_assigned_local = date_assigned ? formatDate(date_assigned) : "";
  const date_completed_local = date_completed ? formatDate(date_completed) : "";
  return (
    <Card sx={{ width: "250px", height: "auto", borderRadius: "10px" }}>
      <CardHeader
        title={
          <Typography variant="h6" color={"common.white"} fontWeight={"bold"}>
            {full_id}
          </Typography>
        }
        subheader={
          <Box>
            <StatusPill status={status as TaskStatus} />
            <Typography variant="body2" color={"grey.500"}>
              {manager} {date_assigned_local} {date_completed_local}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="body1" color={"common.white"}>
            {title}
          </Typography>
        </Box>
      </CardContent>
      <CardActionArea onClick={handleEditClicked}>
        <Divider />
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          p={"3px"}
        >
          <Edit
            fontSize="small"
            sx={{ color: `${theme.palette.primary.light}` }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
};

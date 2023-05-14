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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
  // TODO: refactor dates as a context and utilities
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const server_timezone = "Etc/UTC";
  const local_timezone = dayjs.tz.guess();
  const date_assigned_local = date_assigned
    ? dayjs(date_assigned)
        .tz(server_timezone)
        .tz(local_timezone)
        .format("MM/DD/YYYY")
    : "";
  const date_completed_local = date_completed
    ? dayjs(date_completed)
        .tz(server_timezone)
        .tz(local_timezone)
        .format("MM/DD/YYYY")
    : "";
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

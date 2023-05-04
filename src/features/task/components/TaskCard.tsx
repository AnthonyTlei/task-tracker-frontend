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
  TextField,
} from "@mui/material";
import React from "react";
import { StatusPill } from "../../../shared/components/StatusPill";
import { TaskStatus } from "../models/task";

export interface TaskCardProps {
  id: number;
  full_id: string;
  title: string;
  status: string;
  manager: string;
  handleEditClicked: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  full_id,
  title,
  status,
  manager,
  handleEditClicked,
}) => {
  const theme = useTheme();
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
            <Typography variant="body2" color={"grey.500"}>{manager}</Typography>
          </Box>
        }
      />
      <CardContent>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="body1" color={"common.white"}>{title}</Typography>
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

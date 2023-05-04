import { Box } from "@mui/material";
import { TaskStatus } from "../../features/task/models/task";

export const StatusPill = ({ status }: { status: TaskStatus }) => {
  const getColorFromStatus = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.DONE:
      case TaskStatus.VALIDATING:
        return "rgb(16, 185, 129);";
      case TaskStatus.PROGRESS:
      case TaskStatus.BACKLOG:
        return "rgb(6, 174, 212);";
      case TaskStatus.PAUSED:
        return "rgb(247, 144, 9)";
      case TaskStatus.CANCELLED:
        return "rgb(240, 68, 56);";
    }
  };
  return <Box sx={{ color: getColorFromStatus(status) }} fontWeight={"bold"}>
    {status.toUpperCase()}
  </Box>;
};

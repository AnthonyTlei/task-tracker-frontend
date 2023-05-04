import { Box, Typography, useTheme } from "@mui/material";
import { TaskStatus } from "../../features/task/models/task";

export const StatusPill = ({ status }: { status: TaskStatus }) => {
  // TODO: make this component return either a Pill or a Text with editable font sizes.
  const theme = useTheme();
  const getColorFromStatus = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.DONE:
      case TaskStatus.VALIDATING:
        return theme.palette.status.success;
      case TaskStatus.PROGRESS:
      case TaskStatus.BACKLOG:
        return theme.palette.status.progress;
      case TaskStatus.PAUSED:
        return theme.palette.status.pending;
      case TaskStatus.CANCELLED:
        return theme.palette.status.rejected;
    }
  };
  return (
    <Box sx={{ color: getColorFromStatus(status) }}>
      <Typography variant="body2" fontWeight={"500"}>
        {status.toUpperCase()}
      </Typography>
    </Box>
  );
};

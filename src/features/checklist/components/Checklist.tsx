import { Box, Typography } from "@mui/material";
import TaskTable from "./TaskTable";

export const Checklist = () => {
  return (
    <Box p={3} width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={5}
      >
        <Typography variant={"h4"} fontWeight={"500"} color={"primary"}>
          Checklist
        </Typography>
      </Box>
      <TaskTable/>
    </Box>
  );
};

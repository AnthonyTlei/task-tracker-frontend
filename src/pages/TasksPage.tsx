import { Box } from "@mui/material";
import { TaskList } from "../features/task/components/TaskList";

const TasksPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <TaskList />
    </Box>
  );
};

export default TasksPage;

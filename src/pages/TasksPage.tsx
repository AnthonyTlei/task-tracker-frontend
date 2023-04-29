import { Sidebar } from "../shared/components/Sidebar";
import { Box } from "@mui/material";
import { TaskList } from "../features/tasks/components/TaskList";

const TasksPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <Sidebar />
      <TaskList/>
    </Box>
  );
};

export default TasksPage;

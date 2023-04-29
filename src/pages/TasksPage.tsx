import { Sidebar } from "../shared/components/Sidebar";
import { Box } from "@mui/material";
import { Tasks } from "../features/tasks/components/Tasks";

const TasksPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <Sidebar />
      <Tasks/>
    </Box>
  );
};

export default TasksPage;

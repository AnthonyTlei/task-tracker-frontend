import { Sidebar } from "../shared/components/Sidebar";
import { Box } from "@mui/material";
import { TaskList } from "../features/task/components/TaskList";
import { SettingsLayout } from "../shared/components/SettingsLayout";

const TasksPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <SettingsLayout />
      <Sidebar />
      <TaskList />
    </Box>
  );
};

export default TasksPage;

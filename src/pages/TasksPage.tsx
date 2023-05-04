import { Box } from "@mui/material";
import { TaskList } from "../features/task/components/TaskList";
import { useActiveSection } from "../contexts/ActiveSectionContext";
import { useEffect } from "react";

const TasksPage = () => {
  const { setActiveSection } = useActiveSection();
  useEffect(() => {
    setActiveSection("tasks");
    return () => {
      setActiveSection(null);
    };
  }, [setActiveSection]);
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <TaskList />
    </Box>
  );
};

export default TasksPage;

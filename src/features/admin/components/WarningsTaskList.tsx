import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux/redux-hooks";
import { TaskCard } from "../../task/components/TaskCard";
import { Task } from "../../task/models/task";

export const WarningsTaskList = () => {
  const { importResult: results } = useAppSelector((state) => state.task);

  return (
    <Box p={3} width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={5}
      >
        <Typography variant={"h4"} fontWeight={"500"} color={"common.white"}>
          Tasks imported with warnings
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={10}>
          {results?.warnings.map((task: Task) => (
            <Grid item key={task.id}>
              <TaskCard
                id={task.id}
                full_id={task.full_id}
                title={task.title}
                status={task.status}
                manager={task.manager}
                handleEditClicked={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

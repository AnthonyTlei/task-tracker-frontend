import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux/redux-hooks";
import { TaskWithError } from "../../task/models/task";
import { TaskCard } from "../../task/components/TaskCard";

export const FailsTaskList = () => {
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
          Tasks that failed to import
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={10}>
          {results?.fails.map((error: TaskWithError) => (
            <Grid item key={error.task.id}>
              <TaskCard
                id={error.task.id}
                full_id={error.task.full_id}
                title={error.task.title}
                status={error.task.status}
                manager={error.task.manager}
                handleEditClicked={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

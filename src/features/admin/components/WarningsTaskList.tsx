import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux/redux-hooks";
import { TaskCard } from "../../task/components/TaskCard";
import { TaskWithWarning } from "../../task/models/task";

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
          {results?.warnings.map((warning: TaskWithWarning) => (
            <Grid item key={warning.task.id}>
              <TaskCard
                id={warning.task.id}
                full_id={warning.task.full_id}
                title={warning.task.title}
                status={warning.task.status}
                manager={warning.task.manager}
                handleEditClicked={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

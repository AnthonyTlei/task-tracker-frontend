import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { TaskCard } from "./TaskCard";

export const TaskList = () => {
  return (
    <Box p={3} width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={5}
      >
        <Typography variant={"h4"} fontWeight={"500"} color={"primary"}>
          My Tasks
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: "10px" }}
        >
          <Add sx={{ color: "white" }} />
          <Typography color={"white"} paddingLeft={2}>
            New Task
          </Typography>
        </Button>
      </Box>
      <Box>
        <Grid container spacing={10}>
          <Grid item>
            <TaskCard id="P10000-1" title="Task 1" status="Status 1" assignee="Assignee 1" manager="Manager 1"/>
          </Grid>
          <Grid item>
            <TaskCard id="P10000-2" title="Task 2" status="Status 2" assignee="Assignee 2" manager="Manager 2"/>
          </Grid>
          <Grid item>
            <TaskCard id="P10000-3" title="Task 3" status="Status 3" assignee="Assignee 3" manager="Manager 3"/>
          </Grid>
          <Grid item>
            <TaskCard id="P10000-4" title="Task 4" status="Status 4" assignee="Assignee 4" manager="Manager 4"/>
          </Grid>
          <Grid item>
            <TaskCard id="P10000-5" title="Task 5" status="Status 5" assignee="Assignee 5" manager="Manager 5"/>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

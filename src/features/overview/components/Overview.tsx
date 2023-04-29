import { Add, CheckBox, Pending, Storage } from "@mui/icons-material";
import { Box, Typography, Button, Grid } from "@mui/material";
import { OverviewCard } from "./TaskCard";

export const Overview = () => {
  return (
    <Box p={3} width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={5}
      >
        <Typography variant={"h4"} fontWeight={"500"} color={"primary"}>
          Overview
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: "10px" }}
        >
          <Add sx={{ color: "white" }} />
          <Typography color={"white"} paddingLeft={2}>
            New Note
          </Typography>
        </Button>
      </Box>
      <Grid container spacing={5}>
        <Grid item>
          <OverviewCard title="Done" count={11} Icon={CheckBox} />
        </Grid>
        <Grid item>
          <OverviewCard title="In Progress" count={3} Icon={Pending} />
        </Grid>
        <Grid item>
          <OverviewCard title="Backlog" count={7} Icon={Storage} />
        </Grid>
      </Grid>
    </Box>
  );
};

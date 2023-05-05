import { FileDownload } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Backdrop,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import React, { useState } from "react";
import taskService from "../../task/services/task.service";

export const AdminDashboard = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [openImport, setOpenImport] = useState(false);

  const handleImport = () => {
    setOpenImport(false);
  };

  const handleCancel = () => {
    setOpenImport(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const tasks = await taskService.importTasks(file);
      // TODO: handle server error (duplicate id)
      // TODO: either modify the tasks in taskSLice or use dispatcher to import (OPTIMAL)
      console.log(tasks);
    }
  };

  return (
    <Box p={3} width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={5}
        marginTop={isLargeScreen ? 0 : 5}
      >
        <Typography variant={"h4"} fontWeight={"500"} color={"common.white"}>
          Admin Dashboard
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          borderRadius: "10px",
          backgroundColor: `${theme.palette.status.success}`,
        }}
        onClick={() => setOpenImport(true)}
        endIcon={<FileDownload />}
      >
        <Typography color={"white"}>Import From Excel</Typography>
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openImport}
      >
        <Card sx={{ width: "350px", height: "auto", borderRadius: "10px" }}>
          <CardHeader title="Import Tasks" sx={{ margin: "0 8px" }} />
          <CardContent>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Box p={1} width={"100%"}>
                <Button variant="contained" component="label">
                  Upload File{" "}
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Box
              p={2}
              width={"100%"}
              display={"flex"}
              flexDirection={"row-reverse"}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={handleImport}
              >
                Import
              </Button>
              <Button
                onClick={handleCancel}
                sx={{ color: "common.white", marginRight: "10px" }}
              >
                Cancel
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Backdrop>
    </Box>
  );
};

import { FileDownload } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { importTasks } from "../../task/taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import { useAppDispatch } from "../../../hooks/redux/redux-hooks";

export const AdminDashboard = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const token = useToken();
  const dispatch = useAppDispatch();

  const handleFileChange = async (
    // TODO: adapt to new ImportResults
    // TODO: add loading indicator
    // TODO: add help button that shows excel format
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(importTasks({ token, file }));
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
        endIcon={<FileDownload />}
        component="label"
      >
        <Typography color={"white"}>Import From Excel</Typography>
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
    </Box>
  );
};

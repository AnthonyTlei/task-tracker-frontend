import { Delete } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { deleteAllTasks } from "../../task/taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { LoadingButton } from "../../../shared/components/LoadingButton";
import { ExcelImport } from "./ExcelImport";

export const AdminDashboard = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const token = useToken();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.task);

  const handleFlushTasks = () => {
    dispatch(deleteAllTasks({ token }));
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
      <ExcelImport />
      <Box p={2}>
        <LoadingButton
          content="Delete All Tasks"
          icon={<Delete />}
          isLoading={isLoading}
          onClick={handleFlushTasks}
          color={theme.palette.status.rejected}
        />
      </Box>
    </Box>
  );
};

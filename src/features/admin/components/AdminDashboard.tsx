import { Delete, Settings, Upload } from "@mui/icons-material";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { deleteAllTasks, importTasks } from "../../task/taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { useRef, useState } from "react";
import ConfirmDialog from "../../../shared/components/ConfirmationDialog";
import { LoadingButton } from "../../../shared/components/LoadingButton";

export const AdminDashboard = () => {
  // TODO: refactor AdminDashboard LOL
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const token = useToken();
  const dispatch = useAppDispatch();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importLoading, importSuccess, importResult, isLoading } =
    useAppSelector((state) => state.task);

  const handleFileChange = async (
    // TODO: add help button that shows excel format
    // TODO: adapt to import tasks options
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setConfirmationOpen(true);
      setFile(file);
    }
  };

  const cleanUp = () => {
    setConfirmationOpen(false);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImportConfirm = () => {
    if (file) {
      dispatch(importTasks({ token, file }));
    }
    cleanUp();
  };

  const handleImportCancel = () => {
    cleanUp();
  };

  const handleFlushTasks = () => {
    dispatch(deleteAllTasks({ token }));
  };

  const Results = () => {
    // TODO: display these in a Card (sort of like the score after you win a game)
    return (
      <Box p={1}>
        <Typography variant={"h6"}>Import Results</Typography>
        <Typography variant={"body1"} color={"status.success"}>
          Success: {importResult.success.length} Tasks
        </Typography>
        <Typography variant={"body1"} color={"status.rejected"}>
          Fails: {importResult.fails.length} Tasks
        </Typography>
      </Box>
    );
  };

  const ExcelImportInput = () => {
    return (
      <Box>
        <Typography color={"white"}>Import From Excel</Typography>
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </Box>
    );
  };

  const ExcelImportButton = () => {
    return (
      <Box>
        <LoadingButton
          content={<ExcelImportInput />}
          icon={<Upload />}
          isLoading={importLoading}
          color={theme.palette.status.success}
        />
      </Box>
    );
  };

  const ExcelImportConfigButton = () => {
    return (
      <IconButton
        sx={{
          backgroundColor: `${theme.palette.status.success}`,
          borderRadius: "10px",
        }}
      >
        <Settings fontSize="small" />
      </IconButton>
    );
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
      <Box
        p={2}
        display={"flex"}
        justifyContent={"space-between"}
        width={"300px"}
      >
        <ExcelImportButton />
        <ExcelImportConfigButton />
      </Box>
      <Box p={2}>
        <LoadingButton
          content="Delete All Tasks"
          icon={<Delete />}
          isLoading={isLoading}
          onClick={handleFlushTasks}
          color={theme.palette.status.rejected}
        />
      </Box>
      <Box p={2}>{importSuccess && <Results />}</Box>
      <ConfirmDialog
        open={confirmationOpen}
        title="Are you sure you want to proceed?"
        content="This will override all the currently stored tasks."
        onConfirm={handleImportConfirm}
        onCancel={handleImportCancel}
      />
    </Box>
  );
};

import { FileDownload } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { importTasks } from "../../task/taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { useRef, useState } from "react";

export const AdminDashboard = () => {
  // TODO: refactor AdminDashboard
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const token = useToken();
  const dispatch = useAppDispatch();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoading, isSuccess, importResult } = useAppSelector(
    (state) => state.task
  );

  const handleFileChange = async (
    // TODO: adapt to new ImportResults
    // TODO: add loading indicator
    // TODO: add help button that shows excel format
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

  // TODO: make the icon change into a loading indicator instead :P
  if (isLoading) {
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;
  }

  const ConfirmDialog = () => {
    return (
      <Dialog
        open={confirmationOpen}
        onClose={() => {
          setConfirmationOpen(false);
        }}
        maxWidth="sm"
        fullWidth
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <DialogTitle>Are you sure you want to proceed?</DialogTitle>
        <DialogContent>
          This will override all the currently stored tasks.
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleImportCancel}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleImportConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const Results = () => {
    return <Box p={1}>
      <Typography variant={"h6"}>Import Results</Typography>
      <Typography variant={"body1"} color={"status.success"}>Success: {importResult.success.length} Tasks</Typography>
      <Typography variant={"body1"} color={"status.rejected"}>Fails: {importResult.fails.length} Tasks</Typography>
    </Box>;
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
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </Button>
      {isSuccess && <Results />}
      <ConfirmDialog />
    </Box>
  );
};

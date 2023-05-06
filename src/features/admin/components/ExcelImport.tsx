import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "../../../shared/components/LoadingButton";
import { Settings, Upload } from "@mui/icons-material";
import { useRef, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { importTasks } from "../../task/taskSlice";
import { useToken } from "../../../hooks/redux/useToken";
import ConfirmDialog from "../../../shared/components/ConfirmationDialog";

export const ExcelImport = () => {
  const theme = useTheme();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importLoading } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const token = useToken();
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

  return (
    <>
      <Box
        p={2}
        display={"flex"}
        justifyContent={"space-between"}
        width={"300px"}
      >
        <LoadingButton
          content={<ExcelImportInput />}
          icon={<Upload />}
          isLoading={importLoading}
          color={theme.palette.status.success}
        />
        <IconButton
          sx={{
            backgroundColor: `${theme.palette.status.success}`,
            borderRadius: "10px",
          }}
        >
          <Settings fontSize="small" />
        </IconButton>
      </Box>
      <ConfirmDialog
        open={confirmationOpen}
        title="Are you sure you want to proceed?"
        content="This will override all the currently stored tasks."
        onConfirm={handleImportConfirm}
        onCancel={handleImportCancel}
      />
    </>
  );
};

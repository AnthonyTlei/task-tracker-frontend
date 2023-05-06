import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ImportOptions } from "../../task/models/importTasks";
import { useAppDispatch } from "../../../hooks/redux/redux-hooks";
import { setImportOptions } from "../../task/taskSlice";

interface ExcelImportConfigProps {
  open: boolean;
  onClose: () => void;
}

export const ExcelImportConfig: React.FC<ExcelImportConfigProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [config, setConfig] = useState<ImportOptions>({
    idColName: "",
    titleColName: "",
    assigneeColName: "",
    statusColName: "",
    managerColName: "",
  });
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ImportOptions
  ) => {
    setConfig({
      ...config,
      [field]: e.target.value,
    });
  };
  const handleSave = () => {
    dispatch(setImportOptions(config));
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Card sx={{ width: "350px", height: "auto", borderRadius: "10px" }}>
        <CardHeader
          title="Configure Importing From Excel"
          sx={{ margin: "0 8px" }}
        />
        <CardContent>
          <Stack spacing={1} p={1}>
            <TextField
              label={"ID Column Name"}
              variant="standard"
              color="secondary"
              value={config.idColName}
              onChange={(e) => handleFieldChange(e, "idColName")}
            />
            <TextField
              label={"Title Column Name"}
              variant="standard"
              color="secondary"
              value={config.titleColName}
              onChange={(e) => handleFieldChange(e, "titleColName")}
            />
            <TextField
              label={"Assignee Column Name"}
              variant="standard"
              color="secondary"
              value={config.assigneeColName}
              onChange={(e) => handleFieldChange(e, "assigneeColName")}
            />
            <TextField
              label={"Manager Column Name"}
              variant="standard"
              color="secondary"
              value={config.managerColName}
              onChange={(e) => handleFieldChange(e, "managerColName")}
            />
            <TextField
              label={"Status Column Name"}
              variant="standard"
              color="secondary"
              value={config.statusColName}
              onChange={(e) => handleFieldChange(e, "statusColName")}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Box
            p={2}
            width={"100%"}
            display={"flex"}
            flexDirection={"row-reverse"}
          >
            <Button color="secondary" variant="contained" onClick={handleSave}>
              Save
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
  );
};

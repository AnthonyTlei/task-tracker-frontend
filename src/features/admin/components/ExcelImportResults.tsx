import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Backdrop,
  Card,
  CardContent,
  Stack,
  CardHeader,
} from "@mui/material";
import { useAppSelector } from "../../../hooks/redux/redux-hooks";
import { Link } from "react-router-dom";

export const ExcelImportResults = () => {
  const { importResult } = useAppSelector((state) => state.task);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Button variant="contained" color="secondary" onClick={handleToggle}>
        View Import Results
      </Button>
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardHeader title="Import Results" />
          <CardContent>
            <Stack spacing={2} display={"flex"} alignItems={"start"}>
              <Button component={Link} to={"import/success"}>
                <Typography variant="body1" color="status.success">
                  Success: {importResult.success.length} Tasks
                </Typography>
              </Button>
              <Button component={Link} to={"import/warnings"}>
                <Typography variant="body1" color="status.pending">
                  Warnings: {importResult.warnings.length} Tasks
                </Typography>
              </Button>
              <Button component={Link} to={"import/fails"}>
                <Typography variant="body1" color="status.rejected">
                  Fails: {importResult.fails.length} Tasks
                </Typography>
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Backdrop>
    </Box>
  );
};

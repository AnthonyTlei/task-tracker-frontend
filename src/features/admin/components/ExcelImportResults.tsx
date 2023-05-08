import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Backdrop,
  Card,
  CardContent,
} from '@mui/material';
import { useAppSelector } from '../../../hooks/redux/redux-hooks';

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
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h6">Import Results</Typography>
            <Typography variant="body1" color="status.success">
              Success: {importResult.success.length} Tasks
            </Typography>
            <Typography variant="body1" color="status.pending">
              Warnings: {importResult.warnings.length} Tasks
            </Typography>
            <Typography variant="body1" color="status.rejected">
              Fails: {importResult.fails.length} Tasks
            </Typography>
          </CardContent>
        </Card>
      </Backdrop>
    </Box>
  );
};

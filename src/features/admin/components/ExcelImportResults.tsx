import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux/redux-hooks";

export const ExcelImportResults = () => {
  const { importResult } = useAppSelector((state) => state.task);
  // TODO: display these in a Card (sort of like the score after you win a game)
  return (
    <Box p={1}>
      <Typography variant={"h6"}>Import Results</Typography>
      <Typography variant={"body1"} color={"status.success"}>
        Success: {importResult.success.length} Tasks
      </Typography>
      <Typography variant={"body1"} color={"status.pending"}>
        Success: {importResult.warnings.length} Tasks
      </Typography>
      <Typography variant={"body1"} color={"status.rejected"}>
        Fails: {importResult.fails.length} Tasks
      </Typography>
    </Box>
  );
};

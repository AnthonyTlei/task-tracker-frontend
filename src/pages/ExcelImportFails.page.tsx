import { Box } from "@mui/material";
import { FailsTaskList } from "../features/admin/components/FailsTaskList";

const ExcelImportFailsPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <FailsTaskList />
    </Box>
  );
};

export default ExcelImportFailsPage;

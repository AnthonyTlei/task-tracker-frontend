import { Box } from "@mui/material";
import { WarningsTaskList } from "../features/admin/components/WarningsTaskList";

const ExcelImportWarningsPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <WarningsTaskList/>
    </Box>
  );
};

export default ExcelImportWarningsPage;

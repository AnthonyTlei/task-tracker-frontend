import { Box } from "@mui/material";
import { SuccessTaskList } from "../features/admin/components/SuccessTaskList";

const ExcelImportSuccessPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <SuccessTaskList/>
    </Box>
  );
};

export default ExcelImportSuccessPage;

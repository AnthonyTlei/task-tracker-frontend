import { Box } from "@mui/material";
import { Overview } from "../features/overview/components/Overview";

const ExcelImportWarningsPage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <Overview />
    </Box>
  );
};

export default ExcelImportWarningsPage;

import { Sidebar } from "../shared/components/Sidebar";
import { Box } from "@mui/material";
import { Overview } from "../features/overview/components/Overview";

const HomePage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <Sidebar />
      <Overview />
    </Box>
  );
};

export default HomePage;

import { Box } from "@mui/material";
import { Overview } from "../features/overview/components/Overview";

const HomePage = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
      <Overview />
    </Box>
  );
};

export default HomePage;

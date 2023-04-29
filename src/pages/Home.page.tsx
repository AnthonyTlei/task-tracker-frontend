import { useTheme } from "@mui/material/styles";
import { Sidebar } from "../shared/components/Sidebar";

const HomePage = () => {
  const theme = useTheme();
  return (
    <Sidebar/>
  );
};

export default HomePage;

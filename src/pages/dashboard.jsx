import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import Appbar from "../components/dashboard/sidebar";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <Box
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Appbar />
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;

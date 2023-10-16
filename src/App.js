import logo from './logo.svg';
import './App.css';
import {Box, Card, CardContent, CardHeader, Grid, Stack, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom"
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/login"
import Signup from "./pages/signup"
import Dashboard from "./pages/dashboard"
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyOders from "./pages/orders";
import CreateOrder from "./pages/create-order";
import OrdersView from "./pages/view-order";
import ListUser from "./pages/list-user";
function App() {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}
    >
    <Routes>
      <Route
        path="/"
        element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }
      />
      <Route
        path="signup"
        element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        }
      />
      <Route
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="dashboard/orders" element={<MyOders />} />
        <Route path="dashboard/create-order" element={<CreateOrder />} />
        <Route path="dashboard/view-order/:orderId" element={<OrdersView />} />
        <Route path="dashboard/list-user" element={<ListUser />} />







      </Route>


    </Routes>
    </Box>
  );
}

export default App;

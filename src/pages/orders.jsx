

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getAllOrders, getUserOrders} from '../services/operations/orderDetailsAPI';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

function Orders() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      console.log("getUserOrders user",user)
      if(user.accountType==="Customer"){
        console.log("IN CUSTOMEREE",user.accountType)
          const res = await getUserOrders(user._id, user.token, setOrders);
        setOrders(res?.data?.data);
      }
      else if(user.accountType==="Transporter"){
        const res =await getAllOrders(user.token)
        setOrders(res?.data);
        console.log("IN TRANSPORTER",orders,res?.data)

      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(user.accountType === "Admin"){
      navigate('/dashboard/list-user');
    }
    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/dashboard/view-order/${orderId}`);
  };



  return (
    <Box
      style={{ minHeight: '100vh',minWidth:'70vw' }}
      justifyContent="center"
      alignItems="center"
    >
      <h1>Orders</h1>
      {
        orders?(
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Weight(Kg)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order?.name}</TableCell>
                    <TableCell>{order?.weight}</TableCell>
                    <TableCell> {!order?.Approved
                      ? 'Not Approved'
                      : order?.delivered
                        ? 'Delivered'
                        : order?.Status[order?.Status?.length - 1]?.title}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleViewOrder(order._id)}
                      >
                        View Order
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ):(
          <Typography variant="h5">Loading order details or oreder NOt Found...</Typography>
        )
      }

    </Box>
  );
}

export default Orders;

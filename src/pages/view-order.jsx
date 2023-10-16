

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {deleteOrder, getOrderDetails, markAsApproved, markAsDelivered} from '../services/operations/orderDetailsAPI';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DialogBox from '../components/dialog';
import {useBoolean} from "../hooks/use-boolean";

function OrdersView() {
  const dialog = useBoolean();
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const fetchOrderDetails = async () => {
    try {
      const res = await getOrderDetails(orderId, user.token);
      setOrder(res?.data);
      console.log("delivered status",order.Status[order.Status.length - 1])
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      // Add logic to cancel the order here.
      // Show a confirmation message to the user.
      const res=await deleteOrder(orderId,user._id,user.token);
      navigate('/dashboard/orders');
    } catch (error) {
      console.error(error);
    }
  };

  const handleApproveOrder = async () => {
    try {
      const res=await markAsApproved(orderId,user.token);
      navigate('/dashboard/orders');
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeliveredStatus = async () => {
    try {
      const res=await markAsDelivered(orderId,user.token);
      navigate('/dashboard/orders');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <Box style={{ minWidth:'70vw' }}
         justifyContent="center"
         alignItems="center" p={3}>
      {order ? (
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Order Details
          </Typography>
          <Typography variant="h6">Name: {order.name}</Typography>
          <Typography variant="body1">Weight: {order.weight}</Typography>
          <Typography variant="body1">Description: {order.Description}</Typography>
          <Typography variant="body1">Source: {order.Source}</Typography>
          <Typography variant="body1">Destination: {order.Destination}</Typography>
          <Typography variant="h6" gutterBottom>
            Statuses:
          </Typography>
          <ul>
            {order.Status.map((status) => (
              <li key={status._id}>
                {status.title} - {status.time}
              </li>
            ))}
            <li>
              {order.Approved
                ? order.delivered
                  ? 'Delivered'
                  : 'Approved'
                : 'Not Approved'}
            </li>
          </ul>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            {
              user.accountType === 'Transporter' && !order.Approved && !order.delivered &&(
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleApproveOrder}
                >
                  Approve Order
                </Button>
              )
            }
            {
              user.accountType === 'Transporter' && !order.delivered &&order.Approved && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleDeliveredStatus}
                >
                  Mark as Delivered
                </Button>
              )
            }
            {
              user.accountType === 'Customer' && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              )
            }
            {
              user.accountType === 'Transporter' && !order.delivered && order.Approved && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={dialog.onTrue}
                >
                  Change Status
                </Button>
              )
            }

            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/dashboard/orders')}
            >
              Back to Orders
            </Button>
          </Box>

        </Paper>
      ) : (
        <Typography variant="h5">Loading order details...</Typography>
      )}

      <DialogBox dialog={dialog} />


    </Box>
  );
}

export default OrdersView;

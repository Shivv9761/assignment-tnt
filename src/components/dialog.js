// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import FormProvider from "../components/formprovider/form-provider";
import RHFTextField from "../components/formprovider/rhf-text-field";
import {yupResolver} from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import * as yup from "yup";
import {Box, CircularProgress} from "@mui/material";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {createOrderStatus} from "../services/operations/status";
export default function FormDialog({dialog}) {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const yupSchema=yup.object().shape({
    statusTitle: yup.string().required(' Name is required'),
    statusDesc: yup.string().required(' Description is required'),
  })


  const defaultValues = {
    statusTitle: '',
    statusDesc: ''
  }
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
  })
  const {
          reset,
          watch,
          setValue,
          control,
          handleSubmit,
          getValues,
          formState: { isSubmitting, isValid, errors },
        } = methods;
  console.log("watch",watch(),errors)

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res=await createOrderStatus({...data,orderId},user.token);
      navigate(`/dashboard/orders`);
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div>
      <Dialog open={dialog.value} onClose={dialog.onFalse} fullWidth maxWidth='md'>
        <DialogTitle>Change Status</DialogTitle>

        <DialogContent>
          <FormProvider methods={methods} onSubmit={onSubmit}>

            <Stack spacing={3} sx={{p:3}}>

              <RHFTextField
                name="statusTitle"
                label="Status Name"
                placeholder="Enter Status Name"
              />
              <RHFTextField
                name="statusDesc"
                label="Status Description"
                placeholder="Enter Status Description"
              />



            </Stack>
            <DialogActions>
              <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </DialogActions>


          </FormProvider>


        </DialogContent>


      </Dialog>
    </div>
  );
}

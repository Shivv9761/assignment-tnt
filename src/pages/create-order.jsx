
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {TextField, Grid, Button, Typography, Paper, CircularProgress, InputAdornment} from '@mui/material';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import RHFTextField from "../components/formprovider/rhf-text-field";
import FormProvider from "../components/formprovider/form-provider";
import {createOrder} from "../services/operations/orderDetailsAPI";
import {useSelector} from "react-redux";

function OrderForm() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const yupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    Description: Yup.string().required('Description is required'),
    weight: Yup.string().required('Weight is required'),
    Source: Yup.string().required('Source is required'),
    Destination: Yup.string().required('Destination is required'),

  })

  const defaultValues = {
    name: '',
    Description: '',
    weight: '',
    Source: '',
    Destination: '',

  }

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
          reset,
          watch,
          setValue,
          control,
          handleSubmit,
          formState: { isSubmitting },
        } = methods;



  const onSubmit = handleSubmit(async (data) => {
    try {
      const res=await createOrder(data,user._id,user.token);
      if(res?.success){
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Order Details
      </Typography>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
         <RHFTextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
          />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="Description"
              label="Description"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
           <RHFTextField
              name="weight"
              type="number"
              label="Weight"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">Kg</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={6}>
           <RHFTextField
              name="Source"
              label="Source"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name="Destination"
              label="Destination"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth sx={{ mt:9}} variant="contained" color="primary" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </FormProvider>
    </Paper>
  );
}

export default OrderForm;

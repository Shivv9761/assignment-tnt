import {Button, Card, CardHeader, CircularProgress, Grid, Stack} from "@mui/material";
import FormProvider from "../components/formprovider/form-provider";
import {useForm} from "react-hook-form";
import {useMemo, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFTextField from "../components/formprovider/rhf-text-field";
import {RHFSelect} from "../components/formprovider/rhf-select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {sendOtp,signUp} from "../services/operations/authAPI";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [otpSent, setOtpSent] = useState(false);

  const yupSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    accountType: Yup.string().required('User accountType is required'),
    mobile: Yup.string().required('Phone is required').min(10,'Phone must be 10 digits').max(10,'Phone must be 10 digits'),
    email: Yup.string().required('Email is required').email('Email must be a valid email'),
    password: Yup.string().required('Password is required').min(4,'Password must be at least 8 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required').min(4,'Confirm Password must be at least 8 characters'),
    otp: otpSent
      ? Yup.string()
        .required('OTP is required')
        .length(6, 'OTP must be exactly 4 digits') // Assuming the OTP is 4 digits long
      : Yup.string(),
  });
  const defaultValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      accountType: 'Customer',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
    }),
    []
  );


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

  const sendOtpHandler = async (data) => {
    // Logic for sending OTP goes here
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    dispatch(sendOtp(data.email, setOtpSent))
    console.log('Sending OTP', data);
//    setOtpSent(true);
  };

  const registerUser = async (data) => {
    console.log('Registering user', data);
    dispatch(signUp(data, navigate))
    console.log('Registering user', data);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!otpSent) {
        await sendOtpHandler(data);
      } else {
        await registerUser(data);
        navigate('/');
        reset();
      }
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid
        container
        style={{ minHeight: '100vh' }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={11} sm={6} md={4} >
          <Card
            xs={{ p: 3, borderRadius: 2, boxShadow: 1 }}
          >
            <CardHeader title="Signup" />

            {
              otpSent ? (
                <Stack spacing={4} sx={{ p: 3 }} justifyContent="center" alignItems="center">

                  <RHFTextField
                    type="number"
                    name="otp"
                    label="Enter OTP"
                    variant="outlined"
                    fullWidth
                  />


                  <Button type="submit" fullWidth sx={{ mt:9}} variant="contained" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
                  </Button>

                </Stack>
              ):(
                <Stack spacing={4} sx={{ p: 3 }} justifyContent="center" alignItems="center">

                  <RHFTextField
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                  />

                  <RHFTextField
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                  />

                  <RHFSelect name="accountType" label="User Type">
                    {['Customer','Transporter'].map((status,index) => (
                      <MenuItem key={index} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </RHFSelect>

                  <RHFTextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />


                  <RHFTextField
                    type="number"
                    name="mobile"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                  />
                  <RHFTextField
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                  />

                  <RHFTextField
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                  />
                  <Button type="submit" fullWidth sx={{ mt:9}} variant="contained" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
                  </Button>

                </Stack>
              )
            }





          </Card>
        </Grid>
      </Grid>
    </FormProvider>

  )
}

export default Signup
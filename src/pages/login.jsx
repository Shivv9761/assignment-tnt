import {Button, Card, CardHeader, CircularProgress, Grid, Stack, Typography} from "@mui/material";
import FormProvider from "../components/formprovider/form-provider";
import {useForm} from "react-hook-form";
import {useMemo, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFTextField from "../components/formprovider/rhf-text-field";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {login} from "../services/operations/authAPI";
import {useDispatch, useSelector} from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const yupSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(20).required(),
  });
  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
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


  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(login(data.email, data.password, navigate))

      reset();
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
            <CardHeader title="Login" />
            <Stack spacing={4} sx={{ p: 3 }} justifyContent="center" alignItems="center">

                    <RHFTextField
                      name="email"
                      label="Email"
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
              <Button type="submit" fullWidth sx={{ mt:9}} variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
              </Button>

              <Typography variant="body2">
                Don't have an account?
                <RouterLink to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <b> Register</b>
                </RouterLink>
              </Typography>

            </Stack>


          </Card>
        </Grid>
      </Grid>
    </FormProvider>

  )
}

export default Login
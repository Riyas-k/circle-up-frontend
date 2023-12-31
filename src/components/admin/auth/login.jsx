import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginSuccess } from "../../../redux/loginReducers";
import { setAdmin } from "../../../redux/adminAuthReducer";

const defaultTheme = createTheme();

export default function AdminLogin() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const auth = useSelector((state)=>state.admin.payload)
  useEffect(()=>{
    if(auth){
      navigate('/admin')
    }
  },[])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios.post("/admin/login", values).then(async (res) => {
        console.log(res.data.data.admin,'res');
        if (res.data.status) {
           dispatch(setAdmin({payload:res.data.data.admin}))
           dispatch(loginSuccess());
          navigate("/admin");
        } else {
          dispatch(loginFailure());
        }
      });
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{border:'3px solid black',marginTop:'50px', borderRadius: "8px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && (
            <Alert variant="filled" severity="error">
              Error Invalid Credentials!
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
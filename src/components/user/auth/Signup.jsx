import { useLayoutEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "../../../axios/axios";
import { Alert } from "@mui/material";

export default function SignUp() {
  useLayoutEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  }, []);
  const [state, setstate] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    UserName:"",
    phone: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    UserName:Yup.string().required('User Name is required'),
    phone: Yup.string().required("Phone No is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required").min(6,"Password must be at least 6 characters"),
  });

  const onSubmit = async (values) => {
    try {
      await axios.post("/sign-up", values).then((response) => {
        console.log(response);
        if (response.data.status) {

          navigate("/sign-in");
        } else {  
          setstate(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
 
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container component="main" maxWidth="xs" sx={{border:'3px solid black',borderRadius:'8px',marginTop:'50px'}}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {state && (
          <Alert variant="filled" severity="error">
            Error Email Already Exist!
          </Alert>
        )}
        <Avatar sx={{ m: 1, bgcolor: "blue" }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="UserName"
                value={formik.values.UserName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.UserName && formik.errors.UserName}
                helperText={formik.touched.UserName && formik.errors.UserName}
                required
                fullWidth
                id="UserName"
                label="User Name"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone No"
                name="phone"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                value={formik.values.email}
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                type="password"
                value={formik.values.password}
                id="password"
              />
            </Grid>
          </Grid>
          <Button
              type="submit"
 
              variant="contained"
              sx={{ mt: 3, mb: 2,background:'green',ml:15, width:'150px' }}
            >
              Sign Up
            </Button>
          <Grid container justifyContent="flex-end">
            <Grid item sx={{marginBottom:'10px'}}>
              <Link to="/sign-in" variant="body2"  style={{ textDecoration: 'none', color: 'blue' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
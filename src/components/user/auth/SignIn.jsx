import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../axios/axios";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure,loginSuccess } from "../../../redux/loginReducers";
import { useEffect } from "react";

export default function SignIn() {
  React.useLayoutEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  }, []);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      await axios.post("/sign-in", values).then((response) => {
        if (response.data.status) {
          console.log(response.data.userExist);
          localStorage.setItem("token",JSON.stringify(response.data.userExist));
          dispatch(loginSuccess())
          navigate("/");
        } else {
          dispatch(loginFailure());
        }
      });
    },
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ border: "3px solid black", borderRadius: "8px", marginTop: "50px" }}
    >
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
        <Avatar sx={{ m: 1, bgcolor: "blue" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
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
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, background: "green", ml: 15, width: "150px" }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item sx={{ marginBottom: "20px" }}>
              <Link
                to="/sign-up"
                style={{ textDecoration: "none", color: "blue" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

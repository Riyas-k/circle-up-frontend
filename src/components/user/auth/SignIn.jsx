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
import {
  loginFailure,
  loginSuccess,
  userBlocked,
} from "../../../redux/loginReducers";
import { auth, provider } from "../../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { setUserDetails } from "../../../redux/singlereducer";

export default function SignIn() {
  const auth = useSelector((state) => state.user.payload);
  React.useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);
  const blocked = useSelector((state) => state.login.blocked);
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
        console.log(response);
        if (response.data.status) {
          dispatch(setUserDetails({ payload: response.data.userExist }));
          dispatch(loginSuccess());
          navigate("/");
        } else if (response.data.blocked) {
          dispatch(userBlocked());
        } else {
          dispatch(loginFailure());
        }
      });
    },
  });

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
        console.log(result);
        // navigate('/')
      })
      .catch((error) => {
        // Handle sign-in errors
        console.log(error);
      });
  };

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
        {blocked && (
          <Alert variant="filled" severity="error">
            Blocked By Admin!
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
          <Grid container justifyContent="center" sx={{ marginBottom: "10px" }}>
            <Grid item>
              <Typography sx={{ textAlign: "center" }}>OR</Typography>
              <img
                onClick={handleGoogleSignIn}
                src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png"
                alt="Google Sign In"
                style={{ width: "100%", height: 50, cursor: "pointer" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

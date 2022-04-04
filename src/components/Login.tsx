import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { auth } from "../store/slices/userSlice";
import * as Yup from "yup";
import { logIn } from "../types/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigator = useNavigate();

  const validationSchema = Yup.object().shape({
    login: Yup.string().min(2).max(10).required(),
    password: Yup.string().min(8).max(16).required(),
  });

  const initialValues: logIn = {
    login: "",
    password: "",
  };

  const signIn = (values: logIn) => {
    dispatch(auth(values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: signIn,
  });

  useEffect(() => {
    if (user.isLogged) {
      setTimeout(() => navigator("/", { replace: true }), 1500);
    }
  });

  return (
    <Container sx={{ mt: 3 }}>
      <Alert severity="warning"> <Typography fontWeight={600}>Login: test</Typography> <Typography fontWeight={600}> Password: test12345</Typography>{" "}
      </Alert>
      {user.isError && (
        <Alert severity="error">Неверный логин и/или пароль</Alert>
      )}
      {user.isLogged && (
        <Alert severity="success">
          Вы успешно вошли и сейчас будете перенаправлены на главную страницу!
        </Alert>
      )}
      {user.isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={user.isLoading}
        >
          <CircularProgress />
        </Backdrop>
      )}
      <Box>
        <Typography variant="h3">Log in</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ mt: 2, mb: 2, width: "100%" }}
            type="text"
            id="login"
            name="login"
            label="login"
            placeholder="enter username"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            sx={{ mt: 2, mb: 2, width: "100%" }}
            type="text"
            id="password"
            name="password"
            label="password"
            placeholder="enter password"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

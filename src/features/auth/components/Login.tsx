import {
  Card,
  CardHeader,
  Typography,
  Link as DisplayLink,
  CardContent,
  Stack,
  TextField,
  CardActions,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../models/loginUser";
import { FormEvent, useEffect, useState } from "react";
import { login, reset } from "../authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import ErrorSnackbar from "../../../shared/components/ErrorSnackbar";
import { unwrapResult } from "@reduxjs/toolkit";

export const Login = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/");
  }, [isAuthenticated, navigate]);

  // TODO : refactor into either a validation feature or some utils
  const validateEmail = (email: string): boolean => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
  };

  const validateInputs = (): boolean => {
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (password === "") {
      setError("Please enter your password.");
      return false;
    }
    setError("");
    return true;
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateInputs() === false) return;
    const user: LoginUser = {
      email,
      password,
    };
    try {
      const resultAction = await dispatch(login(user));
      unwrapResult(resultAction);
    } catch (err: any) {
      setError(err);
    }
  };

  const handleErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
  };

  if (isLoading) {
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;
  }

  return (
    <>
      <ErrorSnackbar error={error} handleClose={handleErrorClose} />
      <Card
        sx={{
          borderRadius: "20px",
          padding: "24px",
          width: { xs: "80%", sm: "550px" },
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <CardHeader
            title={
              <Typography
                variant="h6"
                component={"div"}
                sx={{ fontWeight: "bold" }}
              >
                Log in
              </Typography>
            }
            subheader={
              <Typography
                variant="body2"
                component={"div"}
                sx={{ color: "grey.500" }}
              >
                Don't have an account?{" "}
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                  <DisplayLink
                    variant="body2"
                    component="span"
                    color={`${theme.palette.secondary.main}`}
                    underline="hover"
                    fontWeight={"500"}
                    sx={{ cursor: "pointer" }}
                    p={0}
                  >
                    Register
                  </DisplayLink>
                </Link>
              </Typography>
            }
          />
          <CardContent>
            <Stack spacing={2}>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    fontWeight: "500",
                  },
                }}
                sx={{
                  borderRadius: "8px",
                  "& :-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.light} inset`,
                    WebkitTextFillColor: `${theme.palette.secondary.contrastText}`,
                  },
                }}
              />
              <TextField
                fullWidth
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: theme.palette.common.white,
                  },
                }}
                sx={{
                  borderRadius: "8px",
                  "& :-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.light} inset`,
                    WebkitTextFillColor: `${theme.palette.secondary.contrastText}`,
                  },
                }}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Stack
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              paddingRight={1}
              paddingLeft={1}
              spacing={2}
            >
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ borderRadius: "12px", padding: "12px 0px" }}
              >
                Login
              </Button>
              <Typography
                variant="body2"
                gutterBottom
                color={`${theme.palette.secondary.main}`}
                sx={{ cursor: "pointer" }}
              >
                Forgot password?
              </Typography>
            </Stack>
          </CardActions>
        </form>
      </Card>
    </>
  );
};

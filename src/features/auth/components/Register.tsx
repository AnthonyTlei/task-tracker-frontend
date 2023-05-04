import {
  Card,
  CardHeader,
  Typography,
  Link as DisplayLink,
  CardContent,
  Stack,
  TextField,
  CardActions,
  Box,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { NewUser } from "../models/newUser";
import { register, reset } from "../authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import ErrorSnackbar from "../../../shared/components/ErrorSnackbar";
import { unwrapResult } from "@reduxjs/toolkit";

export const Register = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/login");
    }
  }, [isSuccess, dispatch, navigate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
  };

  const validateInputs = (): boolean => {
    if (firstName.length > 250 || firstName.length < 3) {
      setError("First name must be between 3 and 250 characters.");
      return false;
    }
    if (lastName.length > 250 || lastName.length < 3) {
      setError("Last name must be between 3 and 250 characters.");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (password.length > 250 || password.length < 8) {
      setError("Password name must be between 8 and 250 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match!");
      return false;
    }
    setError("");
    return true;
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateInputs() === false) return;
    const newUser: NewUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };
    try {
      const resultAction = await dispatch(register(newUser));
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
                Register
              </Typography>
            }
            subheader={
              <Typography
                variant="body2"
                component={"div"}
                sx={{ color: "grey.500" }}
              >
                Already have an account?{" "}
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  <DisplayLink
                    variant="body2"
                    component="span"
                    color={`${theme.palette.secondary.main}`}
                    underline="hover"
                    fontWeight={"500"}
                    sx={{ cursor: "pointer" }}
                    p={0}
                  >
                    Login
                  </DisplayLink>
                </Link>
              </Typography>
            }
          />
          <CardContent>
            <Stack spacing={2}>
              <Stack direction={"row"} spacing={2}>
                <TextField
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  label="First Name"
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  label="Last Name"
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
              </Stack>
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
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
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
            </Stack>
          </CardContent>
          <CardActions>
            <Box p={1} width={"100%"}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="secondary"
                sx={{ borderRadius: "12px", padding: "12px 0px" }}
              >
                Register
              </Button>
            </Box>
          </CardActions>
        </form>
      </Card>
    </>
  );
};

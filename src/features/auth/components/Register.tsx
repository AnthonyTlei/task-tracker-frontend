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
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { NewUser } from "../models/newUser";
import { register, reset } from "../authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";
import { Close } from "@mui/icons-material";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, dispatch]);

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

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateInputs() === false) return;
    const newUser: NewUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };
    dispatch(register(newUser));
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  if (isLoading) {
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;
  }

  return (
    <>
      {error !== "" && (
        <>
          <Snackbar
            open
            autoHideDuration={3000}
            onClose={handleClose}
            action={action}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </>
      )}
      <Card
        sx={{
          borderRadius: "20px",
          padding: "24px",
          width: { xs: "80%", sm: "500px" },
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
                sx={{ fontWeight: 400, color: "grey" }}
              >
                Already have an account?{" "}
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  <DisplayLink
                    color={`${theme.palette.primary.main}`}
                    underline="hover"
                    sx={{ cursor: "pointer" }}
                  >
                    Log in
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
                  sx={{ borderRadius: "8px" }}
                />
                <TextField
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  label="Last Name"
                  variant="outlined"
                  sx={{ borderRadius: "8px" }}
                />
              </Stack>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
              <TextField
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
              <TextField
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Box p={1} width={"100%"}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
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

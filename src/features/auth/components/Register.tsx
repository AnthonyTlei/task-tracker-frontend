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
import { FormEvent, useState } from "react";
import { NewUser } from "../models/newUser";
import { register } from "../authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";

export const Register = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: NewUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };
    dispatch(register(newUser));
  };

  if (isLoading) {
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;
  }

  return (
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
  );
};

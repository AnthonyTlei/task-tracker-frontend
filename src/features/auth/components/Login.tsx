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
import { FormEvent, useState } from "react";
import { login } from "../authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/redux-hooks";

export const Login = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: LoginUser = {
      email,
      password,
    };
    dispatch(login(user));
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
              Log in
            </Typography>
          }
          subheader={
            <Typography
              variant="body2"
              component={"div"}
              sx={{ fontWeight: 400, color: "grey" }}
            >
              Don't have an account?{" "}
              <Link to={"/register"} style={{ textDecoration: "none" }}>
                <DisplayLink
                  color={`${theme.palette.primary.main}`}
                  underline="hover"
                  sx={{ cursor: "pointer" }}
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
              sx={{ borderRadius: "12px", padding: "12px 0px" }}
            >
              Login
            </Button>
            <Typography
              variant="body2"
              gutterBottom
              color={`${theme.palette.primary.light}`}
              sx={{ cursor: "pointer" }}
            >
              Forgot password?
            </Typography>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
};

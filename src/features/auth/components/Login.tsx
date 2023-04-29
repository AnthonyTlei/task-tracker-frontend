import {
  Card,
  CardHeader,
  Typography,
  Link,
  CardContent,
  Stack,
  TextField,
  CardActions,
  Button,
  useTheme,
} from "@mui/material";

export const Login = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: "20px",
        padding: "24px",
        width: { xs: "80%", sm: "500px" },
      }}
    >
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
            <Link
              color={`${theme.palette.primary.main}`}
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              Register
            </Link>
          </Typography>
        }
      />
      <CardContent>
        <form>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              sx={{ borderRadius: "8px" }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              sx={{ borderRadius: "8px" }}
            />
          </Stack>
        </form>
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
            variant="contained"
            fullWidth
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
    </Card>
  );
};

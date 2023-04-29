import {
  Card,
  CardHeader,
  Typography,
  Link,
  CardContent,
  Stack,
  TextField,
  CardActions,
  Box,
  Button,
  useTheme,
} from "@mui/material";

export const Register = () => {
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
            <Link
              color={`${theme.palette.primary.main}`}
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              Log in
            </Link>
          </Typography>
        }
      />
      <CardContent>
        <form>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
            </Stack>
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
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              sx={{ borderRadius: "8px" }}
            />
          </Stack>
        </form>
      </CardContent>
      <CardActions>
        <Box p={1} width={"100%"}>
          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: "12px", padding: "12px 0px" }}
          >
            Register
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

import axios from "axios";
import jwt_decode from "jwt-decode";
import { DisplayUser } from "../models/displayUser";
import { NewUser } from "../models/newUser";
import { LoginUser } from "../models/loginUser";
import { DecodedJwt, Jwt } from "../models/Jwt";

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  //   const response = await axios.post(
  //     `${process.env.REACT_APP_BASE_API}/auth/register`,
  //     newUser
  //   );
  const response = await axios.post(
    `http://localhost:3000/auth/register`,
    newUser
  );
  return response.data;
};

const login = async (
  user: LoginUser
): Promise<{ jwt: Jwt; user: DisplayUser | null }> => {
  const response = await axios.post(
    `http://localhost:3000/auth/login`,
    user
  );
  if (response.data) {
    localStorage.setItem("jwt", JSON.stringify(response.data));
    const decodedJwt: DecodedJwt = jwt_decode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
    return { jwt: response.data, user: decodedJwt.user };
  }
  return { jwt: response.data, user: null };
};

const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;

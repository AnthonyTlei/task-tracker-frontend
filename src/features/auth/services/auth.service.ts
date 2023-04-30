import axios from "axios";
import { DisplayUser } from "../models/displayUser";
import { NewUser } from "../models/newUser";

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

const authService = {
  register,
};

export default authService;

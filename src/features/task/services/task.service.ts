import axios from "axios";
import jwt_decode from "jwt-decode";
import { Task } from "../models/task";
import { NewTask } from "../models/newTask";
import { DecodedJwt } from "../../auth/models/Jwt";

const getUserTasks = async (token: string | undefined): Promise<Task[]> => {
  let user_id = 0;
  if (token) {
    const decodedJwt: DecodedJwt = jwt_decode(token);
    user_id = decodedJwt.user.id;
  }
  const response = await axios.get(
    `http://localhost:3000/users/${user_id}/tasks`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const createTask = async (
  token: string | undefined,
  newTask: NewTask
): Promise<Task> => {
  const response = await axios.post(`http://localhost:3000/task`, newTask, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const taskService = {
  getUserTasks,
  createTask,
};

export default taskService;

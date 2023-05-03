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

const editTask = async (
  token: string | undefined,
  taskId: number,
  updatedTask: NewTask
): Promise<Task> => {
  const response = await axios.put(`http://localhost:3000/task/${taskId}`, updatedTask, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteTask = async (
  token: string | undefined,
  taskId: number
): Promise<Task> => {
  const response = await axios.delete(`http://localhost:3000/task/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const taskService = {
  getUserTasks,
  createTask,
  editTask,
  deleteTask,
};

export default taskService;

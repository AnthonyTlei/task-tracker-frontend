import axios from "axios";
import { Task } from "../models/task";

const getUserTasks = async (token: string | undefined): Promise<Task[]> => {
  const response = await axios.get(
    // TODO : Replace hardcoded id
    `http://localhost:3000/users/1/tasks`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const taskService = {
  getUserTasks,
};

export default taskService;

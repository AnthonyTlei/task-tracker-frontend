import axios from "axios";
import { Task } from "../models/task";
import { NewTask } from "../models/newTask";

const getUserTasks = async (token: string | undefined): Promise<Task[]> => {
  const response = await axios.get(
    // TODO : Replace hardcoded id
    `http://localhost:3000/users/1/tasks`,
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

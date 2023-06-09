import axios from "axios";
import jwt_decode from "jwt-decode";
import { GetTasksFilterDTO, Task } from "../models/task";
import { NewTask } from "../models/newTask";
import { DecodedJwt } from "../../auth/models/Jwt";
import { TaskWithUser } from "../../checklist/models/taskWithUsers";
import { ImportOptions, ImportResults } from "../models/importTasks";
import { convertToServerTime } from "../../../shared/utilities/date.utils";

const getTasks = async (
  token: string | undefined,
  filters: GetTasksFilterDTO
): Promise<TaskWithUser[]> => {
  if (filters.range) {
    filters.range[0] = convertToServerTime(filters.range[0]);
    filters.range[1] = convertToServerTime(filters.range[1]);
  }
  const response = await axios.get(`${process.env.REACT_APP_BASE_API}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
    params: filters,
  });
  return response.data;
};

const getUserTasks = async (token: string | undefined): Promise<Task[]> => {
  let user_id = 0;
  if (token) {
    const decodedJwt: DecodedJwt = jwt_decode(token);
    user_id = decodedJwt.user.id;
  }
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_API}/users/${user_id}/tasks`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const createTask = async (
  token: string | undefined,
  newTask: NewTask
): Promise<Task> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/tasks`,
    newTask,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const editTask = async (
  token: string | undefined,
  taskId: number,
  updatedTask: NewTask
): Promise<Task> => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASE_API}/tasks/${taskId}`,
    updatedTask,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const deleteTask = async (
  token: string | undefined,
  taskId: number
): Promise<Task> => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BASE_API}/tasks/${taskId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const deleteAllTasks = async (token: string | undefined): Promise<void> => {
  await axios.delete(`${process.env.REACT_APP_BASE_API}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const importTasks = async (
  token: string | undefined,
  file: File,
  options?: ImportOptions
): Promise<ImportResults> => {
  // TODO: validate file format
  const formData = new FormData();
  formData.append("file", file);
  if (options) {
    formData.append("options", JSON.stringify(options));
  }
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/tasks/import`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const taskService = {
  getTasks,
  getUserTasks,
  createTask,
  editTask,
  deleteTask,
  importTasks,
  deleteAllTasks,
};

export default taskService;

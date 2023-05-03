import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./services/task.service";
import { Task } from "./models/task";
import { NewTask } from "./models/newTask";
import { TaskWithUser } from "../checklist/models/taskWithUsers";
import { AxiosError } from "axios";

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface TaskState extends AsyncState {
  tasks: TaskWithUser[];
  userTasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
  userTasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAllTasks",
  async (token: string | undefined, thunkAPI) => {
    try {
      return await taskService.getTasks(token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch tasks.");
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (token: string | undefined, thunkAPI) => {
    try {
      return await taskService.getUserTasks(token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch user tasks.");
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (
    { token, newTask }: { token: string | undefined; newTask: NewTask },
    thunkAPI
  ) => {
    try {
      return await taskService.createTask(token, newTask);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("Unable to create tasks.");
    }
  }
);


export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (
    {
      token,
      taskId,
      newTask,
    }: { token: string | undefined; taskId: number; newTask: NewTask },
    thunkAPI
  ) => {
    try {
      return await taskService.editTask(token, taskId, newTask);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to create tasks.");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (
    { token, taskId }: { token: string | undefined; taskId: number },
    thunkAPI
  ) => {
    try {
      return await taskService.deleteTask(token, taskId);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to delete tasks.");
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllTasks
      // TODO: rename to getAllTasks
      .addCase(fetchAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.tasks = [];
      })
      // fetchTasks
      // TODO: rename to getUserTasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userTasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.userTasks = [];
      })
      // createTask
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userTasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // editTask
      .addCase(editTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userTasks = state.userTasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        });
      })
      .addCase(editTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userTasks = state.userTasks.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(deleteTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = taskSlice.actions;

export default taskSlice.reducer;

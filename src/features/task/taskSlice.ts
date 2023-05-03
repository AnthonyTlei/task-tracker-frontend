import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./services/task.service";
import { Task } from "./models/task";
import { NewTask } from "./models/newTask";

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface TaskState extends AsyncState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (token: string | undefined, thunkAPI) => {
    try {
      return await taskService.getUserTasks(token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch tasks.");
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
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.tasks = [];
      })
      // createTask
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state) => {
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
        state.tasks = state.tasks.filter(
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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./services/task.service";
import { Task } from "./models/task";
import { NewTask } from "./models/newTask";
import { TaskWithUser } from "../checklist/models/taskWithUsers";

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

export const getAllTasks = createAsyncThunk(
  "tasks/getAllTasks",
  async (token: string | undefined, thunkAPI) => {
    try {
      return await taskService.getTasks(token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch tasks.");
    }
  }
);

export const getUserTasks = createAsyncThunk(
  "tasks/getUserTasks",
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

export const importTasks = createAsyncThunk(
  "tasks/importTasks",
  async (
    { token, file }: { token: string | undefined; file: File },
    thunkAPI
  ) => {
    // TODO: handle server error (duplicate id)
    try {
      return await taskService.importTasks(token, file);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to import tasks.");
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
      // getAllTasks
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.tasks = [];
      })
      // getUserTasks
      .addCase(getUserTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userTasks = action.payload;
      })
      .addCase(getUserTasks.rejected, (state) => {
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
      })
      // importTasks
      .addCase(importTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // TODO: append to userTasks
        console.log(action.payload);
      })
      .addCase(importTasks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = taskSlice.actions;

export default taskSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./services/task.service";
import { Task } from "./models/task";

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
      });
  },
});

export const { reset } = taskSlice.actions;

export default taskSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskAPIs } from "../../../apis/taskApis";
import { message } from "antd";

const initialState = {
  isLoading: false,
  tasks: [],
  //Tao bien currTask de luu task dang Edit
  currentTask: {},
  errors: {},

  //Tao them state de xu ly pagination
  pagination: {
    currentPage: 1,
    limitPerPage: 8,
  },

  //Tao them searchKey de xu ly truong hop search
  searchKey: "",
};

//Them param vao action fetchAllTask de xu ly phan trang + search
//Initial = {} khi khong truyen params
//Lay them total tu header response cua json-server
//No bao loi axios response nen minh se lay data va header ow response thoi
//get header no bao warning => minh get truc tiep total o day luon
export const actFetchAllTask = createAsyncThunk(
  "tasks/fetchAllTask",
  async (params = {}) => {
    const response = await TaskAPIs.getAllTasks(params);
    return {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);
export const actFetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId) => {
    const task = await TaskAPIs.getTaskById(taskId);
    return task;
  }
);

export const actUpdateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ id, taskUpdate }) => {
    await TaskAPIs.updateTaskById(id, taskUpdate);
    return null;
  }
);

export const actDeleteTaskById = createAsyncThunk(
  "tasks/deleteTaskById",
  async (id) => {
    await TaskAPIs.deleteTaskById(id);
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetCurrentTask: (state, action) => {
      state.currentTask = {};
    },
    //Them action xu ly chuyen trang
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
    //Them action xu ly searchKey
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllTask.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
      state.isLoading = false;
      state.pagination.total = action.payload.total;
    });
    builder.addCase(actFetchTaskById.fulfilled, (state, action) => {
      state.currentTask = action.payload;
      state.isLoading = false;
    });

    builder.addCase(actUpdateTaskById.fulfilled, (state, action) => {
      message.success("Update successful task");
    });
    builder.addCase(actDeleteTaskById.fulfilled, (state, action) => {
      message.success("Delete successful task");
    });
  },
});

export const actCreateNewTask = (task) => {
  return async (dispatch) => {
    try {
      await TaskAPIs.createTask(task);
      //Create new Task xong => Chuyen tra ve trang AllTask
      //trang AllTask da co actFetchAllTask nen cho nay khong can goi get lai all task
      //Minh co the show mess tao task thanh cong
      message.success("Create task successful");
    } catch (error) {}
  };
};
//Export action de su dung
export const { actSetTasks, setLoading, setNewPage, setSearchKey } =
  taskSlice.actions;
export const tasksReducer = taskSlice.reducer;

// !! => Ep kieu ve boolean
// ? => Optional Chaining
// errors ={}
// errors.title => underfined
// erros.title?.message

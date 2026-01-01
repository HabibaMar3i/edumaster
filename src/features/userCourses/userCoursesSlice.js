
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("token") || "";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.get("https://edu-master-psi.vercel.app/lesson/?isPaid=true&sortBy=scheduledDate&sortOrder=asc&scheduledAfter=2025-07-01", {
        headers: { "token": token }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const payLesson = createAsyncThunk(
  "courses/payLesson",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.post(`https://edu-master-psi.vercel.app/lesson/pay/${id}`, {}, {
        headers: { "token": token }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    pagination: {
      total: 0,
      page: 1,
      totalPages: 1,
    },
    loading: false,
    error: null,
    success: false,
    message: null,
    paymentUrl: null,
  },
  reducers: {
    clearCourseMessage: (state) => {
      state.message = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || (Array.isArray(action.payload) ? action.payload : []);
        state.pagination = action.payload.pagination || {
          total: state.list.length,
          page: 1,
          totalPages: 1,
        };
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(payLesson.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = null;
      })
      .addCase(payLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Lesson paid successfully";
        state.paymentUrl = action.payload.paymentUrl;
      })
      .addCase(payLesson.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload;
      });
  },
});

export const { clearCourseMessage } = coursesSlice.actions;
export default coursesSlice.reducer;

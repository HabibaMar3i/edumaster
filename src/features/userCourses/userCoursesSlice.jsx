
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXNzZWZob3NzYW0yMDVAZ21haWwuY29tIiwiX2lkIjoiNjdkZTJjMTE2Zjk3NDlkOTUzNGUzODgzIiwiaWF0IjoxNzUxMDI2MDYwLCJleHAiOjE3NTExMTI0NjB9.NJrdtD_iRO2S8mVzx9utf5ULkAKYr1Wkpd6MWKPOJQk";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://edu-master-psi.vercel.app/lesson/?isPaid=true&sortBy=scheduledDate&sortOrder=asc&scheduledAfter=2025-07-01", {
        headers: { "Authorization": `${token}` }
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default coursesSlice.reducer;

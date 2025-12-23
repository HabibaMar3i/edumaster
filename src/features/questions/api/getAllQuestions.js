import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllQuestions = createAsyncThunk(
    "getAllQuestions",
    async (_ ,thunkAPI) =>
    {
        try
        {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue({ message: "No token found" });
        }
      const res = await axios.get(
        `https://edu-master-psi.vercel.app/question?`,
        {
          headers: { token },
        }
      );
        return  res.data.data || res.data
    } catch (error)
    {
         return thunkAPI.rejectWithValue(
           error.response?.data?.message || "Something went wrong"
         );
    }
});
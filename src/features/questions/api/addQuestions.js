import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addQuestion = createAsyncThunk(
  "question/add",
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue({ message: "No token found" });
      }

      const requestBody = {
        text: questionData.text,
        type: questionData.type,
        correctAnswer: questionData.correctAnswer,
        exam: questionData.exam,
        points: questionData.points,
      };

      if (questionData.options && questionData.options.length > 0) {
        requestBody.options = questionData.options;
      }


      const response = await axios.post(
        "https://edu-master-psi.vercel.app/question",
        requestBody,
        {
          headers: { token },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Backend error:", error.response?.data);
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to add question" }
      );
    }
  }
);

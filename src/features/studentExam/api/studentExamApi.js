import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("token") || "";

// Start exam
export const startExam = createAsyncThunk(
  "studentExam/startExam",
  async (examId, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `https://edu-master-psi.vercel.app/studentExam/start/${examId}`,
        {},
        {
          headers: { token }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to start exam" }
      );
    }
  }
);

// Get remaining time for exam
export const getRemainingTime = createAsyncThunk(
  "studentExam/getRemainingTime",
  async (examId, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `https://edu-master-psi.vercel.app/studentExam/exams/remaining-time/${examId}`,
        {
          headers: { token }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to get remaining time" }
      );
    }
  }
);

// Get all exams for student
export const getAllExams = createAsyncThunk(
  "studentExam/getAllExams",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(
        "https://edu-master-psi.vercel.app/exam",
        {
          headers: { token }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to get exams" }
      );
    }
  }
);

// Get specific exam for student
export const getSpecificExam = createAsyncThunk(
  "studentExam/getSpecificExam",
  async (examId, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `https://edu-master-psi.vercel.app/exam/get/${examId}`,
        {
          headers: { token }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to get exam" }
      );
    }
  }
);

// Get exam for student
export const getStudentExam = createAsyncThunk(
  "studentExam/getExam",
  async (examId, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `https://edu-master-psi.vercel.app/studentExam/exams/${examId}`,
        {
          headers: { token }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to get exam" }
      );
    }
  }
);

// Get exam score for student
export const getExamScore = createAsyncThunk(
  "studentExam/getScore",
  async (examId, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `https://edu-master-psi.vercel.app/studentExam/exams/score/${examId}`,
        {
          headers: { token }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to get exam score" }
      );
    }
  }
);

// Submit exam answers
export const submitExamAnswers = createAsyncThunk(
  "studentExam/submitAnswers",
  async ({ examId, answers }, thunkAPI) => {
    try {
      const token = getToken();
      // Convert answers object to the required format
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer
      }));
      
      const response = await axios.post(
        `https://edu-master-psi.vercel.app/studentExam/submit/${examId}`,
        { answers: formattedAnswers },
        {
          headers: { token }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to submit exam" }
      );
    }
  }
);
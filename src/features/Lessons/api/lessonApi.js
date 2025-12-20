import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("token") || "";

export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async (classFilter = "Grade 1 Secondary") => {
    const token = getToken();
    const res = await axios.get(
      `https://edu-master-psi.vercel.app/lesson/?classLevel=${encodeURIComponent(
        classFilter
      )}`,
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

// Create new lesson
export const createLesson = createAsyncThunk(
  "lessons/createLesson",
  async (lessonData) => {
    const token = getToken();
    const res = await axios.post(
      "https://edu-master-psi.vercel.app/lesson",
      lessonData,
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

// Update lesson
export const updateLesson = createAsyncThunk(
  "lessons/updateLesson",
  async ({ id, lessonData }) => {
    const token = getToken();
    const res = await axios.put(
      `https://edu-master-psi.vercel.app/lesson/${id}`,
      lessonData,
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

// Delete lesson
export const deleteLesson = createAsyncThunk(
  "lessons/deleteLesson",
  async (id) => {
    const token = getToken();
    const res = await axios.delete(
      `https://edu-master-psi.vercel.app/lesson/${id}`,
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );
    return { id, ...res.data };
  }
);


export default {
  fetchLessons,
  createLesson,
  updateLesson,
  deleteLesson,
};

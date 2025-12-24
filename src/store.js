import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice/authSlice";
import examsReducer from "./features/exams/slice/examSlice.js";
import questionsReducer from "./features/questions/slice/getAllQuestionSlice";
import lessonReducer from "./features/Lessons/slice/lessonSlice";
import userReducer from "./features/user/slice/userSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        exams: examsReducer,
        questions: questionsReducer,
        lessons: lessonReducer,
        user: userReducer,
    },
});
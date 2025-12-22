import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice/authSlice";
<<<<<<< HEAD
import examsReducer from "./features/auth/slice/examSlice";
import questionsReducer from "./features/questions/slice/getAllQuestionSlice";
=======
import lessonReducer from "./features/Lessons/slice/lessonSlice";
import userSlice from "./features/user/slice/userSlice.js";
import examsReducer from "./features/exams/slice/examSlice";
>>>>>>> 6b26bf3cfb6abee547ee55e99d5f3d2b9d3ff52a

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examsReducer,
<<<<<<< HEAD
    questions: questionsReducer,
=======
    lessons: lessonReducer,
    user:userSlice,

>>>>>>> 6b26bf3cfb6abee547ee55e99d5f3d2b9d3ff52a
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice/authSlice";
import examsReducer from "./features/auth/slice/examSlice";
import userSlice from "./features/user/slice/userSlice.js";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        exams: examsReducer,
        user:userSlice,
    },
});

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../api/lessonApi";

const lessonSlice = createSlice({
  name: "lessons",
  initialState: {
    loading: false,
    lessons: [],
    pagination: {
      total: 0,
      page: 1,
      totalPages: 1,
    },
    message: null,
    success: false,
    classFilter: "Grade 1 Secondary",
    selectedLesson: null,
    viewingLesson: null,
  },
  reducers: {
    setClassFilter: (state, action) => {
      state.classFilter = action.payload;
    },
    setSelectedLesson: (state, action) => {
      state.selectedLesson = action.payload;
    },
    setViewingLesson: (state, action) => {
      state.viewingLesson = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Lessons
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.success = false;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        if (action.payload.success) {
          state.lessons = action.payload.data || [];
          state.pagination = action.payload.pagination || {
            total: state.lessons.length,
            page: 1,
            totalPages: 1,
          };
        }
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.message = "Failed to fetch lessons";
        state.success = false;
      })

      // Create Lesson
      .addCase(createLesson.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.success = false;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        if (action.payload.success) {
          // Add new lesson to the list
          state.lessons.unshift(action.payload.data);
        }
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.loading = false;
        state.message = "Failed to create lesson";
        state.success = false;
      })

      // Update Lesson
      .addCase(updateLesson.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.success = false;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        if (action.payload.success && action.payload.data) {
          const index = state.lessons.findIndex(
            (lesson) => lesson._id === action.payload.data._id
          );
          if (index !== -1) {
            state.lessons[index] = action.payload.data;
          }
        }
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.loading = false;
        state.message = "Failed to update lesson";
        state.success = false;
      })

      // Delete Lesson
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.success = false;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        if (action.payload.success) {
          state.lessons = state.lessons.filter(
            (lesson) => lesson._id !== action.payload.id
          );
        }
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || "Failed to delete lesson";
        state.success = false;
      });
  },
});

// Export all actions
export const {
  setClassFilter,
  setSelectedLesson,
  setViewingLesson,
  clearMessage,
} = lessonSlice.actions;

export { fetchLessons, createLesson, updateLesson, deleteLesson };

export default lessonSlice.reducer;

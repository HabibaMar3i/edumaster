import { createSelector } from "@reduxjs/toolkit";

export const selectAllQuestions = (state) => state.questions.questions;

export const selectQuestionsByExamId = (examId) =>
  createSelector([selectAllQuestions], (questions) => {

    const questionsArray = Array.isArray(questions) ? questions : [];
    return questionsArray.filter((q) => q.exam === examId);
  });
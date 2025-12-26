import React, { useState } from "react";
import { Clock, FileText, Award, CheckCircle, AlertCircle } from "lucide-react";

export default function StudentExamPage() {
  const [activeExam, setActiveExam] = useState(null);
  const [examScore, setExamScore] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  // Mock data - will be replaced with API calls
  const exams = [
    {
      id: 1,
      title: "Mathematics Exam",
      subject: "Mathematics",
      duration: 120,
      date: "2025-01-15",
      status: "available",
    },
    {
      id: 2,
      title: "Science Exam",
      subject: "Science",
      duration: 90,
      date: "2025-01-18",
      status: "upcoming",
    },
    {
      id: 3,
      title: "English Exam",
      subject: "English",
      duration: 60,
      date: "2025-01-10",
      status: "completed",
      score: 85,
    },
  ];

  const handleStartExam = (exam) => {
    setActiveExam(exam);
    setRemainingTime(exam.duration * 60); // Convert to seconds
    // API call: POST /start-exam
    console.log("Starting exam:", exam.id);
  };

  const handleSubmitExam = () => {
    // API call: POST /submit-exam
    console.log("Submitting exam:", activeExam?.id);
    setActiveExam(null);
    setRemainingTime(null);
    alert("Exam submitted successfully!");
  };

  const handleGetScore = (examId) => {
    // API call: GET /get-exam-score
    console.log("Getting score for exam:", examId);
    setExamScore({ examId, score: 85, total: 100 });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "upcoming":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Available Now";
      case "completed":
        return "Completed";
      case "upcoming":
        return "Coming Soon";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Your Exams
          </h1>
          <p className="text-gray-600 text-lg">Select an exam to get started</p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#49bbbd]"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#49bbbd] to-[#3a9a9c] p-5 text-white">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-6 h-6" />
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      exam.status
                    )}`}
                  >
                    {getStatusText(exam.status)}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{exam.title}</h3>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-semibold text-gray-800">
                      {exam.subject}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1 ">
                      <Clock className="w-4 h-4" />
                      {exam.duration} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-gray-800">
                      {exam.date}
                    </span>
                  </div>
                  {exam.score && (
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                      <span className="text-gray-600">Your Score:</span>
                      <span className="font-bold text-[#49bbbd] flex items-center gap-1 text-lg">
                        <Award className="w-5 h-5" />
                        {exam.score}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {exam.status === "available" && (
                  <button
                    onClick={() => handleStartExam(exam)}
                    className="w-full bg-[#49bbbd] hover:bg-[#3a9a9c] text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-md"
                  >
                    <FileText className="w-5 h-5" />
                    Start Exam
                  </button>
                )}
                {exam.status === "completed" && (
                  <button
                    onClick={() => handleGetScore(exam.id)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-md"
                  >
                    <Award className="w-5 h-5" />
                    View Result
                  </button>
                )}
                {exam.status === "upcoming" && (
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    Not Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Active Exam Modal */}
        {activeExam && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Exam Header */}
              <div className="bg-gradient-to-r from-[#49bbbd] to-[#3a9a9c] text-white p-6 rounded-t-3xl sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {activeExam.title}
                    </h2>
                    <p className="opacity-90 text-sm">
                      Duration: {activeExam.duration} minutes
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold text-lg text-[#49bbbd]">
                        {activeExam.duration}:00
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exam Body */}
              <div className="p-6">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-800 font-semibold">
                      Important Instructions:
                    </p>
                    <p className="text-amber-700 text-sm mt-1">
                      Answer all questions carefully. You cannot return once
                      submitted.
                    </p>
                  </div>
                </div>

                {/* Questions - will be loaded from API */}
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-[#49bbbd] transition-colors">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="bg-[#49bbbd] text-white font-bold px-3 py-1 rounded-lg text-sm">
                        Q1
                      </span>
                      <p className="font-bold text-gray-800 flex-1">
                        What is 5 + 3?
                      </p>
                    </div>
                    <div className="space-y-2 ml-12">
                      {["6", "7", "8", "9"].map((option, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:bg-[#49bbbd] hover:bg-opacity-5 hover:border-[#49bbbd] cursor-pointer transition-all"
                        >
                          <input
                            type="radio"
                            name="q1"
                            className="w-5 h-5 text-[#49bbbd] focus:ring-[#49bbbd]"
                          />
                          <span className="text-gray-700 font-medium">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-[#49bbbd] transition-colors">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="bg-[#49bbbd] text-white font-bold px-3 py-1 rounded-lg text-sm">
                        Q2
                      </span>
                      <p className="font-bold text-gray-800 flex-1">
                        What is the capital of Egypt?
                      </p>
                    </div>
                    <div className="space-y-2 ml-12">
                      {["Alexandria", "Cairo", "Giza", "Aswan"].map(
                        (option, idx) => (
                          <label
                            key={idx}
                            className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:bg-[#49bbbd] hover:bg-opacity-5 hover:border-[#49bbbd] cursor-pointer transition-all"
                          >
                            <input
                              type="radio"
                              name="q2"
                              className="w-5 h-5 text-[#49bbbd] focus:ring-[#49bbbd]"
                            />
                            <span className="text-gray-700 font-medium">
                              {option}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setActiveExam(null)}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitExam}
                    className="px-8 py-3 bg-[#49bbbd] hover:bg-[#3a9a9c] text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg transform hover:scale-105"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Submit Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Score Modal */}
        {examScore && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center transform animate-bounce-in">
              <div className="bg-gradient-to-br from-[#49bbbd] to-[#3a9a9c] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Congratulations!
              </h3>
              <p className="text-gray-600 mb-4">Your exam has been evaluated</p>
              <div className="bg-gradient-to-r from-[#49bbbd] to-[#3a9a9c] rounded-2xl p-8 mb-6">
                <p className="text-white text-sm font-semibold mb-2">
                  Your Score
                </p>
                <p className="text-6xl font-bold text-white">
                  {examScore.score}%
                </p>
              </div>
              <p className="text-gray-600 mb-6">
                Excellent work! Keep up the great performance!
              </p>
              <button
                onClick={() => setExamScore(null)}
                className="w-full bg-[#49bbbd] hover:bg-[#3a9a9c] text-white px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

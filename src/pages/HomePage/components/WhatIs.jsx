import { useNavigate } from "react-router-dom";

export default function WhatIsTOTC() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-24 px-6 md:px-20">
      {/* ===== Title ===== */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-indigo-900">
          What is <span className="text-teal-400">EduMaster?</span>
        </h2>
        <p className="mt-6 text-gray-500 leading-relaxed">
          TOTC is a platform that allows educators to create online classes
          whereby they can store the course materials online; manage assignments,
          quizzes and exams; monitor due dates; grade results and provide students
          with feedback all in one place.
        </p>
      </div>

      {/* ===== Instructor / Student Cards ===== */}
      <div className="grid md:grid-cols-2 gap-10 mb-24">
        {/* Instructors */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src="feature1.png"
            alt="For Instructors"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-4">FOR INSTRUCTORS</h3>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
              Start a class today
            </button>
          </div>
        </div>

        {/* Students */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src="feature2.png"
            alt="For Students"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-4">FOR STUDENTS</h3>
            <button className="px-6 py-3 bg-teal-400 rounded-full hover:opacity-90 transition">
              Enter access code
            </button>
          </div>
        </div>
      </div>

      {/* ===== Classroom Section ===== */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <h3 className="text-3xl font-bold text-indigo-900 mb-6">
            Everything you can do in a physical classroom,
            <span className="text-teal-400"> you can do with EduMaster</span>
          </h3>

          <p className="text-gray-500 leading-relaxed mb-6">
            EduMaster’s school management software helps traditional and online
            schools manage scheduling, attendance, payments and virtual
            classrooms all in one secure cloud-based system.
          </p>

          <button className="text-teal-500 font-medium hover:underline">
            Learn more
          </button>
        </div>

        {/* Video */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src="feature3.png"
            alt="Classroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-teal-400 text-white rounded-full text-2xl shadow-lg">
              ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

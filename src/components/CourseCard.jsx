import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-44 object-cover rounded-t-xl"
      />

      <div className="p-4">
        <span className="text-sm text-blue-600 font-medium">
          {course.category}
        </span>

        <h3 className="mt-2 font-semibold text-gray-800 line-clamp-2">
          {course.title}
        </h3>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>⏱ {course.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

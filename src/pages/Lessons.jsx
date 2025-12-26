import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/userCourses/userCoursesSlice";
import CourseCard from "../components/CourseCard";

const Lessons = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading)
    return <p className="text-center py-10">Loading...</p>;

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Because you viewed
      </h2>

      {list.length === 0 ? (
        <p className="text-center text-gray-500">No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((course, index) => (
            <CourseCard key={course.id || index} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Lessons;

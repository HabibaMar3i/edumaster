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
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Available <span className="text-[#49BBBD]">Lessons</span>
          </h2>
          <p className="text-gray-500 mt-2">Explore our collection of high-quality educational content</p>
        </div>
        
        {list.length > 0 && (
          <div className="mt-4 md:mt-0 text-sm font-medium text-gray-400 bg-gray-100 px-4 py-2 rounded-full">
            Showing {list.length} lessons
          </div>
        )}
      </div>

      {list.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-dashed border-gray-200">
          <p className="text-xl text-gray-400">No courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {list.map((course, index) => (
            <CourseCard key={course._id || course.id || index} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Lessons;

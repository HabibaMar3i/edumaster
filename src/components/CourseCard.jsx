import React from "react";
import { useDispatch } from "react-redux";
import { payLesson } from "../features/userCourses/userCoursesSlice";
import { toast } from "react-toastify";
import { Play, Clock, DollarSign, BookOpen } from "lucide-react";

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(course.video);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` 
    : "https://via.placeholder.com/300x200?text=No+Video";

  const handlePay = async () => {
    try {
      const resultAction = await dispatch(payLesson(course._id || course.id));
      if (payLesson.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload.message || "Redirecting to payment...");
        if (resultAction.payload.paymentUrl) {
          window.location.href = resultAction.payload.paymentUrl;
        }
      } else {
        toast.error(resultAction.payload || "Failed to pay for lesson");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border-none hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* Video Thumbnail with Play Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-[#49BBBD] text-white rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Play className="fill-current w-6 h-6 ml-1" />
          </div>
        </div>
        {course.isPaid && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                PAID
            </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-[#49BBBD]" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {course.category || course.classLevel}
            </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-3 group-hover:text-[#49BBBD] transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{course.duration || "45 min"}</span>
          </div>
          <div className="flex items-center gap-1 text-[#49BBBD] font-bold text-xl">
            <DollarSign className="w-4 h-4" />
            <span>{course.price || 0}</span>
          </div>
        </div>

        <button
          onClick={handlePay}
          className="mt-5 w-full py-3 bg-[#49BBBD] text-white rounded-xl hover:bg-[#3da9ab] transition-all duration-300 font-bold shadow-md hover:shadow-lg"
        >
          {course.price > 0 ? "Pay Now" : "Enroll for Free"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

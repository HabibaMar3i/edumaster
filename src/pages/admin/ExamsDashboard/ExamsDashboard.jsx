import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ExamsList() {
  const token = useSelector((state) => state.auth.token);

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  async function fetchExams() {
    try {
      const res = await axios.get("https://edu-master-psi.vercel.app/exam", {
        headers: {
          token,
        },
      });
      console.log(res);
      setExams(res.data.data || res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function deleteExam(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://edu-master-psi.vercel.app/exam/${id}`, {
        headers: { token },
      });

      setExams((prev) => prev.filter((exam) => exam._id !== id));
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Failed to delete exam");
    }
  }

  if (loading) {
    return <p className="p-6">Loading exams...</p>;
  }

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Exams</h2>
          <Link
            to={"/create-exam"}
            className="px-4 py-2 bg-[#49bbbd] text-white rounded-lg"
          >
            + Create Exam
          </Link>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Class</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr key={exam._id} className="border-t">
                <td className="p-3">{exam.title}</td>
                <td className="p-3">{exam.classLevel}</td>
                <td className="p-3">{exam.duration} min</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      exam.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {exam.isPublished ? "Published" : "Draft"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2">
                  {/* EDIT */}
                  <Link
                    to={`/edit-exam/${exam._id}`}
                    className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    Edit
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteExam(exam._id)}
                    className="px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

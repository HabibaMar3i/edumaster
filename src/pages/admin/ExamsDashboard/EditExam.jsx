import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function EditExam() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const [form, setForm] = useState({
        title: "",
        description: "",
        duration: "",
        classLevel: "",
        startDate: "",
        endDate: "",
        isPublished: false,
    });
    async function getexam() {

        const res = await axios.get(
            `https://edu-master-psi.vercel.app/exam/get/${id}`,
            {
                headers: { token },
            }
        );
        // console.log(res.data.data)
        setForm({
            title: res.data.data.title,
            description: res.data.data.description,
            duration: res.data.data.duration,
            classLevel: res.data.data.classLevel,
            startDate: res.data.data.startDate.slice(0, 10),
            endDate: res.data.data.endDate.slice(0, 10),
            isPublished: false,
        }

        );
    }
    async function edit() {
        if (!token) {
            toast.error("Not authenticated");
            return;
        }

        setLoading(true);
        setError(false);

        // Toast loading
        const toastId = toast.loading("Updating exam...");

        try {
            const payload = {
                ...form,
                duration: Number(form.duration),
            };

            const res = await axios.put(
                `https://edu-master-psi.vercel.app/exam/${id}`,
                payload,
                { headers: { token } }
            );

            toast.update(toastId, {
                render: "Exam updated successfully ✅",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            navigate("/admin-exams");

        } catch (error) {
            const msg =
                error.response?.data?.message || "Something went wrong";

            setError(msg);

            toast.update(toastId, {
                render: msg,
                type: "error",
                isLoading: false,
                autoClose: 4000,
            });

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getexam()
    }, [])

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            duration: Number(form.duration),

            [name]: type === "checkbox" ? checked : value,
        });
    }



    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">
                    Create New Exam
                </h2>

                <form method="post" className="space-y-5">
                    {/* Exam Title */}
                    {error && (
                        <p className="text-red-600 text-sm mb-3">
                            {error}
                        </p>
                    )}                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Exam Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Math Exam"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Class Level
                            </label>
                            <select
                                name="classLevel"
                                value={form.classLevel}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            >
                                <option value="">Select Level</option>
                                <option>Grade 1 Secondary</option>
                                <option>Grade 2 Secondary</option>
                                <option>Grade 3 Secondary</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Duration (minutes)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="60"
                                required
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Final exam covering algebra..."
                        />
                    </div>

                    {/* Publish */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={form.isPublished}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <span className="text-sm">Publish Exam</span>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">


                        <button
                            onClick={edit}
                            type="button"
                            className="px-4 py-2 rounded-lg bg-[#49bbbd]  text-white hover:bg-blue-700"
                        >

                            {loading ? "loading...." : "Edit Exam"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

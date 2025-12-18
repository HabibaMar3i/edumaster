import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ModalComp({ isOpen, onOpenChange, exam }) {
    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        duration: "",
        classLevel: "",
        startDate: "",
        endDate: "",
        isPublished: false,
    });

    /* ======================
       لو Edit → املأ الفورم
    ====================== */
    useEffect(() => {
        if (exam) {
            setForm({
                title: exam.title,
                description: exam.description,
                duration: exam.duration,
                classLevel: exam.classLevel,
                startDate: exam.startDate?.slice(0, 10),
                endDate: exam.endDate?.slice(0, 10),
                isPublished: exam.isPublished,
            });
        } else {
            setForm({
                title: "",
                description: "",
                duration: "",
                classLevel: "",
                startDate: "",
                endDate: "",
                isPublished: false,
            });
        }
    }, [exam]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    async function submit() {
        if (!token) {
            toast.error("Not authenticated");
            return;
        }

        setLoading(true);
        const toastId = toast.loading(
            exam ? "Updating exam..." : "Creating exam..."
        );

        try {
            const payload = {
                ...form,
                duration: Number(form.duration),
            };

            if (exam) {
                // EDIT
                await axios.put(
                    `https://edu-master-psi.vercel.app/exam/${exam._id}`,
                    payload,
                    { headers: { token } }
                );
            } else {
                // CREATE
                await axios.post(
                    "https://edu-master-psi.vercel.app/exam",
                    payload,
                    { headers: { token } }
                );
            }

            toast.update(toastId, {
                render: exam
                    ? "Exam updated successfully ✅"
                    : "Exam created successfully 🎉",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            onOpenChange(false);

        } catch (error) {
            toast.update(toastId, {
                render: error.response?.data?.message || "Something went wrong ❌",
                type: "error",
                isLoading: false,
                autoClose: 4000,
                closeOnClick: true,
                pauseOnHover: false,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="text-xl font-bold">
                            {exam ? "Edit Exam" : "Create New Exam"}
                        </ModalHeader>

                        <ModalBody className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Exam Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Class Level
                                    </label>
                                    <select
                                        name="classLevel"
                                        value={form.classLevel}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
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
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    name="startDate"
                                    value={form.startDate}
                                    onChange={handleChange}
                                    className="border rounded-lg px-3 py-2"
                                />
                                <input
                                    type="date"
                                    name="endDate"
                                    value={form.endDate}
                                    onChange={handleChange}
                                    className="border rounded-lg px-3 py-2"
                                />
                            </div>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={form.isPublished}
                                    onChange={handleChange}
                                />
                                Publish Exam
                            </label>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                className="bg-[#49bbbd] text-white"
                                isLoading={loading}
                                onPress={submit}
                            >
                                {exam ? "Save Changes" : "Create Exam"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
    createExam,
    updateExam,
} from "../features/exams/api/examApi";

export default function ModalComp({ isOpen, onOpenChange, exam }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const { creating, updatingId } = useSelector(
        (state) => state.exams
    );

    const isEditing = Boolean(exam);
    const loading = isEditing
        ? updatingId === exam?._id
        : creating;

    const [form, setForm] = useState({
        title: "",
        description: "",
        duration: "",
        classLevel: "",
        startDate: "",
        endDate: "",
        isPublished: false,
    });

    /* ================= FILL FORM ================= */
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

    /* ================= SUBMIT ================= */
    function submit() {
        if (!token) {
            toast.error("Not authenticated");
            return;
        }

        const payload = {
            ...form,
            duration: Number(form.duration),
        };

        const action = exam
            ? updateExam({
                id: exam._id,
                data: payload,
                token,
            })
            : createExam({
                data: payload,
                token,
            });

        const toastId = toast.loading(
            exam ? "Updating exam..." : "Creating exam..."
        );

        dispatch(action)
            .unwrap()
            .then(() => {
                toast.update(toastId, {
                    render: exam
                        ? "Exam updated successfully ✅"
                        : "Exam created successfully 🎉",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                onOpenChange(false);
            })
            .catch((err) => {
                toast.update(toastId, {
                    render: err || "Something went wrong ❌",
                    type: "error",
                    isLoading: false,
                    autoClose: 4000,
                });
            });
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
            scrollBehavior="inside"
            className="mx-2 sm:mx-0"
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    />
                                </div>
                            </div>


                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={6}
                                className="w-full border rounded-lg px-3 py-2 resize-none sm:rows-10"
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

                        <ModalFooter className="flex flex-col sm:flex-row gap-2">
                            <Button
                                variant="light"
                                onPress={onClose}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>

                            <Button
                                className="bg-[#49bbbd] text-white w-full sm:w-auto"
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

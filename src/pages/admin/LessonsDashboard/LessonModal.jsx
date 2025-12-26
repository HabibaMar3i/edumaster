import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLesson, updateLesson, clearMessage } from "../../../features/Lessons/slice/lessonSlice";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    Select,
    SelectItem,
    Card,
    ScrollShadow,
} from "@heroui/react";
import { toast } from "react-toastify";
import { Calendar, DollarSign, Video, BookOpen, Clock, Tag } from "lucide-react";

export default function LessonModal({ isOpen, onOpenChange, lesson, classLevels }) {
    const dispatch = useDispatch();
    const { loading, message, success } = useSelector((state) => state.lessons);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        video: "",
        classLevel: "Grade 1 Secondary",
        scheduledDate: "",
        price: 0,
    });

    // Initialize form when lesson changes
    useEffect(() => {
        if (lesson) {
            setFormData({
                title: lesson.title || "",
                description: lesson.description || "",
                video: lesson.video || "",
                classLevel: lesson.classLevel || "Grade 1 Secondary",
                scheduledDate: lesson.scheduledDate
                    ? new Date(lesson.scheduledDate).toISOString().split("T")[0]
                    : "",
                price: lesson.price || 0,
            });
        } else {
            // Reset form for new lesson
            setFormData({
                title: "",
                description: "",
                video: "",
                classLevel: "Grade 1 Secondary",
                scheduledDate: "",
                price: 0,
            });
        }
    }, [lesson]);

    const handleSubmit = async (onClose) => {
        try {
            // Prepare data for API
            const apiData = lesson
                ? {
                    title: formData.title,
                    price: Number(formData.price),
                }
                : {
                    title: formData.title,
                    description: formData.description,
                    video: formData.video,
                    classLevel: formData.classLevel,
                    scheduledDate: formData.scheduledDate,
                    price: Number(formData.price),
                };

            if (lesson) {
                // Update existing lesson
                await dispatch(updateLesson({ id: lesson._id, lessonData: apiData })).unwrap();
            } else {
                // Create new lesson
                await dispatch(createLesson(apiData)).unwrap();
            }

            // Close modal on success
            onClose();
        } catch (error) {
            console.error("Error saving lesson:", error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
            placement="center"
            scrollBehavior="inside"
            classNames={{
                base: "max-h-[90vh]",
                wrapper: "overflow-hidden",
                body: "p-0",
            }}
        >
            <ModalContent className="overflow-hidden">
                {(onClose) => (
                    <>
                        {/* Fixed Header */}
                        <ModalHeader className="sticky top-0 z-50 bg-gradient-to-r from-[#49bbbd] to-teal-500 p-6 border-b border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {lesson ? "Edit Lesson" : "Create New Lesson"}
                                    </h2>
                                    <p className="text-white/90 text-sm">
                                        {lesson ? "Update your lesson details" : "Add a new educational lesson"}
                                    </p>
                                </div>
                            </div>
                        </ModalHeader>

                        {/* Scrollable Body */}
                        <ScrollShadow className="max-h-[60vh] overflow-y-auto" hideScrollBar={false}>
                            <ModalBody className="p-6">
                                <div className="space-y-6">
                                    {/* Lesson Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Lesson Title
                                        </label>
                                        <Input
                                            placeholder="Enter lesson title (e.g., Introduction to Algebra)"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            isRequired
                                            className="w-full"
                                            size="lg"
                                            radius="lg"
                                            classNames={{
                                                input: "text-md",
                                            }}
                                        />
                                    </div>

                                    {/* Class Level & Price */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Class Level
                                            </label>
                                            <Select
                                                selectedKeys={[formData.classLevel]}
                                                onSelectionChange={(keys) =>
                                                    setFormData({ ...formData, classLevel: Array.from(keys)[0] })
                                                }
                                                className="w-full"
                                                size="lg"
                                                radius="lg"
                                                startContent={<Tag className="w-4 h-4 text-gray-400" />}
                                            >
                                                {classLevels.map((level) => (
                                                    <SelectItem key={level} value={level}>
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Price
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                startContent={<DollarSign className="w-4 h-4 text-gray-400" />}
                                                min="0"
                                                step="0.01"
                                                className="w-full"
                                                size="lg"
                                                radius="lg"
                                                classNames={{
                                                    input: "text-md",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Scheduled Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Scheduled Date
                                        </label>
                                        <Input
                                            type="date"
                                            value={formData.scheduledDate}
                                            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                                            className="w-full"
                                            size="lg"
                                            radius="lg"
                                            startContent={<Calendar className="w-4 h-4 text-gray-400" />}
                                        />
                                    </div>

                                    {/* Video URL - Only for new lessons */}
                                    {!lesson && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                YouTube Video URL
                                            </label>
                                            <Input
                                                placeholder="https://www.youtube.com/watch?v=..."
                                                value={formData.video}
                                                onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                                                className="w-full"
                                                size="lg"
                                                radius="lg"
                                                startContent={<Video className="w-4 h-4 text-gray-400" />}
                                            />
                                        </div>
                                    )}

                                    {/* Description - Only for new lessons */}
                                    {!lesson && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Description
                                            </label>
                                            <Textarea
                                                placeholder="Enter detailed lesson description..."
                                                value={formData.description}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, description: e.target.value })
                                                }
                                                minRows={4}
                                                className="w-full"
                                                radius="lg"
                                                classNames={{
                                                    input: "resize-none",
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Price Info Banner */}
                                    {formData.price > 0 ? (
                                        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                                            <div className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <DollarSign className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-green-700">Paid Lesson</p>
                                                        <p className="text-xs text-green-600">
                                                            Students will need to purchase access to this lesson
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ) : (
                                        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                                            <div className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <Clock className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-blue-700">Free Lesson</p>
                                                        <p className="text-xs text-blue-600">
                                                            This lesson will be accessible to all students for free
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    )}
                                </div>
                            </ModalBody>
                        </ScrollShadow>

                        {/* Fixed Footer */}
                        <ModalFooter className="sticky bottom-0 bg-white p-6 border-t z-50">
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <Button
                                    variant="light"
                                    onPress={onClose}
                                    className="flex-1 sm:flex-none px-8 font-medium"
                                    size="lg"
                                    radius="lg"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 sm:flex-auto bg-gradient-to-r from-[#49bbbd] to-teal-500 text-white font-medium"
                                    onPress={() => handleSubmit(onClose)}
                                    isLoading={loading}
                                    disabled={loading || !formData.title.trim()}
                                    size="lg"
                                    radius="lg"
                                >
                                    {loading
                                        ? lesson
                                            ? "Updating..."
                                            : "Creating..."
                                        : lesson
                                            ? "Update Lesson"
                                            : "Create Lesson"}
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
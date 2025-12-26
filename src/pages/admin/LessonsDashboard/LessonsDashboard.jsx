import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchLessons,
    deleteLesson,
    setClassFilter,
    setSelectedLesson,
    setViewingLesson,
} from "../../../features/Lessons/slice/lessonSlice";
import {
    Button,
    useDisclosure,
    Select,
    SelectItem,
    Card,
    CardBody,
    Chip,
    Spinner,
} from "@heroui/react";
import { toast } from "react-toastify";
import LessonModal from "./LessonModal";
import {
    Trash2,
    Edit,
    Eye,
    Calendar,
    DollarSign,
    Video,
    BookOpen,
    Filter,
    Plus,
} from "lucide-react";

export default function LessonsDashboard() {
    const dispatch = useDispatch();
    const {
        loading,
        lessons,
        classFilter,
        message,
        success,
        selectedLesson,
        viewingLesson,
    } = useSelector((state) => state.lessons);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Class level options
    const classLevels = [
        "Grade 1 Secondary",
        "Grade 2 Secondary",
        "Grade 3 Secondary",
        "Grade 4 Secondary",
        "Grade 5 Secondary",
        "Grade 6 Secondary",
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
    ];

    // Fetch lessons on component mount and when classFilter changes
    useEffect(() => {
        dispatch(fetchLessons(classFilter));
    }, [dispatch, classFilter]);

    // Handle toast messages
    useEffect(() => {
        if (message) {
            if (success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        }
    }, [message, success]);

  

    // Handle delete lesson
    const handleDeleteLesson = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this lesson? This action cannot be undone."
        );
        if (!confirmDelete) return;

        try {
            await dispatch(deleteLesson(id)).unwrap();
        } catch (error) {
            console.error("Error deleting lesson:", error);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // View lesson details
    const handleViewLesson = (lesson) => {
        dispatch(setViewingLesson(lesson));
        setIsViewModalOpen(true);
    };

    // Open edit modal
    const handleEditLesson = (lesson) => {
        dispatch(setSelectedLesson(lesson));
        onOpen();
    };

    // Open create modal
    const handleCreateLesson = () => {
        dispatch(setSelectedLesson(null));
        onOpen();
    };

    if (loading && lessons.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center p-4">
                <Card className="max-w-md w-full shadow-xl border-none">
                    <CardBody className="flex flex-col items-center justify-center p-8">
                        <Spinner
                            classNames={{
                                circle1: "border-b-[#49bbbd]",
                                circle2: "border-b-[#49bbbd]",
                            }}
                            size="lg"
                        />
                        <p className="mt-4 text-gray-600 font-medium">Loading lessons...</p>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 lg:p-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                            Lessons Management
                        </h1>
                        <p className="text-gray-600">
                            Create, edit, and manage your educational lessons
                        </p>
                    </div>

                    <Button
                        className="bg-gradient-to-r from-[#49bbbd] to-teal-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        onPress={handleCreateLesson}
                        startContent={<Plus className="w-5 h-5" />}
                    >
                        Create New Lesson
                    </Button>
                </div>

                {/* Filter Card */}
                <Card className="shadow-lg border-none bg-white">
                    <CardBody className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <Filter className="w-5 h-5 text-[#49bbbd]" />
                                    <span className="text-gray-700 font-medium">Filter by:</span>
                                </div>
                                <Select
                                    className="w-full sm:w-64"
                                    selectedKeys={[classFilter]}
                                    onSelectionChange={(keys) =>
                                        dispatch(setClassFilter(Array.from(keys)[0]))
                                    }
                                    startContent={<BookOpen className="w-4 h-4 text-gray-400" />}
                                >
                                    {classLevels.map((level) => (
                                        <SelectItem key={level} value={level}>
                                            {level}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <Chip
                                color="primary"
                                variant="flat"
                                classNames={{
                                    content: "font-medium",
                                }}
                            >
                                {lessons.length} {lessons.length === 1 ? "Lesson" : "Lessons"}
                            </Chip>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Lessons Grid/Table */}
            {lessons.length === 0 ? (
                <Card className="shadow-xl border-none bg-white">
                    <CardBody className="flex flex-col items-center justify-center p-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl flex items-center justify-center mb-6">
                            <BookOpen className="w-10 h-10 text-[#49bbbd]" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No lessons found
                        </h3>
                        <p className="text-gray-500 text-center mb-6">
                            No lessons available for {classFilter}. Create your first lesson
                            to get started.
                        </p>
                        <Button
                            className="bg-gradient-to-r from-[#49bbbd] to-teal-500 text-white"
                            onPress={handleCreateLesson}
                            startContent={<Plus className="w-4 h-4" />}
                        >
                            Create First Lesson
                        </Button>
                    </CardBody>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons.map((lesson) => (
                        <Card
                            key={lesson._id}
                            className="shadow-lg hover:shadow-xl transition-all duration-300 border-none group overflow-hidden"
                        >
                            <CardBody className="p-6">
                                {/* Lesson Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl flex items-center justify-center">
                                        <Video className="w-6 h-6 text-[#49bbbd]" />
                                    </div>
                                    <Chip
                                        size="sm"
                                        color={lesson.isPaid ? "success" : "primary"}
                                        variant="flat"
                                    >
                                        {lesson.isPaid ? "Paid" : "Free"}
                                    </Chip>
                                </div>

                                {/* Lesson Details */}
                                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#49bbbd] transition-colors">
                                    {lesson.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {lesson.description}
                                </p>

                                {/* Metadata */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">
                                                {lesson.classLevel}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">
                                                {formatDate(lesson.scheduledDate)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign
                                            className={`w-4 h-4 ${lesson.price > 0 ? "text-green-500" : "text-gray-400"
                                                }`}
                                        />
                                        <span
                                            className={`text-sm font-medium ${lesson.price > 0
                                                    ? "text-green-600"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            ${lesson.price}{" "}
                                            {lesson.price === 0 && "(Free)"}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 pt-4 border-t">
                                    <Button
                                        size="sm"
                                        variant="light"
                                        className="flex-1 text-gray-600 hover:text-blue-600"
                                        onPress={() => handleViewLesson(lesson)}
                                        startContent={<Eye className="w-4 h-4" />}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="light"
                                        className="flex-1 text-blue-600 hover:text-blue-700"
                                        onPress={() => handleEditLesson(lesson)}
                                        startContent={<Edit className="w-4 h-4" />}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="light"
                                        className="flex-1 text-red-600 hover:text-red-700"
                                        onPress={() => handleDeleteLesson(lesson._id)}
                                        startContent={<Trash2 className="w-4 h-4" />}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            <LessonModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                lesson={selectedLesson}
                classLevels={classLevels}
            />

            {/* View Modal */}
            {isViewModalOpen && viewingLesson && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto border-none shadow-2xl">
                        <CardBody className="p-0">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white z-10 p-6 border-b">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl flex items-center justify-center">
                                            <Video className="w-6 h-6 text-[#49bbbd]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {viewingLesson.title}
                                            </h2>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Chip size="sm" color="primary" variant="flat">
                                                    {viewingLesson.classLevel}
                                                </Chip>
                                                <Chip
                                                    size="sm"
                                                    color={viewingLesson.isPaid ? "success" : "primary"}
                                                    variant="flat"
                                                >
                                                    {viewingLesson.isPaid ? "Paid Lesson" : "Free Lesson"}
                                                </Chip>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        className="text-gray-400 hover:text-gray-600"
                                        onPress={() => setIsViewModalOpen(false)}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                        Description
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg border">
                                        <p className="text-gray-600">{viewingLesson.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="border-none shadow-sm">
                                        <CardBody className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                                    <Video className="w-5 h-5 text-[#49bbbd]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-700">
                                                        Video Link
                                                    </h4>
                                                    <a
                                                        href={viewingLesson.video}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-[#49bbbd] hover:underline"
                                                    >
                                                        Watch on YouTube
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    <Card className="border-none shadow-sm">
                                        <CardBody className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                                    <Calendar className="w-5 h-5 text-green-500" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-700">
                                                        Scheduled Date
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {formatDate(viewingLesson.scheduledDate)}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    <Card className="border-none shadow-sm">
                                        <CardBody className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-10 h-10 ${viewingLesson.price > 0
                                                            ? "bg-green-50"
                                                            : "bg-gray-50"
                                                        } rounded-lg flex items-center justify-center`}
                                                >
                                                    <DollarSign
                                                        className={`w-5 h-5 ${viewingLesson.price > 0
                                                                ? "text-green-500"
                                                                : "text-gray-400"
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-700">Price</h4>
                                                    <p
                                                        className={`text-sm ${viewingLesson.price > 0
                                                                ? "text-green-600"
                                                                : "text-gray-500"
                                                            }`}
                                                    >
                                                        ${viewingLesson.price}{" "}
                                                        {viewingLesson.price === 0 && "(Free)"}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    <Card className="border-none shadow-sm">
                                        <CardBody className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                                    <Calendar className="w-5 h-5 text-purple-500" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-700">
                                                        Created Date
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {formatDate(viewingLesson.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="sticky bottom-0 bg-white p-6 border-t">
                                <div className="flex justify-end">
                                    <Button
                                        className="px-6 bg-gradient-to-r from-[#49bbbd] to-teal-500 text-white"
                                        onPress={() => {
                                            handleEditLesson(viewingLesson);
                                            setIsViewModalOpen(false);
                                        }}
                                        startContent={<Edit className="w-4 h-4" />}
                                    >
                                        Edit Lesson
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    );
}
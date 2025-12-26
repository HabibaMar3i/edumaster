import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, useDisclosure, Card, CardBody, Chip } from "@heroui/react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

import FormModal from "../../../components/Modal";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  fetchExams,
  deleteExam,
} from "../../../features/exams/api/examApi";


export default function ExamsList() {
  const [deleteId, setDeleteId] = useState(null);
  const {
    isOpen: isDeleteOpen,
    onOpen: openDeleteModal,
    onOpenChange: onDeleteChange,
  } = useDisclosure();
  const [selectedExam, setSelectedExam] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const { exams, loading, deletingId, error } = useSelector(
    (state) => state.exams
  );

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchExams(token));
  }, [dispatch, token]);

  

  if (loading) {
    return <p className="p-6">Loading exams...</p>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Exams Management
              </h1>
              <p className="text-gray-600">
                Create, edit, and manage your educational exams
              </p>
            </div>

            <Button
              className="bg-gradient-to-r from-[#49bbbd] to-teal-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onPress={() => {
                setSelectedExam(null);
                onOpen();
              }}
              startContent={<Plus className="w-5 h-5" />}
            >
              Create New Exam
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FormModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            exam={selectedExam}
          />

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

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
                      className={`px-2 py-1 rounded text-xs ${exam.isPublished
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
                    <Button
                      size="sm"
                      className="bg-blue-100 text-blue-700"
                      onPress={() => {
                        setSelectedExam(exam);
                        onOpen();
                      }}
                    >
                      Edit
                    </Button>

                    {/* DELETE */}
                    <Button
                      size="sm"
                      color="danger"
                      isLoading={deletingId === exam._id}
                      onPress={() => {
                        setDeleteId(exam._id);
                        openDeleteModal();
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-bold text-red-600">
                Delete Exam
              </ModalHeader>

              <ModalBody>
                <p>
                  Are you sure you want to delete this exam?
                  <br />
                  <span className="text-sm text-gray-500">
                    This action cannot be undone.
                  </span>
                </p>
              </ModalBody>

              <ModalFooter className="flex gap-2">
                <Button variant="light" onPress={onClose} className="flex-1">
                  Cancel
                </Button>

                <Button
                  color="danger"
                  className="flex-1"
                  isLoading={deletingId === deleteId}
                  onPress={() => {
                    dispatch(deleteExam({ id: deleteId, token }))
                      .unwrap()
                      .then(() => {
                        toast.success("Exam deleted successfully 🗑️");
                        onClose();
                        setDeleteId(null);
                      })
                      .catch((err) => {
                        toast.error(err || "Failed to delete exam ❌");
                      });
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

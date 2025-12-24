import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions } from "../../../../features/questions/api/getAllQuestions";
import { toast } from "react-toastify";
export default function DeleteModal({ isOpen, onOpenChange, question }) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const handleDeleteQ = async () => {
    //
    try {
      await axios.delete(
        `https://edu-master-psi.vercel.app/question/${question._id}`,
        {
          headers: { token },
        }
      );
      toast.success("Delete Question");
      dispatch(getAllQuestions());
    } catch (error) {
      toast.error("Error Delete Question");
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Question
            </ModalHeader>
            <ModalBody>
              <p>Do you want to remove this question from the exam?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  handleDeleteQ();
                  setTimeout(() => onClose(), 500);
                }}
              >
                confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

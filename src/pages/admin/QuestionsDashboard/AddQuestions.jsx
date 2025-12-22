import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import DeleteModal from "./Modals/DeleteModal";
import AddModal from "./Modals/AddModal";
import ShowModal from "./Modals/ShowModal";
import EditModal from "./Modals/EditModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllQuestions } from "../../../features/questions/api/getAllQuestions";
import { selectQuestionsByExamId } from "../../../features/questions/selectors";
import { fetchExams } from "../../../features/exams/api/examApi";

export default function AddQuestions() {
  const dispatch = useDispatch();
  const { idExam } = useParams();

  const token = useSelector((state) => state.auth.token);
  const { exams } = useSelector((state) => state.exams);

  // send Question
  const [selectQuestion, setSelectQuestion] = useState({});

  //  Modle State
  const deleteModle = useDisclosure();
  const addModle = useDisclosure();
  const editModle = useDisclosure();
  const showModle = useDisclosure();

  useEffect(() => {
    dispatch(getAllQuestions());
    dispatch(fetchExams(token));
  }, []);

  const filteredExams = exams.filter((exam) => exam._id === idExam);
  const filteredQuestions = useSelector(selectQuestionsByExamId(idExam));
  return (
    <div className="p-10">
      <div className="flex gap-2 justify-between my-5">
        <div className="info Exam">
          <p className="text-[24px] font-bold">{filteredExams[0]?.title}</p>
          <p className="text-[14px] text-[#ccc]">
            {filteredExams[0]?.classLevel}
          </p>
        </div>
        <div className="add">
          <Button
            className="border-[#49bbbd] text-[#49bbbd]"
            variant="bordered"
            onPress={() => addModle.onOpen(true)}
          >
            + Add Questions
          </Button>
        </div>
      </div>
      {/*
         show Q
         */}
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Question Type</TableColumn>
          <TableColumn>Points</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Questions to display Frist Add"}>
          {filteredQuestions.map((ex) => {
            return (
              <TableRow key={ex._id}>
                <TableCell>{ex.text}</TableCell>
                <TableCell>{ex.type}</TableCell>
                <TableCell>
                  <p className=""> {ex.points}</p>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Tooltip content="Show details" showArrow={true}>
                      <Button
                        isIconOnly
                        variant="light"
                        onPress={() => {
                          showModle.onOpen(true);
                          setSelectQuestion(ex);
                        }}
                      >
                        <i className="fa-regular fa-eye text-[#49bbbd]"></i>
                      </Button>
                    </Tooltip>
                    <Tooltip content="Edite" showArrow={true}>
                      <Button
                        isIconOnly
                        variant="light"
                        color="warning"
                        onPress={() => {
                            setSelectQuestion(ex);
                          editModle.onOpen(true);
                        }}
                      >
                        <i className="fa-regular fa-pen-to-square "></i>
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete" showArrow={true}>
                      <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        onPress={() => {
                          deleteModle.onOpen(true);
                          setSelectQuestion(ex);
                        }}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* 
        Modles
        */}

      <DeleteModal
        isOpen={deleteModle.isOpen}
        onOpenChange={deleteModle.onOpenChange}
        question={selectQuestion}
      />
      <AddModal isOpen={addModle.isOpen} onOpenChange={addModle.onOpenChange} />
      <ShowModal
        isOpen={showModle.isOpen}
        onOpenChange={showModle.onOpenChange}
        question={selectQuestion}
      />
      <EditModal
        isOpen={editModle.isOpen}
        onOpenChange={editModle.onOpenChange}
        question={selectQuestion}
      />
    </div>
  );
}

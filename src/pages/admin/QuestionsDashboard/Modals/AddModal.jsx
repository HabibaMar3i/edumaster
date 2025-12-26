import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addQuestion } from "../../../../features/questions/api/addQuestions";
import { toast } from "react-toastify";
import { getAllQuestions } from "../../../../features/questions/api/getAllQuestions";

export default function AddModal({ isOpen, onOpenChange }) {
  const dispatch = useDispatch();
  const { idExam } = useParams();

  // States
  const [typeQuestion, setTypeQuestion] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [points, setPoints] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Multiple Choice States
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [correctMultipleChoice, setCorrectMultipleChoice] = useState("");

  // True/False State
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("");

  // Short Answer State
  const [shortAnswer, setShortAnswer] = useState("");

  const typeQuestions = [
    { key: "multiple-choice", label: "Multiple Choice" },
    { key: "true-false", label: "True & False" },
    { key: "short-answer", label: "Short Answer" },
  ];

  // Submit
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    let questionData = {
      text: questionText,
      type: typeQuestion,
      exam: idExam,
      points: points,
    };

    switch (typeQuestion) {
      case "multiple-choice":
        questionData.options = [answerA, answerB, answerC, answerD];
        questionData.correctAnswer = correctMultipleChoice;
        break;

      case "true-false":
        questionData.correctAnswer = trueFalseAnswer;
        break;

      case "short-answer":
        questionData.correctAnswer = shortAnswer;
        break;

      default:
        setIsSubmitting(false);
        return;
    }

    try {
      await dispatch(addQuestion(questionData)).unwrap();
      toast.success("Question added successfully");
      resetForm();
      onOpenChange(false);
      dispatch(getAllQuestions());
    } catch (error) {
      toast.error("Failed to add question");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Form
  const resetForm = () => {
    setTypeQuestion("");
    setQuestionText("");
    setPoints(0);
    setAnswerA("");
    setAnswerB("");
    setAnswerC("");
    setAnswerD("");
    setCorrectMultipleChoice("");
    setTrueFalseAnswer("");
    setShortAnswer("");
    setIsSubmitting(false);
  };

  const isFormValid = () => {
    if (!questionText || !typeQuestion || points <= 0) return false;

    switch (typeQuestion) {
      case "multiple-choice":
        return (
          answerA &&
          answerB &&
          answerC &&
          answerD &&
          correctMultipleChoice !== ""
        );
      case "true-false":
        return trueFalseAnswer !== "";
      case "short-answer":
        return shortAnswer !== "";
      default:
        return false;
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Question
            </ModalHeader>
            <ModalBody>
              {/* Type Question */}
              <Select
                label="Select Type"
                placeholder="Select Type Questions"
                aria-label="Select Type"
                selectionMode="single"
                onChange={(e) => setTypeQuestion(e.target.value)}
                selectedKeys={typeQuestion ? [typeQuestion] : []}
              >
                {typeQuestions.map((type) => (
                  <SelectItem
                    key={type.key}
                    variant={"bordered"}
                    aria-label={type.label}
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </Select>

              {/* Question Text */}
              {typeQuestion !== "" && (
                <Input
                  label="Enter Title Question"
                  aria-label="Title Question"
                  type="text"
                  variant={"bordered"}
                  size="sm"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
              )}

              {/* Multiple Choice */}
              {typeQuestion === "multiple-choice" && (
                <>
                  <div>
                    <p className="text-[16px] text-[#71717a]">Add Answers</p>
                  </div>
                  <Input
                    label="Enter Answer A"
                    aria-label="Answer A"
                    type="text"
                    variant={"bordered"}
                    size="sm"
                    value={answerA}
                    onChange={(e) => setAnswerA(e.target.value)}
                  />
                  <Input
                    label="Enter Answer B"
                    aria-label="Answer B"
                    type="text"
                    variant={"bordered"}
                    size="sm"
                    value={answerB}
                    onChange={(e) => setAnswerB(e.target.value)}
                  />
                  <Input
                    label="Enter Answer C"
                    aria-label="Answer C"
                    type="text"
                    variant={"bordered"}
                    size="sm"
                    value={answerC}
                    onChange={(e) => setAnswerC(e.target.value)}
                  />
                  <Input
                    label="Enter Answer D"
                    aria-label="Answer D"
                    type="text"
                    variant={"bordered"}
                    size="sm"
                    value={answerD}
                    onChange={(e) => setAnswerD(e.target.value)}
                  />
                  <RadioGroup
                    label="Select Correct Answer"
                    orientation="horizontal"
                    aria-label="Correct Answer"
                    value={correctMultipleChoice}
                    onValueChange={setCorrectMultipleChoice}
                    color="success"
                    className="[&_[data-selected=true]]:text-teal-500 [&_[data-selected=true]_[data-slot=control]]:bg-teal-500 [&_[data-selected=true]_[data-slot=control]]:border-teal-500"
                  >
                    <Radio value={answerA} isDisabled={!answerA}>
                      A
                    </Radio>
                    <Radio value={answerB} isDisabled={!answerB}>
                      B
                    </Radio>
                    <Radio value={answerC} isDisabled={!answerC}>
                      C
                    </Radio>
                    <Radio value={answerD} isDisabled={!answerD}>
                      D
                    </Radio>
                  </RadioGroup>
                </>
              )}

              {/* True & False */}
              {typeQuestion === "true-false" && (
                <RadioGroup
                  label="Select your Answer"
                  aria-label="Select Answer"
                  value={trueFalseAnswer}
                  onValueChange={setTrueFalseAnswer}
                  color="success"
                  className="[&_[data-selected=true]]:text-teal-500 [&_[data-selected=true]_[data-slot=control]]:bg-teal-500 [&_[data-selected=true]_[data-slot=control]]:border-teal-500"
                >
                  <Radio value="True">True</Radio>
                  <Radio value="False">False</Radio>
                </RadioGroup>
              )}

              {/* Short Answer */}
              {typeQuestion === "short-answer" && (
                <Input
                  label="Enter Correct Answer"
                  aria-label="Correct Answer"
                  type="text"
                  variant={"bordered"}
                  size="sm"
                  value={shortAnswer}
                  onChange={(e) => setShortAnswer(e.target.value)}
                />
              )}

              {/* Points */}
              {typeQuestion !== "" && (
                <>
                  <div>
                    <p className="text-[16px] text-[#71717a]">Add Point</p>
                  </div>
                  <NumberInput
                    placeholder="Enter Point"
                    aria-label="Enter Point"
                    variant="bordered"
                    value={points}
                    onValueChange={setPoints}
                    min={1}
                  />
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  resetForm();
                  onClose();
                }}
              >
                Close
              </Button>
              <Button
                className="bg-teal-500 text-white hover:bg-teal-600"
                onPress={handleSubmit}
                isDisabled={!isFormValid() || isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Confirm"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

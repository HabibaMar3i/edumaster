import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Textarea,
  Select,
  SelectItem,
  Divider,
  Chip,
  Card,
  CardBody,
} from "@heroui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function EditModal({ isOpen, onOpenChange, question })
{
const token = useSelector((state) => state.auth.token);
const [questionText, setQuestionText] = useState("");
const [questionType, setQuestionType] = useState("");
const [questionOptions, setQuestionOptions] = useState([]);
const [questionCorrectAnswer, setQuestionCorrectAnswer] = useState("");
const [questionPoints, setQuestionPoints] = useState(0);

useEffect(() => {
  if (isOpen && question) {
    setQuestionText(question.text || "");
    setQuestionType(question.type || "");
    setQuestionOptions(question.options || []);
    setQuestionCorrectAnswer(question.correctAnswer || "");
    setQuestionPoints(question.points || 0);
  }
}, [isOpen]);

  const handleSave = async () =>
  {
    let updatedQuestion = {
      text: questionText,
      type: questionType,
      correctAnswer: questionCorrectAnswer,
      exam: question.exam,
      points : questionPoints
    };
      if (questionType === "multiple-choice") {
        updatedQuestion.options = questionOptions;
      }
     
    try
    {
      const res = await axios.put(
        `https://edu-master-psi.vercel.app/question/${question._id}`,
        updatedQuestion, {
          headers : {token}
        }
      );
      toast.success("Question updated successfully!");
      return res.data
    } catch (error)
    {
      console.log(error)
     toast.error(error.response?.data?.message || "Failed to update question");
    }
  }
  console.log(question);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-3 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#49bbbd]">
                  Edit Question
                </h3>
                <Chip color="warning" variant="flat" size="sm">
                  Draft
                </Chip>
              </div>
              <Divider className="bg-[#49bbbd]/30" />
            </ModalHeader>

            <ModalBody className="gap-6 py-6">
              {/* Question Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#49bbbd] rounded-full"></span>
                  {question.type}
                </label>
                <Select
                  selectedKeys={[questionType]}
                  onChange={(e) => setQuestionType(e.target.value)}
                  classNames={{
                    trigger:
                      "border-2 border-[#49bbbd]/30 hover:border-[#49bbbd]",
                  }}
                >
                  <SelectItem key="multiple-choice" value="multiple-choice">
                    Multiple Choice
                  </SelectItem>
                  <SelectItem key="true-false" value="true-false">
                    True/False
                  </SelectItem>
                  <SelectItem key="short-answer" value="short-answer">
                    Short Answer
                  </SelectItem>
                </Select>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#49bbbd] rounded-full"></span>
                  Question Text
                </label>
                <Textarea
                  placeholder="Enter your question here..."
                  minRows={3}
                  value={questionText}
                  classNames={{
                    input: "text-gray-800",
                    inputWrapper:
                      "border-2 border-[#49bbbd]/30 hover:border-[#49bbbd] focus-within:border-[#49bbbd]",
                  }}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
              </div>

              {/* Options Multiple Choice */}
              {questionType === "multiple-choice" && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#49bbbd] rounded-full"></span>
                    Answer Options
                  </label>
                  <div className="space-y-2">
                    {questionOptions?.map((option, i) => (
                      <Card
                        key={i}
                        className="border-2 border-gray-200 hover:border-[#49bbbd]/50 transition-all"
                      >
                        <CardBody className="flex-row items-center gap-3 py-2 px-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm text-gray-600 flex-shrink-0">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <Input
                            placeholder={`Option ${String.fromCharCode(
                              65 + i
                            )}`}
                            variant="bordered"
                            classNames={{
                              inputWrapper: "border-none shadow-none",
                            }}
                            value={questionOptions[i]}
                            onChange={(e) => {
                              const newOptions = [...question.options];
                              newOptions[i] = e.target.value;
                              setQuestionOptions(newOptions);
                            }}
                          />
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={questionCorrectAnswer === option}
                              className="w-5 h-5 text-[#49bbbd] border-2 border-gray-300 focus:ring-2 focus:ring-[#49bbbd]/50 cursor-pointer"
                              onChange={() => setQuestionCorrectAnswer(option)}
                            />
                            <span className="text-xs text-gray-500">
                              Correct
                            </span>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Options True/False */}
              {questionType === "true-false" && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#49bbbd] rounded-full"></span>
                    Select Correct Answer
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["true", "false"].map((option) => (
                      <Card
                        key={option}
                        onClick={() => {
                          console.log("Clicked:", option);
                          setQuestionCorrectAnswer(option);
                        }}
                        className={`border-2 cursor-pointer transition-all ${
                          questionCorrectAnswer?.toLowerCase() === option
                            ? "border-[#49bbbd] bg-[#49bbbd]/10 ring-2 ring-[#49bbbd]/30"
                            : "border-gray-200 hover:border-[#49bbbd]"
                        }`}
                      >
                        <CardBody className="flex flex-col items-center justify-center py-6 gap-2">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                              questionCorrectAnswer?.toLowerCase() === option
                                ? "bg-[#49bbbd] text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {option === "true" ? "✓" : "✗"}
                          </div>
                          <span
                            className={`font-bold text-lg capitalize ${
                              questionCorrectAnswer?.toLowerCase() === option
                                ? "text-[#49bbbd]"
                                : "text-gray-700"
                            }`}
                          >
                            {option}
                          </span>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Options Short Answer */}
              {questionType === "short-answer" && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#49bbbd] rounded-full"></span>
                    Correct Answer
                  </label>
                  <Card className="border-2 border-[#49bbbd]/30 bg-[#49bbbd]/5">
                    <CardBody className="p-3">
                      <Textarea
                        placeholder="Enter the correct answer..."
                        value={questionCorrectAnswer}
                        onChange={(e) =>
                          setQuestionCorrectAnswer(e.target.value)
                        }
                        minRows={3}
                        classNames={{
                          input: "text-gray-800 font-medium",
                          inputWrapper: "bg-white shadow-sm border-none",
                        }}
                      />
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* Points  */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#49bbbd] rounded-full"></span>
                  Points
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="Enter points"
                    defaultValue={questionPoints}
                    onChange={(e) => setQuestionPoints(e.target.value)}
                    min="1"
                    classNames={{
                      inputWrapper:
                        "border-2 border-[#49bbbd]/30 hover:border-[#49bbbd] focus-within:border-[#49bbbd]",
                      input: "text-lg font-semibold",
                    }}
                    endContent={
                      <span className="text-sm text-gray-500">pts</span>
                    }
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="pt-4 gap-2">
              <Button
                color="default"
                variant="light"
                onPress={onClose}
                className="font-semibold"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#49bbbd] text-white font-semibold shadow-lg"
                onPress={() => {
                  handleSave();
                  setTimeout(() => onClose(), 1000);
                }}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

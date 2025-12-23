import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Divider,
  Chip,
  Card,
  CardBody,
} from "@heroui/react";

export default function ShowModal({ isOpen, onOpenChange, question }) {
  console.log(question);

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case "multiple-choice":
        return "Multiple Choice";
      case "true-false":
        return "True/False";
      case "short-answer":
        return "Short Answer";
      default:
        return type;
    }
  };

  const getQuestionTypeColor = (type) => {
    switch (type) {
      case "multiple-choice":
        return "primary";
      case "true-false":
        return "secondary";
      case "short-answer":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
     
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-3 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#49bbbd]">
                  Question Details
                </h3>
                <Chip
                  color={getQuestionTypeColor(question.type)}
                  variant="flat"
                  size="sm"
                >
                  {getQuestionTypeLabel(question.type)}
                </Chip>
              </div>
              <Divider className="bg-[#49bbbd]/30" />
            </ModalHeader>

            <ModalBody className="gap-6 py-6">
              {/* Question Text */}
              <div className="bg-gradient-to-r from-[#49bbbd]/10 to-[#49bbbd]/5 rounded-lg p-4 border-l-4 border-[#49bbbd]">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  Question
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  {question.text}
                </p>
              </div>

              {/* Answer Section */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#49bbbd] rounded-full"></span>
                  {question.type === "short-answer"
                    ? "Correct Answer"
                    : "Options"}
                </p>

                {question.type === "multiple-choice" && (
                  <div className="space-y-2">
                    {question.options.map((op, i) => {
                      const isCorrect = op === question.correctAnswer;
                      return (
                        <Card
                          key={i}
                          className={`border-2 transition-all ${
                            isCorrect
                              ? "border-[#49bbbd] bg-[#49bbbd]/10 shadow-md"
                              : "border-gray-200"
                          }`}
                        >
                          <CardBody className="flex-row items-center justify-between py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                  isCorrect
                                    ? "bg-[#49bbbd] text-white"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {String.fromCharCode(65 + i)}
                              </div>
                              <span
                                className={`${
                                  isCorrect
                                    ? "text-[#49bbbd] font-semibold"
                                    : "text-gray-700"
                                }`}
                              >
                                {op}
                              </span>
                            </div>
                            {isCorrect && (
                              <div className="flex items-center gap-2">
                                <Chip
                                  size="sm"
                                  className="bg-green-500 text-white font-semibold"
                                >
                                  ✓ Correct
                                </Chip>
                              </div>
                            )}
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                )}

                {question.type === "true-false" && (
                  <div className="grid grid-cols-2 gap-3">
                    {["True", "False"].map((option) => {
                      const isCorrect = option === question.correctAnswer;
                      return (
                        <Card
                          key={option}
                          className={`border-2 transition-all cursor-default ${
                            isCorrect
                              ? "border-[#49bbbd] bg-[#49bbbd]/10 shadow-md"
                              : "border-gray-200"
                          }`}
                        >
                          <CardBody className="flex flex-col items-center justify-center py-6 gap-2">
                            <div
                              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                                isCorrect
                                  ? "bg-[#49bbbd] text-white"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {option === "True" ? "✓" : "✗"}
                            </div>
                            <span
                              className={`font-bold text-lg ${
                                isCorrect ? "text-[#49bbbd]" : "text-gray-700"
                              }`}
                            >
                              {option}
                            </span>
                            {isCorrect && (
                              <Chip
                                size="sm"
                                className="bg-green-500 text-white mt-1"
                              >
                                Correct
                              </Chip>
                            )}
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                )}

                {question.type === "short-answer" && (
                  <Card className="border-2 border-[#49bbbd]/30 bg-[#49bbbd]/5">
                    <CardBody className="p-4">
                      <Textarea
                        isDisabled
                        defaultValue={question.correctAnswer}
                        minRows={3}
                        classNames={{
                          input: "text-gray-800 font-medium",
                          inputWrapper: "bg-white shadow-sm",
                        }}
                      />
                    </CardBody>
                  </Card>
                )}
              </div>

              {/* Points Display */}
              <div className="flex items-center justify-between bg-gradient-to-r from-[#49bbbd]/5 to-[#49bbbd]/10 rounded-lg p-4 border-2 border-[#49bbbd]/20">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-semibold text-lg">
                    Points
                  </span>
                </div>
                <Chip
                  size="lg"
                  classNames={{
                    base: "bg-[#49bbbd] text-white font-bold shadow-lg",
                    content: "text-xl px-2",
                  }}
                >
                  {question.points}
                </Chip>
              </div>
            </ModalBody>

            <ModalFooter className="pt-4">
              <Button
                color="default"
                variant="light"
                onPress={onClose}
                className="font-semibold"
              >
                Close
              </Button>
              <Button
                className="bg-[#49bbbd] text-white font-semibold"
                onPress={onClose}
              >
                Done
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  RadioGroup,
  Radio,
  Input,
  Textarea,
  Progress,
  Chip,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { Clock, CheckCircle, AlertCircle, BookOpen, Calendar } from "lucide-react";
import { getAllExams, getSpecificExam, getStudentExam, getExamScore, submitExamAnswers, startExam, getRemainingTime } from "../features/studentExam/api/studentExamApi";
import { setAnswer, setMockScore, setExamStarted, clearAnswers } from "../features/studentExam/slice/studentExamSlice";
import { toast } from "react-toastify";

export default function Exams() {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const { loading, submitting, starting, exams, exam, score, answers, message, success, examStarted } = useSelector(
    (state) => state.studentExam
  );
  const { user } = useSelector((state) => state.user);
  
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examCompleted, setExamCompleted] = useState(false);
  const [hasStartedExam, setHasStartedExam] = useState(false);

  const filteredExams = exams?.filter(examItem => {
    const now = new Date();
    const startDate = new Date(examItem.startDate);
    const endDate = new Date(examItem.endDate);
    
    return (
      examItem.isPublished && 
      examItem.classLevel === user?.classLevel &&
      startDate <= now &&
      endDate >= now
    );
  }) || [];

  useEffect(() => {
    if (examId) {
      // Use getStudentExam instead of getSpecificExam for student-specific exam data
      dispatch(getSpecificExam(examId));
      // Clear previous answers when loading a new exam
      dispatch(clearAnswers());
    } else {
      dispatch(getAllExams());
    }
  }, [dispatch, examId]);

  useEffect(() => {
    if (exam && hasStartedExam && !examCompleted) {
      // Try to get remaining time from server, fallback to client timer
      dispatch(getRemainingTime(examId)).then((result) => {
        if (result.payload?.timeRemaining) {
          setTimeRemaining(result.payload.timeRemaining);
        } else {
          // Fallback to client-side timer
          const duration = exam.duration * 60;
          setTimeRemaining(duration);
        }
      }).catch(() => {
        // Fallback to client-side timer
        const duration = exam.duration * 60;
        setTimeRemaining(duration);
      });
      
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [exam, hasStartedExam, examCompleted, dispatch, examId]);

  const handleStartExam = () => {
    // Clear any previous answers when starting exam
    dispatch(clearAnswers());
    setHasStartedExam(true);
    toast.success("Exam started!");
  };

  const handleAnswerChange = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleSubmitExam = async () => {
    try {
      // First call the start exam API to ensure exam is started
      await dispatch(startExam(examId)).unwrap();
      // Then submit the exam
      await dispatch(submitExamAnswers({ examId, answers })).unwrap();
      setExamCompleted(true);
      toast.success("Exam submitted successfully!");
    } catch (error) {
      // If start exam fails, try direct submission
      try {
        await dispatch(submitExamAnswers({ examId, answers })).unwrap();
        setExamCompleted(true);
        toast.success("Exam submitted successfully!");
      } catch (submitError) {
        toast.error("Failed to submit exam");
        console.error('Submit error:', submitError);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  // If no examId, show exam list
  if (!examId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Available Exams
            </h1>
            <p className="text-gray-600">
              Choose an exam to start your assessment
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Spinner size="lg" className="text-teal-500" />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams?.map((examItem) => (
              <Card key={examItem._id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 p-6">
                  <div className="w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                          {examItem.title}
                        </h3>
                        <Chip size="sm" color="primary" variant="flat">
                          {examItem.classLevel}
                        </Chip>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {examItem.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Duration:</span>
                      <Chip size="sm" variant="flat">{examItem.duration} min</Chip>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status:</span>
                      <Chip 
                        size="sm" 
                        color={examItem.isPublished ? "success" : "warning"}
                        variant="flat"
                      >
                        {examItem.isPublished ? "Published" : "Draft"}
                      </Chip>
                    </div>
                    {examItem.startDate && examItem.endDate && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Start Date:</span>
                          <span className="text-sm font-medium">
                            {new Date(examItem.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">End Date:</span>
                          <span className="text-sm font-medium">
                            {new Date(examItem.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <Button
                    className="w-full bg-teal-500 text-white"
                    onPress={() => navigate(`/exams/${examItem._id}`)}
                  >
                    Start Exam
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        
        {!loading && (!exams || exams.length === 0) && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Exams Available</h3>
            <p className="text-gray-500">There are no exams available for your class level at the moment.</p>
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <Card className="p-8">
          <CardBody className="flex flex-col items-center gap-4">
            <Spinner size="lg" className="text-teal-500" />
            <p className="text-gray-600">Loading exam...</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <Card className="p-8">
          <CardBody className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Exam Not Found</h2>
            <p className="text-gray-600 mb-4">The exam you're looking for doesn't exist.</p>
            <Button 
              className="bg-teal-500 text-white"
              onPress={() => navigate('/exams')}
            >
              Back to Exams
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (examCompleted || score) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
              <div className="text-center w-full">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                <h1 className="text-2xl font-bold">Exam Completed!</h1>
                <p className="text-teal-100">{exam.title}</p>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              {score && (
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    {score.score}/{score.totalScore}
                  </div>
                  <p className="text-gray-600 mb-4">
                    You scored {Math.round((score.score / score.totalScore) * 100)}%
                  </p>
                  <Chip 
                    color={score.score >= score.totalScore * 0.7 ? "success" : "warning"}
                    variant="flat"
                    size="lg"
                  >
                    {score.score >= score.totalScore * 0.7 ? "Passed" : "Needs Improvement"}
                  </Chip>
                </div>
              )}
              <div className="mt-6 text-center">
                <Button 
                  className="bg-teal-500 text-white"
                  onPress={() => navigate('/exams')}
                >
                  Back to Exams
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  if (!hasStartedExam && exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
              <div className="text-center w-full">
                <h1 className="text-2xl font-bold mb-2">{exam.title}</h1>
                <p className="text-teal-100">{exam.description}</p>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Duration:</span>
                  <Chip color="primary" variant="flat">{exam.duration} minutes</Chip>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Questions:</span>
                  <Chip color="primary" variant="flat">{exam.questions?.length || 0} questions</Chip>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Class Level:</span>
                  <Chip color="secondary" variant="flat">{exam.classLevel}</Chip>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button 
                  className="bg-teal-500 text-white px-8 py-3 text-lg"
                  size="lg"
                  onPress={handleStartExam}
                >
                  Start Exam
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = exam.questions?.[currentQuestion];
  const progress = ((currentQuestion + 1) / exam.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card className="shadow-lg">
          <CardBody className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-gray-800">{exam.title}</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {exam.questions.length}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-teal-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
                </div>
                <Chip color="primary" variant="flat">
                  {getAnsweredCount()}/{exam.questions.length} answered
                </Chip>
              </div>
            </div>
            <Progress 
              value={progress} 
              className="mt-4"
              aria-label="Exam progress"
              classNames={{
                indicator: "bg-teal-500"
              }}
            />
          </CardBody>
        </Card>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              {currentQ?.text}
            </h2>
          </CardHeader>
          <CardBody className="p-6">
            {currentQ?.type === "multiple-choice" && (
              <RadioGroup
                value={answers[currentQ._id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQ._id, value)}
                className="space-y-3"
                aria-label="Multiple choice options"
              >
                {currentQ.options?.map((option, index) => (
                  <Radio key={index} value={option} className="text-gray-700">
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            )}

            {currentQ?.type === "true-false" && (
              <RadioGroup
                value={answers[currentQ._id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQ._id, value)}
                orientation="horizontal"
                className="flex gap-8"
                aria-label="True or false options"
              >
                <Radio value="True">True</Radio>
                <Radio value="False">False</Radio>
              </RadioGroup>
            )}

            {currentQ?.type === "short-answer" && (
              <Textarea
                placeholder="Enter your answer here..."
                value={answers[currentQ._id] || ""}
                onChange={(e) => handleAnswerChange(currentQ._id, e.target.value)}
                minRows={4}
                aria-label="Short answer input"
              />
            )}
          </CardBody>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="bordered"
            onPress={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            isDisabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <div className="flex gap-3">
            {currentQuestion === exam.questions.length - 1 ? (
              <Button
                className="bg-teal-500 text-white"
                onPress={onOpen}
                isLoading={submitting}
              >
                Submit Exam
              </Button>
            ) : (
              <Button
                className="bg-teal-500 text-white"
                onPress={() => setCurrentQuestion(Math.min(exam.questions.length - 1, currentQuestion + 1))}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Submit Exam</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to submit your exam?</p>
                <p className="text-sm text-gray-600">
                  You have answered {getAnsweredCount()} out of {exam.questions.length} questions.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-teal-500 text-white"
                  onPress={() => {
                    handleSubmitExam();
                    onClose();
                  }}
                  isLoading={submitting}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

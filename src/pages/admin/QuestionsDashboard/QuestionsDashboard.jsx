import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
} from "@heroui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchExams } from "../../../features/auth/slice/examSlice";

export default function QuestionsDashboard()
{
  const dateConversion = (date) => {
    return new Date(date);
  };

  //  get all exams
   const dispatch = useDispatch();
  const navgition = useNavigate()
  
   const token = useSelector((state) => state.auth.token);
   const { exams } = useSelector((state) => state.exams);

   useEffect(() => {
     dispatch(fetchExams(token));
   }, [dispatch, token]);
  
  const handleNavgitionClick = (id) => {
    navgition(`/admin-questions/add/${id}`);
  };


  return (
    <div className="p-10">
      <h1 className="text-[12px] my-5">Questions Dashboard </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
        {exams.map((ex) => {
          return (
            <Card
              className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200"
              key={ex._id}
            >
              <CardHeader className="flex justify-between items-start p-6 bg-[#49bbbd]/10">
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-xl font-bold text-gray-800">
                    {ex.title}
                  </h3>
                  <Chip
                    size="sm"
                    variant="flat"
                    className="w-fit bg-[#49bbbd]/80 text-[#fff] "
                  >
                    {ex.classLevel}
                  </Chip>
                </div>
                <Button
                  size="sm"
                  className="font-medium bg-[#49bbbd] text-[#fff]"
                  onPress={() => handleNavgitionClick(ex._id)}
                >
                  Questions
                </Button>
              </CardHeader>

              <CardBody className="p-6">
                <p className="text-gray-600 leading-relaxed">
                  {ex.description}
                </p>
              </CardBody>

              <CardFooter className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">
                    {dateConversion(ex.startDate).toLocaleDateString("en-GB")}
                  </span>
                  <span>—</span>
                  <span className="font-medium">
                    {dateConversion(ex.endDate).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

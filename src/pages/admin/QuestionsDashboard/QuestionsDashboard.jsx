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

export default function QuestionsDashboard() {
  const handleAddClick = (id) => {
    window.location.href = `/admin-questions/add/${id}`;
  };
  return (
    <div className="p-10">
      <h1 className="text-[12px] my-5">Questions Dashboard </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              + Add Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              + Add Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              + Add Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              + Add Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              + Add Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              + Add Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              + Add Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              + Add Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="max-w-[400px] w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <CardHeader className="flex justify-between items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">Title</h3>
              <Chip size="sm" variant="flat" color="primary" className="w-fit">
                Class Level
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-medium"
              onPress={() => handleAddClick("123")}
            >
              + Add Questions
            </Button>
          </CardHeader>

          <CardBody className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              illo ad nobis ex,
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
              <span className="font-medium">Start date</span>
              <span>—</span>
              <span className="font-medium">End date</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

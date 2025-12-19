// import { useState } from "react";

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
import AddModal from "./Modals/AddModle";
import ShowModal from "./Modals/ShowModle";
import EditModal from "./Modals/EditModle";

export default function AddQuestions() {
  //  Modle State
  const deleteModle = useDisclosure();
  const addModle = useDisclosure();
  const editModle = useDisclosure();
  const showModle = useDisclosure();

  return (
    <div className="p-10">
      <div className="flex gap-2 justify-between my-5">
        <div className="info Exam">
          <p className="text-[24px] font-bold">Title Exam</p>
          <p className="text-[14px] text-[#ccc]">Class Level</p>
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
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Questions to display Frist Add"}>
          <TableRow>
            <TableCell>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,{" "}
            </TableCell>
            <TableCell>True & Fales</TableCell>
            <TableCell>
              <p className="bg-yellow-100 text-yellow-700  px-2 py-1 rounded text-xs text-center">
                {" "}
                Draft
              </p>
            </TableCell>
            <TableCell>
              <div className="flex">
                <Tooltip content="Show details" showArrow={true}>
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => showModle.onOpen(true)}
                  >
                    <i class="fa-regular fa-eye text-[#49bbbd]"></i>
                  </Button>
                </Tooltip>
                <Tooltip content="Edite" showArrow={true}>
                  <Button
                    isIconOnly
                    variant="light"
                    color="warning"
                    onPress={() => editModle.onOpen(true)}
                  >
                    <i class="fa-regular fa-pen-to-square "></i>
                  </Button>
                </Tooltip>
                <Tooltip content="Delete" showArrow={true}>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onPress={() => deleteModle.onOpen(true)}
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </Button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,{" "}
            </TableCell>
            <TableCell>Multiple Choice</TableCell>
            <TableCell>
              <p className="bg-green-100 text-green-700  px-2 py-1 rounded text-xs text-center">
                {" "}
                Published
              </p>
            </TableCell>
            <TableCell>
              <div className="flex">
                <Tooltip content="Show details" showArrow={true}>
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => showModle.onOpen(true)}
                  >
                    <i class="fa-regular fa-eye text-[#49bbbd]"></i>
                  </Button>
                </Tooltip>
                <Tooltip content="Edite" showArrow={true}>
                  <Button
                    isIconOnly
                    variant="light"
                    color="warning"
                    onPress={() => editModle.onOpen(true)}
                  >
                    <i class="fa-regular fa-pen-to-square "></i>
                  </Button>
                </Tooltip>
                <Tooltip content="Delete" showArrow={true}>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onPress={() => deleteModle.onOpen(true)}
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </Button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* 
        
        Modles
        */}

      <DeleteModal
        isOpen={deleteModle.isOpen}
        onOpenChange={deleteModle.onOpenChange}
      />
      <AddModal isOpen={addModle.isOpen} onOpenChange={addModle.onOpenChange} />
      <ShowModal
        isOpen={showModle.isOpen}
        onOpenChange={showModle.onOpenChange}
      />
      <EditModal
        isOpen={editModle.isOpen}
        onOpenChange={editModle.onOpenChange}
      />
    </div>
  );
}

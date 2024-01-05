"use client";

import { ListWithCards } from "@/type";
import { ListForm } from "./list-form";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol className="flex gap-x-3 h-full">
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

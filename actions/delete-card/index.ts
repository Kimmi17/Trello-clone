"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return {
        error: "Unauthorized",
      };
    }

    const { id, boardId } = data;
    let card;

    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    revalidatePath(`/board/${boardId}`);

    return { data: card };
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }
};

export const deleteCard = createSafeAction(DeleteCard, handler);

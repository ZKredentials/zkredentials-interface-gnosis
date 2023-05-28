import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

// To add a new payment card for a user to pay with USD
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { address } = req.query;
    const { circleCardId, active } = req.body;

    try {
      const user = await prismaClient.user.findFirst({
        where: { address: (address as string).toLowerCase() },
      });

      if (!user) {
        return res
          .status(404)
          .json({ data: null, error: `User ${address} is not found.` });
      }
      const record = await prismaClient.userCardInfo.create({
        data: {
          circleCardId,
          active,
        },
      });

      const currentUserCardIds = user.cardId;

      if (active && currentUserCardIds.length > 0) {
        /**
         * New incoming card is set to active
         * The existing card is set to inactive
         */
        const currentActiveCard = await prismaClient.userCardInfo.findFirst({
          where: {
            AND: [{ cardId: { in: currentUserCardIds } }, { active: true }],
          },
        });

        if (!currentActiveCard) {
          return res.status(404).json({
            data: null,
            error: `User ${address} does not have current active card.`,
          });
        }

        await prismaClient.userCardInfo.update({
          where: { cardId: currentActiveCard.cardId },
          data: {
            active: false,
          },
        });
      }

      await prismaClient.user.update({
        where: { address: (address as string).toLowerCase() },
        data: {
          cardId: [...currentUserCardIds, record.cardId],
        },
      });

      return res.status(200).json({ data: record, error: "" });
    } catch (error) {
      console.log("error123", error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    // Get all active cards
    const { address } = req.query;
    try {
      const user = await prismaClient.user.findFirst({
        where: { address: (address as string).toLowerCase() },
      });

      if (!user) {
        return res
          .status(404)
          .json({ data: null, error: `User ${address} is not found.` });
      }

      const listOfCards = user.cardId;

      if (listOfCards.length === 0) {
        return res.status(200).json({ data: [], error: "" });
      }

      const awaitListOfCardInfo = listOfCards.map(async (cardId) => {
        return await prismaClient.userCardInfo.findFirst({
          where: { cardId },
        });
      });

      const awaitedListOfCardsInfo = await Promise.all(awaitListOfCardInfo);

      return res.status(200).json({ data: awaitedListOfCardsInfo, error: "" });
    } catch (error) {
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({
      data: null,
      error: `HTTP method ${req.method} is not supported.`,
    });
  }
}

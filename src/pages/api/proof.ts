import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  createDepositAddressByWalletId,
  createUserWallet,
} from "@/services/circle";

const prismaClient = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { address } = req.query;

    if (!address) {
      return res
        .status(400)
        .json({ data: null, error: "Missing address params" });
    }

    try {
      const listOfActiveProofs = await prismaClient.userProof.findMany({
        where: {
          AND: [
            { address: (address as string).toLowerCase() },
            { active: true },
          ],
        },
      });

      res.status(200).json({ data: listOfActiveProofs, error: "" });
    } catch (error) {
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const { address } = req.query;
    const { cid, type } = req.body;

    if (!address) {
      return res
        .status(400)
        .json({ data: null, error: "Missing address params" });
    }

    try {
      // Update current active proof to inactive
      const currentActiveProof = await prismaClient.userProof.findFirst({
        where: {
          AND: [
            { address: (address as string).toLowerCase() },
            { active: true },
          ],
        },
      });

      if (currentActiveProof) {
        await prismaClient.userProof.update({
          where: { id: currentActiveProof.id },
          data: {
            active: false,
          },
        });
      }

      // Create new active proof
      const proof = await prismaClient.userProof.create({
        data: {
          address: (address as string).toLowerCase(),
          cid,
          type,
          active: true,
        },
      });

      return res.status(200).json({ data: proof, error: "" });
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

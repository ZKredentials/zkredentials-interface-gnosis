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
  if (req.method === "POST") {
    const { address } = req.query;

    if (!address) {
      return res
        .status(400)
        .json({ data: null, error: "Missing address params" });
    }

    try {
      const userWalletId = await createUserWallet(address as string);

      if (!userWalletId.data || userWalletId.error) {
        return res
          .status(400)
          .json({ data: null, error: `Unable to create user wallet` });
      }

      const userDepositAddress = await createDepositAddressByWalletId(
        userWalletId.data
      );

      if (!userDepositAddress.data || userDepositAddress.error) {
        return res
          .status(400)
          .json({ data: null, error: `Unable to create deposit address` });
      }

      await prismaClient.user.create({
        data: {
          address: (address as string).toLowerCase(),
          cardId: [],
          circleWalletId: userWalletId.data,
        },
      });

      return res.status(200).json({ data: "Created", error: "" });
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    const { address } = req.query;

    if (!address) {
      return res
        .status(400)
        .json({ data: null, error: "Missing address params" });
    }

    try {
      const user = await prismaClient.user.findFirst({
        where: { address: (address as string).toLowerCase() },
      });

      if (user) {
        return res.status(200).json({ data: user, error: null });
      } else {
        return res
          .status(404)
          .json({ data: null, error: `User ${address} is not found.` });
      }
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

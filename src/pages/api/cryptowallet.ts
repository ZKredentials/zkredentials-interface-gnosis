import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  createDepositAddressByWalletId,
  createUserWallet,
  getAddressByWalletId,
} from "@/services/circle";

const prismaClient = new PrismaClient();

// To add a deposit wallet account for user to transfer in USDC
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { address } = req.body;
    try {
      const user = await prismaClient.user.findFirst({
        where: { address: address.toLowerCase() },
      });

      if (!user) {
        return res
          .status(404)
          .json({ data: null, error: `User ${address} is not found.` });
      }

      const userWalletId = await createUserWallet(address);

      if (!userWalletId.data || userWalletId.error) {
        return res
          .status(400)
          .json({ data: null, error: `Unable to create user wallet` });
      }

      await prismaClient.user.update({
        where: { address: address.toLowerCase() },
        data: {
          circleWalletId: userWalletId.data,
        },
      });

      const userDepositAddress = await createDepositAddressByWalletId(
        userWalletId.data
      );

      if (!userDepositAddress.data || userDepositAddress.error) {
        return res
          .status(400)
          .json({ data: null, error: `Unable to create deposit address` });
      }

      return res.status(201);
    } catch (error) {
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
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

      const walletId = user.circleWalletId;

      if (!walletId) {
        return res.status(404).json({
          data: null,
          error: `User ${address} has not register a Circle Deposit Wallet.`,
        });
      }

      const walletAddress = await getAddressByWalletId(walletId);

      return res.status(200).json({ data: walletAddress.data, error: "" });
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

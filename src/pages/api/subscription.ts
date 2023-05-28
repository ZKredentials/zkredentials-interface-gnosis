import { NextApiRequest, NextApiResponse } from "next";
import { CurrencyType, PrismaClient, SubscriptionTier } from "@prisma/client";
import moment from "moment";
import {
  getPaymentPaidByPaymentId,
  getPaymentPaidByPaymentIntent,
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
      const user = await prismaClient.user.findFirst({
        where: { address: (address as string).toLowerCase() },
      });

      if (user) {
        if (user.subscriptionId) {
          const subscription = await prismaClient.userSubscription.findFirst({
            where: {
              AND: [{ subscriptionId: user.subscriptionId }, { active: true }],
            },
          });

          if (!subscription) {
            return res.status(404).json({
              data: null,
              error: "User is not on any active subscription plans",
            });
          }

          return res.status(200).json({
            data: subscription,
            error: "",
          });
        }
        return res.status(404).json({
          data: null,
          error: "User is not on any active subscription plans",
        });
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
  } else if (req.method === "POST") {
    // For initial subscription
    const { address } = req.query;
    const { paymentIntentId, tier, currency } = req.body;

    try {
      const user = await prismaClient.user.findFirst({
        where: { address: (address as string).toLowerCase() },
      });

      if (user) {
        const currentDate = new Date();
        const subscription = await prismaClient.userSubscription.create({
          data: {
            paymentIntentId,
            active: false,
            tier,
            currency,
            startDate: currentDate,
            endDate: moment(currentDate).add(1, "months").toDate(),
          },
        });

        if (subscription) {
          await prismaClient.user.update({
            where: { address: (address as string).toLowerCase() },
            data: {
              incomingSubscriptionId: subscription.subscriptionId,
            },
          });
          return res.status(200).json({ data: subscription, error: "" });
        }
        return res
          .status(400)
          .json({ data: null, error: `Unable to create subscription` });
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
  } else if (req.method === "PUT") {
    // Set active is true when payment is confirmed
    const { address } = req.query;

    try {
      const user = await prismaClient.user.findFirst({
        where: { address: (address as string).toLowerCase() },
      });

      if (user) {
        if (user.incomingSubscriptionId) {
          const subscription = await prismaClient.userSubscription.findFirst({
            where: { subscriptionId: user.incomingSubscriptionId },
          });

          if (subscription) {
            // Check whether is subscription active
            if (subscription.active) {
              return res.status(200).json({ data: subscription, error: "" });
            }

            const paymentIntentId = subscription.paymentIntentId;
            let paymentResponseFromCircle;

            if (subscription.currency === CurrencyType.USD) {
              paymentResponseFromCircle = await getPaymentPaidByPaymentId(
                paymentIntentId
              );
            } else if (subscription.currency === CurrencyType.USDC) {
              paymentResponseFromCircle = await getPaymentPaidByPaymentIntent(
                paymentIntentId
              );
            }

            if (paymentResponseFromCircle && paymentResponseFromCircle.data) {
              // Means there's a subscription
              const updatedSubscription =
                await prismaClient.userSubscription.update({
                  where: { subscriptionId: user.incomingSubscriptionId },
                  data: {
                    tier: paymentResponseFromCircle.data as SubscriptionTier,
                    active: true,
                  },
                });

              if (user.subscriptionId) {
                // Update old subscription to be inactive
                await prismaClient.userSubscription.update({
                  where: { subscriptionId: user.subscriptionId },
                  data: {
                    active: false,
                  },
                });
              }
              // Update user activeSubscriptionId with incomingSubscriptionId
              await prismaClient.user.update({
                where: { address: (address as string).toLowerCase() },
                data: {
                  subscriptionId: subscription.subscriptionId,
                },
              });
              return res
                .status(200)
                .json({ data: updatedSubscription, error: "" });
            }

            return res
              .status(404)
              .json({ data: null, error: "No confirmed payment" });
          }

          return res
            .status(404)
            .json({ data: null, error: `Subscription not found` });
        }

        return res
          .status(404)
          .json({ data: null, error: `User has not subscribe` });
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
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).json({
      data: null,
      error: `HTTP method ${req.method} is not supported.`,
    });
  }
}

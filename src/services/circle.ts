import config from "@/utils/config";
import { CIRCLE_MATIC, CIRCLE_USD } from "@/utils/constants";
import { encryptCardData, sleep } from "@/utils/helper";
import { SubscriptionPlans } from "@/utils/subscriptionPlans";
import { SubscriptionTier } from "@/utils/type";
import axios from "axios";

const BASE_URL = "https://api-sandbox.circle.com/v1";
const CIRCLE_API_TOKEN = config.CIRCLE_API_KEY;

const headers = {
  // "X-Requested-Id": "",
  "Content-Type": "application/json",
  Authorization: `Bearer ${CIRCLE_API_TOKEN}`,
};

const generateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

interface ICardInfo {
  expMonth: number;
  expYear: number;
  customerName: string;
  country: string;
  district: string;
  city: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  cvv: string;
  cardNumber: string;
}

export const saveUserCardInformation = async (cardInfo: ICardInfo) => {
  const encryptedCardInfo = await encryptCardData({
    number: cardInfo.cardNumber.replace(/\s/g, ""),
    cvv: cardInfo.cvv,
  });
  if (!encryptedCardInfo)
    return {
      data: "",
      error: "Error encrypting data",
    };

  const { encryptedMessage, keyId } = encryptedCardInfo;

  try {
    const { data } = await axios.post(
      `${BASE_URL}/cards`,
      {
        idempotencyKey: generateUUID(),
        expMonth: cardInfo.expMonth || 1,
        expYear: cardInfo.expYear || 2025,
        keyId,
        encryptedData: encryptedMessage,
        billingDetails: {
          name: cardInfo.customerName || "Customer 0001",
          country: cardInfo.country || "US",
          district: cardInfo.district || "MA",
          line1: "Test",
          line2: "",
          city: cardInfo.city || "Test City",
          postalCode: cardInfo.postalCode || "11111",
        },
        metadata: {
          email: cardInfo.email || "customer-0001@circle.com",
          phoneNumber: cardInfo.phoneNumber || "+12025550180",
          sessionId: "xxx",
          ipAddress: "172.33.222.1",
        },
      },
      {
        headers,
      }
    );

    return { data: data.data.id, error: "" };
  } catch (error) {
    return {
      data: "",
      error,
    };
  }
};

export const getCardDetails = async (cardId: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cards/${cardId}`, {
      headers,
    });

    return {
      data: {
        last4: data.data.last4,
        expMonth: data.data.expMonth,
        expYear: data.data.expYear,
        network: data.data.network,
      },
      error: "",
    };
  } catch (error) {
    return {
      data: {
        last4: "",
        expMonth: 0,
        expYear: 0,
        network: "",
      },
      error,
    };
  }
};

export const createUserWallet = async (address: string) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/wallets`,
      {
        idempotencyKey: generateUUID(),
        description: `Create wallet for ${address}`,
      },
      {
        headers,
      }
    );

    return { data: data.data.walletId, error: "" };
  } catch (error) {
    console.log("[createUserWallet]", error);
    return {
      data: {
        last4: "",
        expMonth: 0,
        expYear: 0,
        network: "",
      },
      error,
    };
  }
};

export const createDepositAddressByWalletId = async (walletId: string) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/wallets/${walletId}/addresses`,
      {
        idempotencyKey: generateUUID(),
        currency: CIRCLE_USD,
        chain: CIRCLE_MATIC,
      },
      {
        headers,
      }
    );

    return { data: data.data.address || "", error: "" };
  } catch (error) {
    return {
      data: {
        last4: "",
        expMonth: 0,
        expYear: 0,
        network: "",
      },
      error,
    };
  }
};

interface IDepositAddress {
  address: string;
  currency: string;
  chain: string;
}

export const getAddressByWalletId = async (walletId: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/wallets/${walletId}/addresses`,
      {
        headers,
      }
    );

    if (data.data.length === 0) {
      return {
        data: "",
        error: `No Deposit Account found for this Wallet Id ${walletId}`,
      };
    }

    const filteredDeposit: IDepositAddress[] = data.data.filter(
      (row: IDepositAddress) =>
        row.chain === CIRCLE_MATIC && row.currency === CIRCLE_USD
    );

    if (filteredDeposit.length === 0) {
      return {
        data: "",
        error: `No Deposit Account found for this Wallet Id ${walletId}`,
      };
    }

    return {
      data: {
        address: filteredDeposit[0].address,
      },
      error: "",
    };
  } catch (error) {
    return {
      data: {
        address: "",
      },
      error,
    };
  }
};

export const payWithCard = async (amount: number, cardId: string) => {
  try {
    const encryptedCardInfo = await encryptCardData({
      cvv: "123",
    });
    if (!encryptedCardInfo)
      return {
        data: "",
        error: "Error encrypting data",
      };

    const { encryptedMessage, keyId } = encryptedCardInfo;

    const { data } = await axios.post(
      `${BASE_URL}/payments`,
      {
        idempotencyKey: generateUUID(),
        amount: {
          amount: amount.toString(),
          currency: "USD",
        },
        verification: "cvv",
        source: {
          id: cardId,
          type: "card",
        },
        description: `Payment for subscription`,
        keyId,
        encryptedData: encryptedMessage,
        channel: "",
        metadata: {
          email: "test@gmail.com",
          // phoneNumber: "",
          sessionId: "xxx",
          ipAddress: "172.33.222.1",
        },
      },
      {
        headers,
      }
    );
    console.log("payWithCard", data);
    return { data: data.data.id, error: "" };
  } catch (error) {
    return {
      data: "",
      error,
    };
  }
};

export const createPaymentIntent = async (amount: number) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/paymentIntents`,
      {
        idempotencyKey: generateUUID(),
        amount: {
          amount: amount.toString(),
          currency: "USD",
        },
        settlementCurrency: "USD",
        paymentMethods: [
          {
            type: "blockchain",
            chain: "MATIC",
          },
        ],
        expiresOn: "",
      },
      {
        headers,
      }
    );
    return { data: data.data.id, error: "" };
  } catch (error) {
    return {
      data: "",
      error,
    };
  }
};

export const getDepositAddressFromPaymentIntent = async (
  paymentIntentId: string
) => {
  let depositAddress = "";
  try {
    while (!depositAddress) {
      const { data } = await axios.get(
        `${BASE_URL}/paymentIntents/${paymentIntentId}`,
        {
          headers,
        }
      );
      console.log("paymentIntent addr response", data);

      if (data.data.paymentMethods[0].address) {
        depositAddress = data.data.paymentMethods[0].address;
        break;
      }

      await sleep(1000);
    }

    return { data: depositAddress, error: "" };
  } catch (error) {
    return {
      data: "",
      error,
    };
  }
};

export const getPaymentPaidByPaymentIntent = async (
  paymentIntentId: string
) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/paymentIntents/${paymentIntentId}`,
      {
        headers,
      }
    );
    console.log("getPaymentPaidByPaymentIntent", data);
    if (Number(data.data.amountPaid.amount) > 0) {
      if (
        Number(data.data.amountPaid.amount) >=
        SubscriptionPlans[SubscriptionTier.GOLD].price
      ) {
        return { data: SubscriptionTier.GOLD, error: "" };
      } else if (
        Number(data.data.amountPaid.amount) >=
        SubscriptionPlans[SubscriptionTier.SILVER].price
      ) {
        return { data: SubscriptionTier.SILVER, error: "" };
      } else if (
        Number(data.data.amountPaid.amount) >=
        SubscriptionPlans[SubscriptionTier.BRONZE].price
      ) {
        return { data: SubscriptionTier.BRONZE, error: "" };
      } else {
        // Because paid less than 10, so no subscription
        return { data: null, error: "" };
      }
    }
    // Means not paid = no subscription
    return { data: null, error: "" };
  } catch (error) {
    return {
      data: "",
      error,
    };
  }
};

export const getPaymentPaidByPaymentId = async (paymentIntentId: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/payments/${paymentIntentId}`,
      {
        headers,
      }
    );

    if (data.data.status.toLowerCase() === "paid") {
      if (Number(data.data.amount.amount) > 0) {
        if (
          Number(data.data.amount.amount) >=
          SubscriptionPlans[SubscriptionTier.GOLD].price
        ) {
          return { data: SubscriptionTier.GOLD, error: "" };
        } else if (
          Number(data.data.amount.amount) >=
          SubscriptionPlans[SubscriptionTier.SILVER].price
        ) {
          return { data: SubscriptionTier.SILVER, error: "" };
        } else if (
          Number(data.data.amount.amount) >=
          SubscriptionPlans[SubscriptionTier.BRONZE].price
        ) {
          return { data: SubscriptionTier.BRONZE, error: "" };
        } else {
          // Because paid less than 10, so no subscription
          return { data: null, error: "" };
        }
      }
    }

    // Means not paid = no subscription
    return { data: null, error: "" };
  } catch (error) {
    return {
      data: "",
      error,
    };
  }
};

export const getPublicKey = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/encryption/public`, {
      headers,
    });
    console.log("publicKey", data.data);
    return { data: data.data, error: "" };
  } catch (error) {
    return {
      data: "",
      error,
    };
  }
};

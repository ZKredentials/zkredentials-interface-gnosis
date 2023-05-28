import axios from "axios";
import { getCardDetails } from "./circle";
import { IDbUserCardInfo } from "@/utils/type";
import { CurrencyType, SubscriptionTier } from "@prisma/client";
import config from "@/utils/config";
import { LOCAL_STORAGE_GITHUB_ACCESS_TOKEN } from "@/utils/constants";

interface IResponse {
  data: any;
  error: string;
}

const BASE_URL = "http://localhost:3000/api";

export const getUserAccount = async (address: string): Promise<IResponse> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user?address=${address}`);

    if (!data.data || data.error) {
      return {
        data: null,
        error: data.error,
      };
    }

    return {
      data: data.data,
      error: "",
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.toString(),
    };
  }
};

export const registerUserAccount = async (
  address: string
): Promise<IResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/user?address=${address}`);

    if (response.status >= 400) {
      return {
        data: null,
        error: "Error registering user",
      };
    }

    return {
      data: "Created",
      error: "",
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.toString(),
    };
  }
};

export const getUserActiveSubscriptionPlan = async (
  address: string
): Promise<IResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/subscription?address=${address}`
    );

    if (response.status >= 400) {
      return {
        data: null,
        error: response.data.error,
      };
    }

    return {
      data: response.data,
      error: "",
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.toString(),
    };
  }
};

export const getUserRegisteredCards = async (
  address: string
): Promise<IResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/card?address=${address}`);

    if (response.status >= 400) {
      return {
        data: null,
        error: response.data.error,
      };
    }

    const listOfCards: IDbUserCardInfo[] = response.data.data;

    const responseFromCircle = listOfCards.map(
      async (card: IDbUserCardInfo) => {
        const { data } = await getCardDetails(card.circleCardId);
        return {
          ...data,
          cardId: card.cardId,
          circleCardId: card.circleCardId,
          active: card.active,
        };
      }
    );

    return {
      data: await Promise.all(responseFromCircle),
      error: "",
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.toString(),
    };
  }
};

export const storeNewCard = async (
  address: string,
  circleCardId: string,
  active: boolean
): Promise<IResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/card?address=${address}`, {
      circleCardId,
      active,
    });

    if (response.status >= 400) {
      return {
        data: null,
        error: response.data.error,
      };
    }

    return {
      data: response.data,
      error: "",
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.toString(),
    };
  }
};

export const getUserDepositAddress = async (
  address: string
): Promise<IResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/cryptowallet?address=${address}`
    );

    if (response.status >= 400) {
      return {
        data: null,
        error: response.data.error,
      };
    }

    return {
      data: response.data,
      error: "",
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.toString(),
    };
  }
};

export const initializeSubscription = async (
  address: string,
  paymentIntentId: string,
  tier: SubscriptionTier,
  currency: CurrencyType
): Promise<IResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/subscription?address=${address}`,
      {
        paymentIntentId,
        tier,
        currency,
      }
    );

    if (response.status >= 400) {
      return {
        data: null,
        error: response.data.error,
      };
    }

    return {
      data: response.data,
      error: "",
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.toString(),
    };
  }
};

export const pollSubscriptionPaid = async (address: string) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/subscription?address=${address}`
    );

    if (response.status >= 400) {
      return {
        data: null,
        error: response.data.error,
      };
    }

    return {
      data: response.data,
      error: "",
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const getGithubStats = async (): Promise<IResponse> => {
  try {
    const response = await axios.post(`${config.BACKEND_API_URL}/stats`, {
      token: localStorage.getItem(LOCAL_STORAGE_GITHUB_ACCESS_TOKEN),
    });
    if (response.status === 200) {
      return {
        data: {
          sponsors: response.data.sponsors || 0,
          starred: response.data.starred || 0,
          prs: response.data.prs || 0,
        },
        error: "",
      };
    }
    return {
      data: {
        sponsors: 0,
        starred: 0,
        prs: 0,
      },
      error: "Error fetching Github Statistics",
    };
  } catch (error: any) {
    return {
      data: {
        sponsors: 0,
        starred: 0,
        prs: 0,
      },
      error: error.toString(),
    };
  }
};

export const generateGithubProof = async (
  sponsors: number,
  starred: number,
  prs: number,
  showPrs: boolean,
  showStarred: boolean,
  showSponsors: boolean
): Promise<IResponse> => {
  try {
    // construct request body
    const requestBody: { [key: string]: number } = {};

    if (showPrs) {
      requestBody["prs"] = prs;
    }

    if (showStarred) {
      requestBody["starred"] = starred;
    }

    if (showSponsors) {
      requestBody["sponsors"] = sponsors;
    }

    const response = await axios.post(`${config.BACKEND_API_URL}/generate`, {
      token: localStorage.getItem(LOCAL_STORAGE_GITHUB_ACCESS_TOKEN),
      ...requestBody,
    });
    if (response.status === 200) {
      return {
        data: response.data.cid as string,
        error: "",
      };
    }
    return {
      data: "",
      error: "Error constructing proof",
    };
  } catch (error: any) {
    return {
      data: "",
      error: error.toString(),
    };
  }
};

export const getUserActiveProofs = async (address: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/proof?address=${address}`);

    if (!data.data || data.error) {
      return {
        data: null,
        error: data.error,
      };
    }

    return {
      data: data.data,
      error: "",
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.toString(),
    };
  }
};

export const addUserActiveProof = async (
  address: string,
  cid: string,
  type: string
) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/proof?address=${address}`, {
      cid,
      type,
    });

    if (!data.data || data.error) {
      return {
        data: null,
        error: data.error,
      };
    }

    return {
      data: data.data,
      error: "",
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.toString(),
    };
  }
};

import { ethers } from "ethers";
import {
  LOCAL_STORAGE_GITHUB_ACCESS_TOKEN,
  LOCAL_STORAGE_GITHUB_CODE,
} from "./constants";
import { getPublicKey } from "@/services/circle";
import { encrypt } from "./openpgp";
import axios from "axios";

export const getGithubCreds = (): {
  code: string | null;
  access_token: string | null;
} => {
  if (typeof window !== "undefined") {
    const code = localStorage.getItem(LOCAL_STORAGE_GITHUB_CODE);
    const access_token = localStorage.getItem(
      LOCAL_STORAGE_GITHUB_ACCESS_TOKEN
    );

    return {
      code,
      access_token,
    };
  }

  return {
    code: "",
    access_token: "",
  };
};

export const getDisplayAddress = (
  address: string | null | undefined,
  size: number,
  isMobile: boolean
): string => {
  if (!address || address === `-`) {
    return `-`;
  }
  if (isMobile) {
    return `${address.toString().slice(0, 3)}...`;
  }
  if (ethers.utils.isAddress(address)) {
    return `${address.toString().slice(0, size)}...${address
      .toString()
      .slice(-size)}`;
  }
  return address;
};

export const getCid = (cidOrPrefixedUrl: string): string => {
  return cidOrPrefixedUrl.replace("ipfs://", "");
};

export const addIpfsPrefix = (cid: string): string => {
  return `ipfs://${cid}`;
};

export const getIpfsUrl = (cid: string): string => {
  return `https://ipfs.io/ipfs/${getCid(cid)}`;
};

export const isIpfsCid = (possibleCid: string): boolean => {
  const isV0Cid = possibleCid.startsWith("Qm");
  const isV1Cid = possibleCid.startsWith("b");

  return isV0Cid || isV1Cid;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const encryptCardData = async (cardDetails: any) => {
  const publicKey = await getPublicKey();
  return await encrypt(cardDetails, publicKey.data);
};

export const getIpfsData = async (
  cid: string,
  fileName: string
): Promise<any> => {
  try {
    if (!isIpfsCid(cid)) {
      return {
        data: "",
        success: false,
      };
    }

    const url = getIpfsUrl(cid);
    const response = await axios.get(`${url}/${fileName}`);

    if (response.status === 200) {
      return {
        data: response.data,
        success: true,
      };
    }

    return {
      data: "",
      success: false,
    };
  } catch (error) {
    return {
      data: "",
      success: false,
    };
  }
};

export const capitalizeText = (text: string) => {
  if (text.length === 0) return text;
  if (text.length === 1) return text.toUpperCase();

  const firstChar = text[0].toUpperCase();
  return firstChar + text.slice(1, text.length).toLowerCase();
};

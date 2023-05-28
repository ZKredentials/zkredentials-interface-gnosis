import config from "@/utils/config";
import { ethers } from "ethers";

/**
 * Gets Deployed Contract from block chain folder
 * @param {*} contractName
 * @param {*} chainId
 * @returns Contract
 */
export const getContract = (contractName: string) => {
  if (!config.CONTRACT_ADDRESS) return;

  try {
    const contract = require(`../contracts/abi/${contractName}.json`);

    return new ethers.Contract(
      config.CONTRACT_ADDRESS,
      contract.abi,
      undefined
    );
  } catch (error) {
    console.error("Contract does not exist!");
  }
};

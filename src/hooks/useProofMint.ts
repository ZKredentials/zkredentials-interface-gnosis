import config from "@/utils/config";
import { useState } from "react";
import { Contract, ethers } from "ethers";
import { ZKredentialsGitHub__factory } from "@/contracts/abi/types";
import ChainToAddressMapping, {
  ContractName,
} from "@/utils/chainToAdressMapping";
import { ChainIdToChainName } from "@/utils/chains";
import { useAccount, useSigner, useNetwork } from "wagmi";

const INSUFFICIENT_FUNDS_ERROR_CODE = "INSUFFICIENT_FUNDS";

const useProofMint = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: _signer } = useSigner();
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const prepareTransactonOption = async (
    contract: Contract,
    account: string,
    cid: string
  ) => {
    let estimatedGas = 200000;

    try {
      const estimatedGasFromContract = await contract.estimateGas.mint(cid, {
        from: account,
      });
      estimatedGas = estimatedGasFromContract.mul(11).div(10).toNumber();
      console.log("estimatedGas for useProofMint", estimatedGas);
    } catch (error: any) {
      console.log("[Error from prepareTransactonOption", error);
      if (error.code !== INSUFFICIENT_FUNDS_ERROR_CODE) {
        return {
          from: account,
        };
      }
    }

    return {
      from: account,
      gasLimit: estimatedGas,
    };
  };

  const prepareTransactonOptionReplaceProof = async (
    contract: Contract,
    account: string,
    cid: string
  ) => {
    let estimatedGas = 200000;

    try {
      const estimatedGasFromContract = await contract.estimateGas.setTokenURI(
        cid,
        {
          from: account,
        }
      );
      estimatedGas = estimatedGasFromContract.mul(11).div(10).toNumber();
      console.log("estimatedGas for useProofMint", estimatedGas);
    } catch (error: any) {
      console.log("[Error from prepareTransactonOption", error);
      if (error.code !== INSUFFICIENT_FUNDS_ERROR_CODE) {
        return {
          from: account,
        };
      }
    }

    return {
      from: account,
      gasLimit: estimatedGas,
    };
  };

  const submitProof = async (cid: string) => {
    if (!address) {
      setTransactionHash("");
      setError("User has yet to connect wallet.");
      return;
    }

    if (!cid) {
      setTransactionHash("");
      setError("No cid");
      return;
    }

    setLoading(true);
    setError("");

    const provider = new ethers.providers.Web3Provider(
      (_signer?.provider as any).provider,
      "any"
    );

    if (!provider) {
      setTransactionHash("");
      setError("Provider does not exist.");
      return;
    }

    const signer = provider.getSigner();

    if (!chain) {
      return;
    }

    const currentContractAddress =
      ChainToAddressMapping[ChainIdToChainName[chain.id]][ContractName.GITHUB];
    const contract = ZKredentialsGitHub__factory.connect(
      currentContractAddress,
      signer
    );
    if (!contract) {
      setTransactionHash("");
      setError("Contract does not exist.");
      return;
    }

    // Prepare transaction options
    const transactionOptions = await prepareTransactonOption(
      contract,
      address,
      cid
    );

    try {
      const tx = await contract.mint(cid, transactionOptions);

      const receipt = await tx.wait();
      const txnHash = await receipt.transactionHash;

      console.log("TransactionHash from useProofMint", txnHash);

      setTransactionHash(txnHash);
      setError("");
    } catch (error: any) {
      console.log("Minting Error", error.message);
      console.log(error);
      if (error.reason === "transaction failed") {
        setTransactionHash("");
        setError("The transaction has failed");
      } else if (error.code === 4001) {
        // User rejected the transaction
        setTransactionHash("");
        setError("Please approve the transaction.");
      } else if (error.error && error.error.code === -32603) {
        // Internal Error Code from Smart Contract
        // Error use Smart Contract error messages
        let filteredMessage =
          "Registering user went wrong. Please refresh and try again.";
        if (error.message.length > 20) {
          filteredMessage = error.error.message.substring(33);
        }
        setTransactionHash("");
        setError(filteredMessage);
      } else {
        setTransactionHash("");
        setError("Registering user went wrong. Please refresh and try again.");
      }
    }

    setLoading(false);
  };

  const replaceProof = async (cid: string) => {
    if (!address) {
      setTransactionHash("");
      setError("User has yet to connect wallet.");
      return;
    }

    if (!cid) {
      setTransactionHash("");
      setError("No cid");
      return;
    }

    setLoading(true);
    setError("");

    const provider = new ethers.providers.Web3Provider(
      (_signer?.provider as any).provider,
      "any"
    );

    if (!provider) {
      setTransactionHash("");
      setError("Provider does not exist.");
      return;
    }

    const signer = provider.getSigner();

    if (!chain) {
      return;
    }
    const currentContractAddress =
      ChainToAddressMapping[ChainIdToChainName[chain.id]][ContractName.GITHUB];
    const contract = ZKredentialsGitHub__factory.connect(
      currentContractAddress,
      signer
    );
    if (!contract) {
      setTransactionHash("");
      setError("Contract does not exist.");
      return;
    }

    // Prepare transaction options
    const transactionOptions = await prepareTransactonOptionReplaceProof(
      contract,
      address,
      cid
    );

    try {
      const tx = await contract.setTokenURI(cid, transactionOptions);

      const receipt = await tx.wait();
      const txnHash = await receipt.transactionHash;

      console.log("TransactionHash from useProofMint", txnHash);

      setTransactionHash(txnHash);
      setError("");
    } catch (error: any) {
      console.log("Minting Error", error.message);
      console.log(error);
      if (error.reason === "transaction failed") {
        setTransactionHash("");
        setError("The transaction has failed");
      } else if (error.code === 4001) {
        // User rejected the transaction
        setTransactionHash("");
        setError("Please approve the transaction.");
      } else if (error.error && error.error.code === -32603) {
        // Internal Error Code from Smart Contract
        // Error use Smart Contract error messages
        let filteredMessage =
          "Registering user went wrong. Please refresh and try again.";
        if (error.message.length > 20) {
          filteredMessage = error.error.message.substring(33);
        }
        setTransactionHash("");
        setError(filteredMessage);
      } else {
        setTransactionHash("");
        setError("Registering user went wrong. Please refresh and try again.");
      }
    }

    setLoading(false);
  };
  const clearData = () => {
    setTransactionHash("");
    setError("");
    setLoading(false);
  };

  return {
    transactionHash,
    error,
    loading,
    submitProof,
    clearData,
    replaceProof,
  };
};

export default useProofMint;

import { useEffect, useState } from "react";
import { getProofByUser } from "@/subgraph/getProofByUser";
import { getCid } from "@/utils/helper";
import { UPDATE_USER_PROOF } from "@/context/actionType";
import { useUserProof } from "@/context/UserProofContext";
import { useAccount } from "wagmi";

const useUserProofHook = () => {
  const { address } = useAccount();
  const { dispatch } = useUserProof();

  const [data, setData] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { cid } = await getProofByUser(address as string);

      if (cid) {
        setData(getCid(cid));
        dispatch({ type: UPDATE_USER_PROOF, proofs: [getCid(cid)] });
      }
    } catch (error) {
      console.log("Error from useUserProof", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (address) {
      fetchData();
    }
  }, [address]);

  return { data, error, loading, fetchData };
};

export default useUserProofHook;

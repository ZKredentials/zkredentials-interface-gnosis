import { useEffect, useState } from "react";
import { getProofByUser } from "@/subgraph/getProofByUser";
import { getCid } from "@/utils/helper";
import { UPDATE_USER_PROOF } from "@/context/actionType";
import { useUserProof } from "@/context/UserProofContext";
import { useAccount } from "wagmi";
import { getUserActiveProofs } from "@/services/internal";

const useUserProofFromBackend = () => {
  const { address } = useAccount();
  const { dispatch } = useUserProof();

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getUserActiveProofs(address as string);

      if (data.length > 0) {
        const processCidUrl = data.map((_data: any) => {
          return {
            ..._data,
            cid: getCid(_data.cid),
          };
        });
        setData([...processCidUrl]);
        dispatch({ type: UPDATE_USER_PROOF, proofs: [...processCidUrl] });
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

export default useUserProofFromBackend;

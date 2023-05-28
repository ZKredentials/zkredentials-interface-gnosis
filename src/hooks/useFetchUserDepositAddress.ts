import { getUserDepositAddress } from "@/services/internal";
import { useEffect, useState } from "react";

const useFetchUserDepositAddress = (address: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchAddress = async () => {
    setLoading(true);
    setError("");

    const response = await getUserDepositAddress(address);

    if (!response.data || response.error) {
      setError(response.error);
      setData(null);
      setLoading(false);
      return;
    }
    setData(response.data.data.address);
    setLoading(false);
  };

  useEffect(() => {
    fetchAddress();
  }, [address]);

  return { data, loading, error };
};

export default useFetchUserDepositAddress;

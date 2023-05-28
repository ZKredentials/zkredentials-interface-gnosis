import { getUserActiveSubscriptionPlan } from "@/services/internal";
import { useEffect, useState } from "react";

const useFetchCurrentActiveSubscriptionPlan = (address: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchPlan = async () => {
    setLoading(true);
    setError("");

    const response = await getUserActiveSubscriptionPlan(address);

    if (!response.data || response.error) {
      setError(response.error);
      setData(null);
      setLoading(false);
      return;
    }

    setData(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlan();
  }, [address]);

  return { data, loading, error, fetchPlan };
};

export default useFetchCurrentActiveSubscriptionPlan;
